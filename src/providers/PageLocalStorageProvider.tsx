import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { chromeProvider } from "../services/chromeProvider";

const chrome = chromeProvider();

interface IPortMessageReceived {
  data: Record<string, string>;
}

interface IPortMessageSent {
  tabId: number;
  action:
    | "get-local-storage"
    | "clear-local-storage"
    | "set-local-storage-item"
    | "remove-local-storage-item";
  data?: { key: string; value?: string };
}

interface IPortMessageEvent extends chrome.runtime.PortMessageEvent {
  addListener: (callback: (message: IPortMessageReceived) => void) => void;
  removeListener: (cb: unknown) => void;
}

export interface IPort extends chrome.runtime.Port {
  onMessage: IPortMessageEvent;
  postMessage: (message: IPortMessageSent) => void;
  disconnect: () => void;
}

const tabId = chrome.devtools.inspectedWindow.tabId;

const PageLocalStorageContext = createContext<{
  data: Record<string, string>;
  clearStorage: () => void;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}>(null!);

/**
 * Setup a new port to communicate with the background script.
 *
 * This will relay messages to the content script
 * allowing us to interact with the page's local storage.
 *
 */
const usePort = (connectInfo?: chrome.runtime.ConnectInfo): IPort | null => {
  const [port, setPort] = useState<IPort | null>(null);
  const name = connectInfo?.name;

  useEffect(() => {
    const newPort = chrome.runtime.connect({ name });
    setPort(newPort as unknown as IPort);

    return () => {
      newPort.disconnect();
    };
  }, [setPort, name]);

  return port;
};

interface IPageLocalStorageProvider {
  children: React.ReactNode;
}

const PageLocalStorageProvider = (props: IPageLocalStorageProvider) => {
  const { children } = props;
  const [localStorageData, setLocalStorageData] = useState<
    Record<string, string>
  >({});
  const port = usePort({
    name: "local-storage-inspector-devtools",
  });

  // Setup listener for latest storage data
  useEffect(() => {
    if (!port) {
      return;
    }

    const cb = (message: IPortMessageReceived) => {
      setLocalStorageData(message.data);
    };
    port.onMessage.addListener(cb);

    return () => {
      console.log("remove");
      port.onMessage.removeListener(cb);
    };
  }, [port, setLocalStorageData]);

  // Request local storage data on an interval
  useEffect(() => {
    const fetch = () => {
      port?.postMessage({
        tabId,
        action: "get-local-storage",
      });
    };
    const interval = setInterval(() => {
      fetch();
    }, 1000);
    fetch();

    return () => clearInterval(interval);
  }, [port]);

  const clearStorage = useCallback(() => {
    port?.postMessage({
      tabId,
      action: "clear-local-storage",
    });
  }, [port]);

  const setItem = useCallback(
    (key: string, value: string) => {
      port?.postMessage({
        tabId,
        action: "set-local-storage-item",
        data: { key, value },
      });
    },
    [port]
  );

  const removeItem = useCallback(
    (key: string) => {
      port?.postMessage({
        tabId,
        action: "remove-local-storage-item",
        data: { key },
      });
    },
    [port]
  );

  console.log({ localStorageData });

  return (
    <PageLocalStorageContext.Provider
      value={{ data: localStorageData, clearStorage, setItem, removeItem }}
    >
      {children}
    </PageLocalStorageContext.Provider>
  );
};

export const usePageLocalStorage = () => {
  const context = useContext(PageLocalStorageContext);

  if (!context) {
    throw new Error(
      "usePageLocalStorage must be used within a PageLocalStorageProvider"
    );
  }

  return context;
};

export default PageLocalStorageProvider;
