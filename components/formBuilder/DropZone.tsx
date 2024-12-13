"use client";

import { useRef } from "react";
import { useDrop } from "react-dnd";

interface DroppedInput {
  id: number;
  label: string;
  name: string;
  required: boolean;
}

type DropZoneProps = {
  fields: DroppedInput[];
  onAddInput: () => void;
};

export const DropZone: React.FC<DropZoneProps> = ({ fields, onAddInput }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: "INPUT",
    drop: () => {
      onAddInput();
    },
  }));

  // Attach the drop ref manually
  drop(ref);

  return (
    <div
      ref={ref}
      className="min-h-[200px] p-4 border-dashed border-2 border-gray-400 rounded"
    >
      <div className="flex gap-2 items-center mb-2">
        <h3 className="text-lg font-bold">Drop Zone</h3>
        <p>{fields.length} input(s) added</p>
      </div>

      <div className="space-y-4 mt-4">
        {fields.map((input, index) => (
          <div key={index} className="p-2 border rounded bg-gray-50 shadow-sm">
            <label className="block text-sm font-medium">
              {input.label}{" "}
              {input.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              name={input.name}
              required={input.required}
              className="mt-1 p-2 border rounded w-full"
              placeholder={`Enter ${input.label}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
