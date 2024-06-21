import EventEmitter from "eventemitter3";
import { DeepPartial } from "utility-types";
import type { IPort } from "../providers/PageLocalStorageProvider";

const emitter = new EventEmitter();

let mockStorage: Record<string, string> = {
  username: "Warren91",
  address: JSON.stringify({
    street: "123 Baker Street",
    city: "London",
    postcode: "NW1 6XE",
  }),
  isLoggedIn: "true",
  token:
    'Bearer "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"',
  settings: JSON.stringify({
    theme: "dark",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
  }),
  analytics: JSON.stringify({
    trackingId: "UA-123456789-1",
    enabled: "true",
    region: "us-west-1",
    userGroup: {
      type: "admin",
      permissions: ["read", "write", "delete"],
    },
  }),
  userPreferences: JSON.stringify({
    notifications: {
      email: "true",
      push: "true",
    },
  }),
  lastLogin: new Date().toISOString(),
  visits: "123",
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
