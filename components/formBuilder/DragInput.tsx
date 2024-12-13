"use client";

import { useRef } from "react";
import { useDrag } from "react-dnd";

export const DragInput = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag(() => ({
    type: "INPUT",
  }));

  // Attach the drag ref manually
  drag(ref);

  return (
    <div ref={ref} className="p-2 border rounded cursor-move">
      Drag Input
    </div>
  );
};
