import React from "react";
import { FieldText } from "../../../types/formTypes";
import { FieldAction } from "../../../types/formTypes";

interface FormTextProps {
  key: number;
  field: FieldText;
  dispatch: React.Dispatch<FieldAction>;
  onDeleteField: (fieldId: number) => void;
  onEditField: (fieldId: number) => void;
}


const FormText: React.FC<FormTextProps> = ({ key, field, dispatch }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_FIELD_VALUE",
      payload: { id: field.id, value: event.target.value },
    });
  };

  return (
    <div className="my-4" key={key}>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.label}>{field.label}</label>
      <input
        type="text"
        id={field.label}
        name={field.label}
        required={field.required}
        value={field.value as string}
        onChange={handleChange}
        className="ml-2 p-2 border border-gray-500 rounded"
      />
    </div>
  );
};

export default FormText;
