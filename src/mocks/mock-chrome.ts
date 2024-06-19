import EventEmitter from "eventemitter3";
import { DeepPartial } from "utility-types";
import type { IPort } from "../providers/PageLocalStorageProvider";

const emitter = new EventEmitter();

let mockStorage: Record<string, string> = {
  key1: "value1",
  key2: "value2",
  key3: "value3",
  key4: `{"hello":"value1","hello":"value2"}`,
};

const mockedChrome: DeepPartial<typeof chrome> = {
  devtools: {
    inspectedWindow: {
      tabId: 1,
    },
  },
  runtime: {
    connect: () => {
      const port: DeepPartial<IPort> = {
        onMessage: {
          addListener: (callback) => {
            emitter.on("message", callback);
          },
          removeListener: () => {
            emitter.removeListener("message");
          },
        },
        postMessage: (message) => {
          if (message.action === "get-local-storage") {
            emitter.emit("message", { data: mockStorage });
            return;
          }
          if (message.action === "clear-local-storage") {
            mockStorage = {};
          }
          if (message.action === "set-local-storage-item") {
            mockStorage = {
              ...mockStorage,
              [message.data!.key || ""]: message.data?.value || "",
            };
          }
          if (message.action === "remove-local-storage-item") {
            mockStorage = Object.keys(mockStorage).reduce((acc, key) => {
              if (key !== message.data?.key) {
                acc[key] = mockStorage[key];
              }
              return acc;
            }, {} as Record<string, string>);
          }

          emitter.emit("message", { data: mockStorage });
        },
        disconnect: () => {},
      };

      return port as IPort;
    },
  },
};

const mockChrome = mockedChrome as typeof chrome;

export { mockChrome };
