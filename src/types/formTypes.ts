import { ReactNode } from "react";
export type FieldType = "text" | "checkbox" | "radio" | "select";
export type FieldBase = {
  id: number;
  type: FieldType;
  label: string;
  required: boolean;
  value: string | boolean;
  options?: FieldOption[];
};

export type FieldText = FieldBase & {
  type: "text";
};

export type FieldCheckbox = FieldBase & {
  type: "checkbox";
};

export type FieldOption = {
  label: string;
  value: string;
};

export type FieldRadio = FieldBase & {
  type: "radio";
  options: FieldOption[];
};

export type FieldSelect = FieldBase & {
  type: "select";
  options: FieldOption[];
};

export type Field = FieldText | FieldCheckbox | FieldRadio | FieldSelect;

export type FormFieldsState = {
  name: string;
  id: number;
  fields: Field[];
};
export type FormState = {
  forms: FormFieldsState[];
}
export type FormAction =
  | { type: "ADD_FORM_DATA"; payload: FormState }
  | { type: "DELETE_FORM"; payload: number }
  | { type: "EDIT_FORM"; payload: FormFieldsState };

export type FieldAction =
  | { type: "ADD_FIELD"; payload: Field }
  | { type: "RESET_FORM" }
  | { type: "UPDATE_FIELD_VALUE"; payload: { id: number; value: string | boolean } | { fieldId: number; updatedField: Field } }
  | { type: "REMOVE_FIELD"; payload: number }

