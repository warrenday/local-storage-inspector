import React, { useState } from "react";

type Mode = "text" | "json";

interface StorageTextareaContextProps {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

const StorageTextareaContext = React.createContext<StorageTextareaContextProps>(
  null!
);

const StorageTextareaProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [mode, setMode] = useState<Mode>("json");

  return (
    <StorageTextareaContext.Provider value={{ mode, setMode }}>
      {children}
    </StorageTextareaContext.Provider>
  );
};

export const useStorageTextarea = () => {
  const context = React.useContext(StorageTextareaContext);
  if (!context) {
    throw new Error(
      "useStorageTextarea must be used within a StorageTextareaProvider"
    );
  }
  return context;
};

export default StorageTextareaProvider;
