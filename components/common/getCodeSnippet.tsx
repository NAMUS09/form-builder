import { DragItem } from "../FormBuilder";

const getCodeSnippet = ({ field }: { field: DragItem }) => {
  if (field.fieldType === "Input") {
    return `
    <Label htmlFor="${field.name}">${field.label}</Label>
      <Input
          id="${field.name}"
          name="${field.name}"
          type="${field.type || "text"}"
          placeholder="${field.placeholder || ""}"
      />`;
  }

  return null;
};

export default getCodeSnippet;
