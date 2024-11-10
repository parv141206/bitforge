"use client";
import Binary from "@/components/Binary";
import ScrambleText from "@/components/ScrambleText";
import React, { useEffect } from "react";
import gsap from "gsap";
import BinaryGrid from "@/components/Binary";
import Link from "next/link";
export default function Home() {
  useEffect(() => {
    gsap.fromTo(
      ".binary",
      {
        opacity: 0,
        scale: 4,
        duration: 1.5,
        delay: 1,
        ease: "power2.out",
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
      },
    );
    gsap.fromTo(
      ".desc",
      {
        opacity: 0,
        y: 50,
        duration: 2.5,
        delay: 3,
        ease: "power2.out",
      },
      {
        opacity: 1,
        y: 0,
        delay: 3,
        duration: 2.5,
        ease: "power2.out",
      },
    );
  }, []);

  return (
    <div className="flex container items-center mx-auto justify-center flex-col">
      <div className="min-h-screen w-full flex items-center overflow-hidden justify-center relative">
        <div className="binary h-screen w-screen flex items-center justify-center overflow-hidden">
          <BinaryGrid />
        </div>
        <div
          style={{ background: "radial-gradient(black , black , transparent)" }}
          className="absolute h-[30%] w-[50%] flex items-center justify-center  text-7xl font-extrabold"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="p-5 text-white text-7xl z-10">
              <ScrambleText />
            </div>
            <div className="text-xl text-center opacity-0 desc text-white">
              A simple to use and elegant 8085 simulator
            </div>
            <Link href="/sim">
              <button className="text-xl opacity-0 desc border text-white get-started p-3 hover:shadow-none  m-3 w-fit ">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
