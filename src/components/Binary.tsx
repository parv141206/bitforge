import React, { useEffect, useState } from "react";

interface GridItem {
  id: number;
  delay: number;
  fontSize: number;
  value: number;
}
export default function Binary() {
  const gridSize = 240;
  const [items, setItems] = useState<GridItem[]>([]);

  useEffect(() => {
    const generatedItems = Array.from({ length: gridSize }).map((_, index) => {
      const randomDelay = Math.random() * 5;
      const randomFontSize = Math.random() * 30 + 20;
      return {
        id: index,
        delay: randomDelay,
        fontSize: randomFontSize,
        value: Math.round(Math.random()),
      };
    });
    setItems(generatedItems);
  }, [gridSize]);

  return (
    <div
      style={{ gridTemplateColumns: "repeat(40, 1fr)", userSelect: "none" }}
      className="grid grid-cols-40 gap-1 h-full w-full"
    >
      {items.map(({ id, delay, fontSize, value }) => (
        <div
          key={id}
          style={{
            animationDelay: `${delay}s`,
            fontSize: `${fontSize}px`,
          }}
          id="main-title"
          className="flex animate-pulse items-center text-stone-900 justify-center rounded pointer-events-none"
        >
          {value}
        </div>
      ))}
    </div>
  );
}
