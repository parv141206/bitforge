"use client";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";

export default function Arch() {
  const { theme } = useTheme();
  return (
    <div>
      <div
        className={`container mx-auto ${
          theme === "dark" ? "dark bg-black text-white" : "bg-white text-black"
        }   flex items-center min-h-[200vh] flex-col justify-center px-12  gap-5`}
      >
        <Image
      </div>
    </div>
  );
}
