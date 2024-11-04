"use client";
import { createContext, useContext, useEffect, useState } from "react";

export interface Flags {
  Z: boolean; // Zero flag
  P: boolean; // Parity flag
  AC: boolean; // Auxiliary Carry flag
  C: boolean; // Carry flag
  S: boolean; // Sign flag
}

interface FlagRegisterContextType {
  flags: Flags;
  setFlags: React.Dispatch<React.SetStateAction<Flags>>;
}

const FlagRegisterContext = createContext<FlagRegisterContextType | undefined>(
  undefined
);

export function FlagRegisterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [flags, setFlags] = useState<Flags>(() => {
    // const savedFlags = localStorage.getItem("flags");
    // return savedFlags
    // ? JSON.parse(savedFlags)
    return {
      Z: false,
      P: false,
      AC: false,
      C: false,
      S: false,
    };
  });

  useEffect(() => {
    localStorage.setItem("flags", JSON.stringify(flags));
  }, [flags]);

  return (
    <FlagRegisterContext.Provider value={{ flags, setFlags }}>
      {children}
    </FlagRegisterContext.Provider>
  );
}

export function useFlagRegisters() {
  const context = useContext(FlagRegisterContext);

  if (context === undefined) {
    throw new Error(
      "useFlagRegisters must be used within a FlagRegisterProvider"
    );
  }

  return context;
}
