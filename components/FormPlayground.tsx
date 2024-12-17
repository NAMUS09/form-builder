"use client";

import { use } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormBuilderContext } from "./FormBuilder";
import RenderDynamicField from "./common/RenderDynamicField";

import { DragItem } from "@/lib/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateDefaultValues, generateZodSchema } from "./GenerateCode";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

export const FormPlayground = () => {
  const formBuilderState = use(FormBuilderContext);

  if (!formBuilderState) throw new Error("FormBuilderContext is not available");

  const { fields } = formBuilderState;

  const formSchema = generateZodSchema(fields);

  const defaultValues = generateDefaultValues(fields);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  };

  const getKey = (field: DragItem) => {
    let key = `${field.fieldType}-${field.id}-${field.name}`;
    if (field.fieldType === "Input") key += `-${field.type}`;
    return key;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-left px-2">
        <div className="flex flex-col gap-4 mb-4">
          {fields.map((field) => (
            <div key={getKey(field)}>
              <RenderDynamicField formField={field} form={form} />
            </div>
          ))}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
