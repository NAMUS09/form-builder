"use client";

import { DragItem } from "@/lib/interface";
import { z, ZodTypeAny } from "zod";
import getCodeSnippet from "./common/getCodeSnippet";

const generateImports = () => {
  const importSet = new Set([
    '"use client" \n',
    'import { useForm } from "react-hook-form"',
    'import { zodResolver } from "@hookform/resolvers/zod"',
    'import * as z from "zod"',
    'import { Button } from "@/components/ui/button"',
    'import {\n  Form,\n  FormControl,\n  FormDescription,\n  FormField,\n  FormItem,\n  FormLabel,\n  FormMessage,\n} from "@/components/ui/form"',
  ]);

  return importSet;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateZodSchema = (formFields: DragItem[]): z.ZodObject<any> => {
  const schemaObject: Record<string, z.ZodTypeAny> = {};

  const processField = (field: DragItem): void => {
    if (field.fieldType === "Label") return;

    let fieldSchema: z.ZodTypeAny;

    switch (field.fieldType) {
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

export const generateDefaultValues = <T extends { name: string }>(
  fields: T[]
): Record<T["name"], string> => {
  return fields.reduce(
    (defaultValues, field) => {
      if (!defaultValues[field.name as T["name"]]) {
        defaultValues[field.name as T["name"]] = "";
      }
      return defaultValues;
    },
    {} as Record<T["name"], string>
  );
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

export const getZodDefaultValuesString = (fields: DragItem[]): string => {
  const defaultValues = generateDefaultValues(fields);

  const entries = Object.entries(defaultValues);

  return `defaultValues: {
${entries
  .map(([key, value], index) =>
    index === 0
      ? `\t\t${key}: ${JSON.stringify(value)}`
      : `\t\t${key}: ${JSON.stringify(value)}`
  )
  .join(",\n")}
    }`;
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
  const imports = Array.from(generateImports()).join("\n");

  const schema = getZodSchemaString(fields);
  const defaultValuesString = getZodDefaultValuesString(fields);

  const formFields = fields
    .map((field) => getCodeSnippet({ field }))
    .join("")
    .trim(); // Remove leading and trailing whitespace

  const componentBlock = `
export default function Form() {
 const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    ${defaultValuesString},
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        ${formFields}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}`;

  return imports + "\n\n" + schema + "\n" + componentBlock;
};
