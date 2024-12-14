"use client";

import { z, ZodTypeAny } from "zod";
import getCodeSnippet from "./common/getCodeSnippet";
import { DragItem } from "./FormBuilder";

const generateImports = (fields: DragItem[]) => {
  const importSet = new Set([
    '"use client" \n',
    'import { useForm } from "react-hook-form"',
    'import { zodResolver } from "@hookform/resolvers/zod"',
    'import * as z from "zod"',
    'import { Button } from "@/components/ui/button"',
  ]);

  return importSet;
};

export const generateZodSchema = (formFields: DragItem[]): z.ZodObject<any> => {
  const schemaObject: Record<string, z.ZodTypeAny> = {};

  const processField = (field: DragItem): void => {
    if (field.variant === "Label") return;

    let fieldSchema: z.ZodTypeAny;

    switch (field.variant) {
      case "Input":
        if (field.type === "email") {
          fieldSchema = z.string().email();
          break;
        } else if (field.type === "number") {
          fieldSchema = z.coerce.number();
          break;
        } else {
          fieldSchema = z.string();
          break;
        }

      default:
        fieldSchema = z.string();
    }

    if (field.required !== true) {
      fieldSchema = fieldSchema.optional();
    }
    schemaObject[field.name] = fieldSchema as ZodTypeAny;
  };

  formFields.flat().forEach(processField);

  return z.object(schemaObject);
};

export const zodSchemaToString = (schema: z.ZodTypeAny): string => {
  if (schema instanceof z.ZodDefault) {
    return `${zodSchemaToString(schema._def.innerType)}.default(${JSON.stringify(schema._def.defaultValue())})`;
  }

  if (schema instanceof z.ZodString) {
    return "z.string()";
  }

  if (schema instanceof z.ZodOptional) {
    return `${zodSchemaToString(schema.unwrap())}.optional()`;
  }

  return "z.unknown()";
};

export const getZodSchemaString = (formFields: DragItem[]): string => {
  const schema = generateZodSchema(formFields);
  const schemaEntries = Object.entries(schema.shape)
    .map(([key, value]) => {
      return `  ${key}: ${zodSchemaToString(value as ZodTypeAny)}`;
    })
    .join(",\n");

  return `const formSchema = z.object({\n${schemaEntries}\n});`;
};

export const generateCode = ({ fields }: { fields: DragItem[] }) => {
  const imports = Array.from(generateImports(fields)).join("\n");

  const schema = getZodSchemaString(fields);

  const formFields = fields
    .map((field) => getCodeSnippet({ field }))
    .join("")
    .trim(); // Remove leading and trailing whitespace

  const componentBlock = `
export default function Form() {
 const { handleSubmit, register } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      ${formFields}
      <Button type="submit">Submit</Button>
    </form>
  );
}`;

  return imports + "\n\n" + schema + "\n" + componentBlock;
};
