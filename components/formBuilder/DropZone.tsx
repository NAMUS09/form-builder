"use client";

import { AnimatePresence, Reorder } from "framer-motion";
import { use, useRef } from "react";
import { useDrop } from "react-dnd";
import { LuRows2 } from "react-icons/lu";
import { FormBuilderContext } from "../FormBuilder";
import { AvailableFieldsType } from "./DragField";
import FieldItem from "./FieldItem";

type DropZoneProps = {
  onAddField: (type: AvailableFieldsType) => void;
};

export const DropZone: React.FC<DropZoneProps> = ({ onAddField }) => {
  const formBuilderState = use(FormBuilderContext);

  if (!formBuilderState) throw new Error("FormBuilderContext is not available");

  const { fields, setFields } = formBuilderState;

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: "FORM_COMPONENT",
    drop: (item: { type: AvailableFieldsType }) => {
      onAddField(item.type);
    },
  }));

  // Attach the drop ref manually
  drop(ref);

  return (
    <div
      ref={ref}
      className="min-h-[200px] p-4 border-dashed border-2 border-gray-400 rounded"
    >
      <Reorder.Group
        axis="y"
        onReorder={setFields}
        values={fields}
        className="flex flex-col gap-1"
      >
        <div className="space-y-4 mt-4">
          {fields.map((field) => (
            <Reorder.Item
              key={field.id}
              value={field}
              className="flex items-center gap-1 w-full"
              whileDrag={{ backgroundColor: "#e5e7eb", borderRadius: "12px" }}
            >
              <LuRows2 className="cursor-grab w-4 h-4" />
              <AnimatePresence initial={false} mode="wait">
                <FieldItem field={field} />
              </AnimatePresence>
            </Reorder.Item>
          ))}
        </div>
      </Reorder.Group>
    </div>
  );
};
