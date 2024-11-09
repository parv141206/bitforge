"use client";
import { useTheme } from "@/contexts/ThemeContext";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { gsap } from "gsap";

export default function Arch() {
  const { theme } = useTheme();
  const app = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a GSAP timeline
    const tl = gsap.timeline();

    // Animate the title and body text
    tl.fromTo(
      ".title",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    )
      .fromTo(
        ".body",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.5" // Start this animation half a second before the previous one ends
      )
      .fromTo(
        ".image-container",
        { scale: 0.5, rotation: -20, opacity: 0 }, // Start smaller and rotated
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        } // Scale up and rotate to original position
      );

    return () => {
      tl.kill(); // Clean up the timeline on component unmount
    };
  }, []);

  return (
    <div ref={app}>
      <div
        className={`container mx-auto ${
          theme === "dark" ? "dark bg-black text-white" : "bg-white text-black"
        } flex items-center min-h-screen flex-col justify-center px-12 gap-5 mt-20`}
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
        <div className="flex justify-center items-center w-full mt-5 mb-8 image-container">
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
