import { DragItem } from "@/lib/interface";

const getCodeSnippet = ({ field }: { field: DragItem }) => {
  if (field.fieldType === "Input") {
    return `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <FormControl>
                <Input placeholder="${field.placeholder}" {...field} type="${field.type}" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}`;
  }

  return null;
};

export default getCodeSnippet;
