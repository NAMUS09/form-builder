"use client";

import { use } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormBuilderContext } from "./FormBuilder";
import RenderDynamicField from "./common/RenderDynamicField";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";

export const FormPlayground = () => {
  const formBuilderState = use(FormBuilderContext);

  if (!formBuilderState) throw new Error("FormBuilderContext is not available");

  const { fields } = formBuilderState;

  const formSchema = z.object({
    name: z.string(),
  });

  const { handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-left px-2">
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
