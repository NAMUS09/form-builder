"use client";

import { use } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormBuilderContext } from "./FormBuilder";

import { DragItem } from "@/lib/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import RenderDynamicField from "./common/RenderDynamicField";
import { generateDefaultValues, generateZodSchema } from "./GenerateCode";
import { Button } from "./ui/button";
import { Form, FormField } from "./ui/form";

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
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
    }
  };

  const getKey = (field: DragItem) => {
    let key = `${field.fieldType}-${field.id}-${field.name}`;
    if (field.fieldType === "Input") key += `-${field.type}`;
    if (field.validation.required) key += `-required`;
    if (field.validation.disabled) key += `-disabled`;
    return key;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-left px-2">
        <div className="flex flex-col gap-4 mb-4">
          {fields.map((formField) => (
            <FormField
              key={getKey(formField)}
              control={form.control}
              name={formField.name}
              render={({ field }) => (
                <RenderDynamicField formField={formField} field={field} />
              )}
            />
          ))}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
