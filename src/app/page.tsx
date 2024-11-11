"use client";
import Binary from "@/components/Binary";
import ScrambleText from "@/components/ScrambleText";
import React, { useEffect } from "react";
import gsap from "gsap";
import BinaryGrid from "@/components/Binary";
import Link from "next/link";
export default function Home() {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".binary",
      {
        scale: 4,
      },
      {
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
      },
    ).fromTo(
      ".desc",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 2.5,
        ease: "power2.out",
      },
      "-=0.75",
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
            <div
              style={{
                color: "lightsteelblue",
              }}
              className="p-5 z-10"
            >
              <ScrambleText />
            </div>
            <div className="mb-1 text-xl text-center desc text-white">
              <p>
                Unleash the power of retro computing with our 8085
                simulator—where classic code meets modern innovation!
              </p>
            </div>
            <Link href="/sim">
              <button className="desc text-xl opacity-0 border-2 text-white get-started p-3 hover:shadow-none hover:rounded-md hover:bg-white hover:text-black m-3 w-fit ">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
