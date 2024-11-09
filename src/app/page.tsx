"use client";
import Binary from "@/components/Binary";
import ScrambleText from "@/components/ScrambleText";
import React from "react";
import { GiAnvil } from "react-icons/gi";
export default function Home() {
  return (
    <div className="flex container items-center mx-auto justify-center flex-col">
      <div className="min-h-screen w-full flex items-center justify-center relative">
        <Binary />
        <div className="absolute  text-7xl font-extrabold ">
          <div className="flex">
            <div className="p-3 text-white text-7xl">
              <ScrambleText />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
