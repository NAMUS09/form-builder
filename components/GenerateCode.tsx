"use client";

import { DragItem } from "@/lib/interface";
import { z, ZodIssueOptionalMessage, ZodTypeAny } from "zod";
import getCodeSnippet from "./common/getCodeSnippet";

const generateImports = (fields: DragItem[]) => {
  const importSet = new Set([
    '"use client" \n',
    'import { useForm } from "react-hook-form"',
    'import { zodResolver } from "@hookform/resolvers/zod"',
    'import * as z from "zod"',
    'import { Button } from "@/components/ui/button"',
    'import {\n  Form,\n  FormControl,\n  FormDescription,\n  FormField,\n  FormItem,\n  FormLabel,\n  FormMessage,\n} from "@/components/ui/form"',
  ]);

  fields.forEach((field) => {
    if (field.fieldType === "Input") {
      importSet.add('import { Input } from "@/components/ui/input"');
    }

    if (field.fieldType === "Select") {
      importSet.add(
        'import {\n Select,\n  SelectContent,\n  SelectItem,\n  SelectTrigger,\n  SelectValue.\n} from "@/components/ui/select"'
      );
    }
  });

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
          fieldSchema = z
            .string({ message: field.validation.requiredMessage })
            .email({ message: "Email is invalid" });

          break;
        } else if (field.type === "number") {
          fieldSchema = z.coerce.number({
            message: field.validation.requiredMessage,
          });
          break;
        } else {
          fieldSchema = z.string({ message: field.validation.requiredMessage });
          break;
        }
      case "Select":
        const selectValues = field.options.map((option) => option.value) as [
          string,
          ...string[],
        ];

        fieldSchema = z.enum(selectValues, {
          message: field.validation.requiredMessage,
        });
        break;

      default:
        fieldSchema = z.string({ message: field.validation.requiredMessage });
    }

    // Apply regex validation if specified and the field is a string
    if (field.customValidation) {
      if (field.validation.regex && fieldSchema instanceof z.ZodString) {
        fieldSchema = fieldSchema.regex(new RegExp(field.validation.regex), {
          message: field.validation.regexMessage ?? "Invalid value",
        });
      }
    }

    if (field.validation.required !== true) {
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
  let baseMessage: string = "";
  if (schema._def.errorMap) {
    baseMessage = schema._def.errorMap(
      { path: [] } as unknown as ZodIssueOptionalMessage,
      { defaultError: "This field is required", data: undefined }
    ).message;
  }

  if (schema instanceof z.ZodString) {
    let stringSchema = `z.string()`;

    if (baseMessage) {
      stringSchema = `z.string({ message: "${baseMessage}" })`;
    }

    if (schema.isEmail) {
      // Handle email validation
      stringSchema += `.email({ message: "Email is invalid" })`;
    }

    // Handle regex validation
    if (schema._def.checks) {
      schema._def.checks.forEach((check) => {
        if (check.kind === "regex") {
          stringSchema += `.regex(${check.regex}, { message: "${check.message || "Invalid value"}" })`;
        }
      });
    }

    return stringSchema;
  }

  if (schema instanceof z.ZodNumber) {
    return "z.number()";
  }

  if (schema instanceof z.ZodBoolean) {
    return "z.boolean()";
  }

  if (schema instanceof z.ZodOptional) {
    const innerTypeString = zodSchemaToString(schema.unwrap());
    return `${innerTypeString}.optional()`;
  }

  if (schema instanceof z.ZodNullable) {
    const innerTypeString = zodSchemaToString(schema.unwrap());
    return `${innerTypeString}.nullable()`;
  }

  if (schema instanceof z.ZodArray) {
    const elementTypeString = zodSchemaToString(schema.element);
    return `z.array(${elementTypeString})`;
  }

  if (schema instanceof z.ZodEnum) {
    const values = JSON.stringify(schema.options);
    return baseMessage
      ? `z.enum(${values}, { message: "${baseMessage}" })`
      : `z.enum(${values})`;
  }

  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const shapeStrings = Object.entries(shape)
      .map(
        ([key, value]) => `${key}: ${zodSchemaToString(value as ZodTypeAny)}`
      )
      .join(", ");
    return `z.object({ ${shapeStrings} })`;
  }

  if (schema instanceof z.ZodUnion) {
    const options = schema.options.map(zodSchemaToString).join(", ");
    return `z.union([${options}])`;
  }

  if (schema instanceof z.ZodLiteral) {
    return `z.literal(${JSON.stringify(schema._def.value)})`;
  }

  if (schema instanceof z.ZodUnknown) {
    return "z.unknown()";
  }

  if (schema instanceof z.ZodAny) {
    return "z.any()";
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
  const imports = Array.from(generateImports(fields)).join("\n");

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
