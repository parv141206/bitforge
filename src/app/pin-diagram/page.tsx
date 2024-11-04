"use client";
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function PinDiagram() {
  const numPins = 20; // Number of pins per side
  const pinDescription = "8085 Microprocessor"; // Description for the center

  return (
    <div className="container mx-auto flex items-center justify-center">
      <div className="grid grid-cols-5 grid-rows-20 gap-4 border-2 border-black rounded-lg p-4">
        {/* First Column: Pins 1 to 20 */}
        {Array.from({ length: numPins }, (_, i) => (
          <div key={`pin1-${i}`} className={`col-start-1 row-start-${i + 1}`}>
            {i + 1}
          </div>
        ))}

        {/* Second Column: Numbers for Pins 1 to 20 */}
        {Array.from({ length: numPins }, (_, i) => (
          <div key={`num1-${i}`} className={`col-start-2 row-start-[${i + 1}]`}>
            {i + 21}
          </div>
        ))}

        {/* Center Column: Description */}
        <div className={`row-span-20 col-start-3 row-start-1 border-l-2 border-r-2 border-black flex items-center justify-center`}>
          {pinDescription}
        </div>

        {/* Fourth Column: Pins 21 to 40 */}
        {Array.from({ length: numPins }, (_, i) => (
          <div key={`pin2-${i}`} className={`col-start-4 row-start-[${i + 1}]`}>
            {i + 41}
          </div>
        ))}

        {/* Fifth Column: Numbers for Pins 21 to 40 */}
        {Array.from({ length: numPins }, (_, i) => (
          <div key={`num2-${i}`} className={`col-start-5 row-start-[${i + 1}]`}>
            {i + 61}
          </div>
        ))}
      </div>
    </div>
  );
}