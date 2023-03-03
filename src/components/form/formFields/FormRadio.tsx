import React from "react";
import { FieldRadio } from "../../../types/formTypes";
import { FieldAction } from "../../../types/formTypes";

interface FormRadioProps {
  key: number;
  field: FieldRadio;
  dispatch: React.Dispatch<FieldAction>;
  onDeleteField: (fieldId: number) => void;
  onEditField: (fieldId: number) => void;
}

const FormRadio: React.FC<FormRadioProps> = ({ key, field, dispatch }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_FIELD_VALUE",
      payload: { id: field.id, value: event.target.value },
    });
  };

  return (
    <div className="my-4" key={key}>
      <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
      {field.options.map((option) => (
        <div key={option.value}>
          <input
           className="mr-2 rounded border-gray-400 focus:outline-none focus:border-blue-500"
            type="radio"
            id={option.label}
            name={field.label}
            value={option.value}
            onChange={handleChange}
          />
          <label htmlFor={option.label}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default FormRadio;
