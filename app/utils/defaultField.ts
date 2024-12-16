import { InputDragItem } from "@/lib/interface";

export const getInput = ({ id }: { id: number }) => {
  return {
    id,
    label: "Username",
    name: "username_" + id,
    placeholder: "Enter your username",
    type: "text",
    validation: {
      required: true,
      requiredMessage: "Username is required",
      disabled: false,
      regex: null,
      regexMessage: null,
    },
  } as InputDragItem;
};
