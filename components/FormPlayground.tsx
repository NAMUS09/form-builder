"use client";

import { use, useState } from "react";
import { z } from "zod";
import { FormBuilderContext } from "./FormBuilder";
import RenderDynamicField from "./common/RenderDynamicField";
import { Button } from "./ui/button";

export const FormPlayground = () => {
  const formBuilderState = use(FormBuilderContext);

  if (!formBuilderState) throw new Error("FormBuilderContext is not available");

  const { fields } = formBuilderState;

  const [formData, setFormData] = useState({});
  const schema = z.object(
    fields.reduce((acc, field) => {
      acc[field.name] = field.validation;
      return acc;
    }, {})
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );
    try {
      schema.parse(formValues);
      alert("Form submitted successfully!");
    } catch (error: any) {
      alert(error.errors.map((err: any) => err.message).join(", "));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-left px-2">
      <div className="flex flex-col gap-4 mb-4">
        {fields.map((field, index) => (
          <div key={field.id}>
            <RenderDynamicField key={index} field={field} />
          </div>
        ))}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};
