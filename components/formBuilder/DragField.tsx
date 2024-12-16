"use client";

import { useRef } from "react";
import { useDrag } from "react-dnd";

export type AvailableFieldsType = "Input" | "Textarea" | "Select" | "Label";

type DragFieldProps = {
  type: AvailableFieldsType;
  onAddField: (type: AvailableFieldsType) => void;
};

export const DragField: React.FC<DragFieldProps> = ({ type, onAddField }) => {
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
      onClick={() => onAddField(type)}
    >
      {type}
    </div>
  );
};
