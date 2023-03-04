import React, { useState } from "react";
import { FieldSelect } from "../../../types/formTypes";
import { FieldAction } from "../../../types/formTypes";

interface FormSelectProps {
  index: number;
  field: FieldSelect;
  dispatch: React.Dispatch<FieldAction>;
  onDeleteField: (fieldId: number) => void;
  onEditField: (fieldId: number) => void;
}

const FormSelect: React.FC<FormSelectProps> = ({ index, field, dispatch }) => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setInputValue(value);
    dispatch({
      type: "UPDATE_FIELD_VALUE",
      payload: { id: field.id, value: inputValue },
    });
  };

  return (
    <div className="my-4" key={index}>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.label}>
        {field.label}
      </label>
      <select
        className="border border-gray-400 py-2 px-3 rounded-lg w-full"
        id={field.label}
        name={field.label}
        required={field.required}
        value={inputValue}
        onChange={handleChange}
      >
        <option value="">Please select an option</option>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default FormSelect;