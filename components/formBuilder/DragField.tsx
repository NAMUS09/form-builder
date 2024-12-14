"use client";

import { useRef } from "react";
import { useDrag } from "react-dnd";

export type AvailableFieldsType = "Input" | "Textarea" | "Select";

export const DragField = ({ type }: { type: AvailableFieldsType }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag(() => ({
    type: "FORM_COMPONENT",
    item: { type },
  }));

  // Attach the drag ref manually
  drag(ref);

  return (
    <div
      ref={ref}
      className="py-2 px-4 text-sm w-fit border rounded-full cursor-move"
    >
      {type}
    </div>
  );
};
