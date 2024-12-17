import { DragItem } from "@/lib/interface";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type RenderDynamicFieldProps = {
  formField: DragItem;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
};

const RenderDynamicField: React.FC<RenderDynamicFieldProps> = ({
  formField,
  form,
}) => {
  if (formField.fieldType === "Input") {
    return (
      <FormField
        control={form.control}
        name={formField.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formField.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={formField.placeholder}
                type={formField.type}
                disabled={field.disabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (formField.fieldType === "Select") {
    return (
      <FormField
        control={form.control}
        name={formField.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formField.label}</FormLabel>
            <FormControl>
              <Select {...field} disabled={field.disabled}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={formField.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {formField.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return null;
};

export default RenderDynamicField;
