import { DragItem } from "@/lib/interface";
import { ControllerRenderProps } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
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
  field: ControllerRenderProps<
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [x: string]: any;
    },
    string
  >;
};

const RenderDynamicField: React.FC<RenderDynamicFieldProps> = ({
  formField,
  field,
}) => {
  if (formField.fieldType === "Input") {
    return (
      <FormItem>
        <FormLabel>
          {formField.label} {formField.validation.required && "*"}
        </FormLabel>
        <FormControl>
          <Input
            placeholder={formField.placeholder}
            type={formField.type}
            disabled={formField.validation.disabled ?? false}
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }

  if (formField.fieldType === "Select") {
    return (
      <FormItem>
        <FormLabel>
          {formField.label}
          {formField.validation.required && "*"}
        </FormLabel>
        <FormControl>
          <Select {...field} disabled={formField.validation.disabled ?? false}>
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
    );
  }

  return null;
};

export default RenderDynamicField;
