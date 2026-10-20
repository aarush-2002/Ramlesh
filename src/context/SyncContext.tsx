"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface SyncContextType {
  isOffline: boolean;
  toggleOffline: () => void;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export function SyncProvider({ children }: { children: ReactNode }) {
  const [isOffline, setIsOffline] = useState(false);
  const toggleOffline = () => setIsOffline(!isOffline);

  return (
    <SyncContext.Provider value={{ isOffline, toggleOffline }}>
      {children}
    </SyncContext.Provider>
  );
}

export const useSync = () => {
  const context = useContext(SyncContext);
  if (!context) throw new Error("useSync must be used within SyncProvider");
  return context;
};