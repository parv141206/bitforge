import React from "react";

export default function BinaryGrid() {
  return (
    <div
      style={{ gridTemplateColumns: "repeat(20, 1fr)", userSelect: "none" }}
      className="grid  pointer-events-none container mx-auto gap-1 h-[100%]  w-[80%] items-center justify-center"
    >
      {Array.from({ length: 140 }).map((_, index) => {
        return (
          <div
            key={index}
            style={{
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 30 + 20}px`,
            }}
            className={`flex animate-pulse  items-center text-stone-900 justify-center  rounded `}
          >
            {Math.round(Math.random())}
          </div>
        );
      })}
    </div>
  );
}
