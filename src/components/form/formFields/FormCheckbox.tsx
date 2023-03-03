import React from "react";
import { FieldCheckbox } from "../../../types/formTypes";
import { FieldAction } from "../../../types/formTypes";

interface Props {
  key: number;
  field: FieldCheckbox;
  dispatch: React.Dispatch<FieldAction>;
  onDeleteField: (fieldId: number) => void;
  onEditField: (fieldId: number) => void;
}

const FormCheckbox: React.FC<Props> = ({ key, field, dispatch }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_FIELD_VALUE",
      payload: { id: field.id, value: event.target.checked },
    });
  };

  return (
    <div key={key} className="my-4 flex items-center">
      <input
        type="checkbox"
        id={field.label}
        name={field.label}
        required={field.required}
        
        onChange={handleChange}
        className="mr-2 rounded border-gray-400 focus:outline-none focus:border-blue-500"
      />
      <label htmlFor={field.label} className="text-lg text-gray-800">{field.label}</label>
    </div>
  );
};

export default FormCheckbox;
