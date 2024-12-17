import { InputDragItem, SelectDragItem } from "@/lib/interface";

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

export const getSelect = ({ id }: { id: number }) => {
  return {
    id,
    label: "Gender",
    name: "gender_" + id,
    placeholder: "Select gender",
    options: [
      { id: 1, label: "Male", value: "male" },
      { id: 2, label: "Female", value: "female" },
      { id: 3, label: "Other", value: "other" },
    ],
    validation: {
      required: true,
      requiredMessage: "Gender is required",
      disabled: false,
    },
  } as SelectDragItem;
};
