"use client";

import { useState } from "react";
import { z } from "zod";
import { DragInput } from "./formBuilder/DragInput";
import { DropZone } from "./formBuilder/DropZone";
import { FormPlayground } from "./FormPlayground";
import { GenerateCode } from "./GenerateCode";

export const FormBuilder = () => {
  const [fields, setFields] = useState<any[]>([]);

  const addInput = () => {
    const name = prompt("Enter field name:");
    const label = prompt("Enter field label:");
    const required = confirm("Is this field required?");
    setFields([
      ...fields,
      {
        name,
        label,
        validation: required ? z.string().nonempty() : z.string(),
      },
    ]);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <DragInput />
        <DropZone onAddInput={addInput} fields={fields} />
      </div>
      <div>
        <h2 className="text-lg font-bold">Form Preview</h2>
        <FormPlayground fields={fields} />
        <GenerateCode fields={fields} />
      </div>
    </div>
  );
};
