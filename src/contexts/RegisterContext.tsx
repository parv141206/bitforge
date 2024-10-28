"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface Registers {
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  H: string;
  L: string;
  PC: string;
}

interface RegisterContextType {
  registers: Registers;
  setRegisters: React.Dispatch<React.SetStateAction<Registers>>;
}

const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined
);

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [registers, setRegisters] = useState<Registers>(() => {
    const savedRegisters = localStorage.getItem("registers");
    return savedRegisters
      ? JSON.parse(savedRegisters)
      : {
          A: "00",
          B: "00",
          C: "00",
          D: "00",
          E: "00",
          H: "00",
          L: "00",
          PC: "00",
        };
  });

  useEffect(() => {
    localStorage.setItem("registers", JSON.stringify(registers));
  }, [registers]);

  return (
    <RegisterContext.Provider value={{ registers, setRegisters }}>
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegisters() {
  const context = useContext(RegisterContext);

  if (context === undefined) {
    throw new Error("useRegisters must be used within a RegisterProvider");
  }

  return context;
}
