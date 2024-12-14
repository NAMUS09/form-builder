import { InputDragItem } from "@/lib/interface";

export const getInput = ({ id }: { id: number }) => {
  return {
    id,
    label: "Username",
    name: "username_" + id,
    placeholder: "Enter your username",
    type: "text",
    required: true,
    disabled: false,
  } as InputDragItem;
};
