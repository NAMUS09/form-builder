import { DragItem } from "@/lib/interface";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import React, { use } from "react";
import { LuPencil } from "react-icons/lu";
import { FormBuilderContext } from "../FormBuilder";
import { Button } from "../ui/button";

type FieldItemProps = {
  field: DragItem;
};

const FieldItem: React.FC<FieldItemProps> = ({ field }) => {
  const formBuilderState = use(FormBuilderContext);

  if (!formBuilderState) throw new Error("FormBuilderContext is not available");

  const { setFields, openEditDialog } = formBuilderState;

  const deleteField = (id: number) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== id));
  };

  return (
    <motion.div
      layout="position"
      initial={{ x: 1050, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
      className="flex items-center gap-3 w-full cursor-grab"
      key={`${field.name}`}
    >
      <div className="p-2 w-full  border rounded bg-gray-50 shadow-sm flex justify-between items-center">
        {field.fieldType}
        <div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => openEditDialog(field)}
          >
            <LuPencil />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteField(field.id)}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FieldItem;
