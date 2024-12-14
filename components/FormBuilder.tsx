"use client";

import { getInput } from "@/app/utils/defaultField";
import { getRandomSixDigit } from "@/app/utils/random";
import { createContext, useState } from "react";
import { AvailableFieldsType, DragField } from "./formBuilder/DragField";
import { DropZone } from "./formBuilder/DropZone";
import EditDialog from "./formBuilder/EditDialog";
import FormPreview from "./formBuilder/FormPreview";

export type DragItem = {
  id: number;
  fieldType: AvailableFieldsType;
  label: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const defaultState: DragItem[] = [
  {
    ...getInput({ id: 1 }),
    fieldType: "Input",
  },
];

type FormBuilderContextType = {
  fields: DragItem[];
  setFields: React.Dispatch<React.SetStateAction<DragItem[]>>;
  openEditDialog: (field: DragItem) => void;
};

export const FormBuilderContext = createContext<FormBuilderContextType | null>(
  null
);

export const FormBuilder = () => {
  const [fields, setFields] = useState<DragItem[]>(defaultState);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<DragItem | null>(null);

  const addFields = (type: AvailableFieldsType) => {
    const fieldId = getRandomSixDigit();
    if (type === "Input") {
      const defaultInput = getInput({ id: fieldId });
      setFields((prevFields) => [
        ...prevFields,
        { ...defaultInput, fieldType: type },
      ]);
    }
  };

  const openEditDialog = (field: DragItem) => {
    setSelectedField(field);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="grid md:grid-cols-12 gap-4 h-full w-full ">
      <div className="md:col-span-2 border-r-2 md:h-[85svh]">
        <h4 className="text-lg font-bold mb-2">Available fields</h4>

        <div className="flex flex-col">
          <DragField type="Input" />
        </div>
      </div>
      <FormBuilderContext value={{ fields, setFields, openEditDialog }}>
        <div className="md:col-span-4">
          <div className="flex gap-2 items-center mb-2">
            <h3 className="text-lg font-bold">Drop Zone</h3>
            <p>{fields.length} fields(s) added</p>
          </div>
          <DropZone onAddField={addFields} />
        </div>
        <div className="md:col-span-6">
          <FormPreview />
        </div>
        <EditDialog
          selectedField={selectedField}
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
        />
      </FormBuilderContext>
    </div>
  );
};
