import React, { useContext, useState } from "react";
import { FieldText } from "../../../types/formTypes";
import { FormFieldsContext } from "./FormFieldsContext";

interface FormTextProps {
  field: FieldText;
}

const FormText: React.FC<FormTextProps> = ({ field }) => {
  const { dispatch } = useContext(FormFieldsContext);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    dispatch({
      type: "UPDATE_FIELD_VALUE",
      payload: { id: field.id, value:inputValue },
    });
  };

  return (
    <div className="my-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.label}>
        {field.label}
      </label>
      <input
        type="text"
        id={field.label}
        name={field.label}
        required={field.required}
        value={inputValue}
        onChange={handleChange}
        className="ml-2 p-2 border border-gray-500 rounded"
      />
    </div>
  );
};

export default FormText;
