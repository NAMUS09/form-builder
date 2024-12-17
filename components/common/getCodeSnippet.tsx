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
          )}
        />`;
  }

  if (field.fieldType === "Select") {
    return `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  {...field}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="${field.placeholder}" />
                  </SelectTrigger>
                  <SelectContent>
                    ${field.options
                      .map(
                        (option, index) =>
                          `${index > 0 ? "\t\t\t\t\t" : ""}<SelectItem value="${option.value}">${option.label}</SelectItem>`
                      )
                      .join("\n")}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />`;
  }

  return null;
};

export default getCodeSnippet;
