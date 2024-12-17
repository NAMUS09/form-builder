import { AvailableFieldsType } from "@/components/formBuilder/DragField";

export interface BaseValidation {
  required: boolean;
  requiredMessage: string;
  disabled: boolean;
}

export interface RegexValidation {
  regex: string | null;
  regexMessage: string | null;
}

interface BaseField {
  id: number;
  label: string;
  fieldType: AvailableFieldsType;
  name: string;
  placeholder: string;
  customValidation: boolean;
}

export type InputType = "email" | "number" | "text";

export interface InputDragItem extends BaseField {
  fieldType: Extract<AvailableFieldsType, "Input">;
  type: InputType;
  customValidation: true;
  validation: BaseValidation & RegexValidation;
}

export interface SelectDragItem extends BaseField {
  fieldType: Extract<AvailableFieldsType, "Select">;
  customValidation: false;
  options: { id: number; label: string; value: string }[];
  validation: BaseValidation;
}

export interface OtherDragItem extends BaseField {
  fieldType: Exclude<AvailableFieldsType, "Input" | "Select">;
  customValidation: true;
  validation: BaseValidation & RegexValidation;
}

export type DragItem = InputDragItem | SelectDragItem | OtherDragItem;
