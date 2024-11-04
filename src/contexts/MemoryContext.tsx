"use client";
import { createContext, useContext, useEffect, useState } from "react";

export interface Memory {
  [key: string]: string;
}

export const MemoryContext = createContext<{
  memory: Memory;
  setMemory: React.Dispatch<React.SetStateAction<Memory>>;
}>({ memory: {}, setMemory: () => {} });

export function MemoryProvider({ children }: { children: React.ReactNode }) {
  const [memory, setMemory] = useState<Memory>(() => {
    // const savedMemory =
    //   typeof localStorage !== "undefined"
    //     ? localStorage?.getItem("memory")
    //     : undefined;
    // if (savedMemory) {
    //   return JSON.parse(savedMemory);
    // }

    const initialMemory: Memory = {};
    for (let i = 0; i < 65536; i++) {
      initialMemory[i.toString(16).padStart(4, "0")] = "0";
    }
    return initialMemory;
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
