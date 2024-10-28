"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const MemoryContext = createContext({});

export function MemoryProvider({ children }: { children: React.ReactNode }) {
  const [memory, setMemory] = useState(() => {
    const savedMemory = localStorage.getItem("memory");
    return savedMemory ? JSON.parse(savedMemory) : new Array(65536).fill(0);
  });
  useEffect(() => {
    localStorage.setItem("memory", JSON.stringify(memory));
  }, [memory]);
  return (
    <MemoryContext.Provider value={{ memory, setMemory }}>
      {children}
    </MemoryContext.Provider>
  );
}
export function useMemory() {
  return useContext(MemoryContext);
}
