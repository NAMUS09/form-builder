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
      <>
        <FormField
          control={form.control}
          name={formField.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formField.label}</FormLabel>
              <FormControl>
                <Input placeholder={formField.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }

  return null;
};

export default RenderDynamicField;
