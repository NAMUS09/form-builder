import { AvailableFieldsType } from "@/components/formBuilder/DragField";

interface BaseField {
  id: number;
  label: string;
  fieldType: AvailableFieldsType;
  name: string;
  placeholder: string;
  required: boolean;
  disabled: boolean;
}

export type InputType = "email" | "number" | "text";

export interface InputDragItem extends BaseField {
  fieldType: Extract<AvailableFieldsType, "Input">;
  type: InputType;
}

export interface OtherDragItem extends BaseField {
  fieldType: Exclude<AvailableFieldsType, "Input">;
}

export type DragItem = InputDragItem | OtherDragItem;
