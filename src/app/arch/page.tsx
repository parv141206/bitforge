"use client";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function Arch() {
  const { theme } = useTheme();
  return (
    <div>
      <div
        className={`container mx-auto ${
          theme === "dark" ? "dark bg-black text-white" : "bg-white text-black"
        } flex items-center min-h-[screen] flex-col justify-center px-12 gap-5 mt-20`}
      >
        <Link
          href="/sim"
          className="title text-3xl flex gap-3 text-start w-full"
        >
          <FaArrowLeft className="mt-1" />
          <span>Back to Sim</span>
        </Link>
        <div className="body text-xl text-start w-full">
          The following diagram shows the architecture of the Intel 8085
          microprocessor. The microprocessor receives its input from the 16-bit
          address bus and 8-bit data bus, and it communicates with the outside
          world using the control bus. Data is held in the 8-bit registers A, B,
          C, D, E, H, and L.
        </div>
        <div className="flex justify-center items-center w-full">
          <Image
            src="/arch.svg"
            alt="arch"
            width={1000}
            height={1000}
            priority
          />
        </div>
      </div>
    </div>
  );
}
