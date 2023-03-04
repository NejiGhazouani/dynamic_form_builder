import React, { useState, useContext } from "react";
import { FormContext } from "../components/form/FormContext";
import Form from "../components/form/form";
import { useNavigate } from 'react-router-dom';
import { Field, FieldText, FieldCheckbox, FieldRadio, FieldSelect, FormState, FormFieldsState, FieldType } from "../types/formTypes";
import { FormFieldsContext } from "../components/form/formFields/FormFieldsContext";

const FormBuilder: React.FC = () => {
  const { dispatch: dispatchFormFields } = useContext(FormFieldsContext);
  const { dispatch: dispatchForm } = useContext(FormContext);
  const [fields, setFields] = useState<Field[]>([]);
  const navigate = useNavigate();
  const [formName, setFormName] = useState<string>("");
  const [formData, setFormData] = useState<FormState>({ forms: [] });
  const [currentField, setCurrentField] = useState<Field>({
    id: 0,
    type: "text",
    label: "",
    required: false,
    value: "",
  });

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCurrentField((prevField) => ({ ...prevField, [name]: value }));

  };
  const handleFormNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormName(event.target.value);
  };
  const handleReset = () => {
    dispatchFormFields({ type: "RESET_FORM" });
    setFields([]);
  };


  const handleAddField = () => {
    let newField: Field;
    switch (currentField.type) {
      case "text":
        newField = {
          ...currentField,
          id: Date.now(),
          type: "text",
          value: "",
        } as FieldText;
        break;
      case "checkbox":
        newField = {
          ...currentField,
          id: Date.now(),
          type: "checkbox",
          value: false,
        } as FieldCheckbox;
        break;
      case "radio":
        if (typeof currentField.value === "string") {
          newField = {
            ...currentField,
            id: Date.now(),
            type: "radio",
            options: currentField.value.split(",").map((option: string) => ({ label: option.trim(), value: option.trim() })),
          } as FieldRadio;
        } else {
          return;
        }
        break;
        case "select":
          if (typeof currentField.value === "string") {
            newField = {
              ...currentField,
              id: Date.now(),
              type: "select",
              value:'',
              options: currentField.value.split(",").map((option) => ({ label: option.trim(), value: option.trim() })),
            } as FieldSelect;
          } else {
            throw new Error("Value must be a string.");
          }
          break;
        
      default:
        return;
    }
    dispatchFormFields({ type: "ADD_FIELD", payload: newField });
    setFields((prevFields) => [...prevFields, newField]);
    setCurrentField(newField);
  };

  const handleAddFormToList = () => {
    const newForm = { id: Math.random(), name: formName, fields };
    dispatchForm({ type: "ADD_FORM_DATA", payload: { ...formData, forms: [...formData.forms, newForm] } });
    
    navigate('/FormList');
  };

  const handleDeleteField = (fieldId: number) => {
    dispatchFormFields({ type: "REMOVE_FIELD", payload: fieldId });
    setFields((prevFields) => prevFields.filter((field) => field.id !== fieldId));
  };

  const handleEditField = (fieldId: number) => (updatedField: Field) => {
    dispatchFormFields({ type: "UPDATE_FIELD_VALUE", payload: { fieldId, updatedField } });
    setFields((prevFields) => prevFields.map((field) => (field.id === fieldId ? updatedField : field)));
  };

  return (
<div className="p-4">
  <h1 className="text-3xl font-bold mb-4">Form Builder</h1>
  <div className="grid grid-cols-3 gap-4">
    <div className="col-span-1">
      <label className="block mb-2">
        <span className="font-bold">Type:</span>
        <select
          className="ml-2 p-2 border border-gray-500 rounded"
          name="type"
          value={currentField.type}
          onChange={handleFieldChange}
        >
          <option value="text">Text</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
          <option value="select">Select</option>
        </select>
      </label>
      <label className="block mb-2">
        <span className="font-bold">Label:</span>
        <input
          className="ml-2 p-2 border border-gray-500 rounded"
          type="text"
          name="label"
          value={currentField.label}
          onChange={handleFieldChange}
        />
      </label>
     { ["select", "radio"].includes(currentField.type) ?( <label className="block mb-2">
    <span className="font-bold">Options:</span>
    <input
      className="ml-2 p-2 border border-gray-500 rounded"
      type="text"
      name="value"
      onChange={handleFieldChange}
    />
  </label>): (
        <></>
      )}
      <label className="block mb-2">
        <span className="font-bold">Required:</span>
        <input
          className="ml-2"
          type="checkbox"
          name="required"
          checked={currentField.required}
          onClick={() => setCurrentField((prevField) => ({ ...prevField, required: !prevField.required }))}
        />
      </label>
      <button className="bg-blue-500 text-white rounded p-2 mt-4" onClick={handleAddField}>
        Add Field
      </button>
      {fields.length ? (
        <>
          <h2 className="text-xl font-bold my-4">Form Preview</h2>

          <div className="mb-4">
            <label htmlFor="form-name" className="mr-4">
              Form Name:
            </label>
            <input
              type="text"
              id="form-name"
              name="form-name"
              value={formName}
              onChange={handleFormNameChange}
              className="ml-2 p-2 border border-gray-500 rounded"
            />
          </div>
          <Form fields={fields} onDeleteField={handleDeleteField} onEditField={handleEditField} />
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleAddFormToList}>
            Add Form to List
          </button>
          <button className="bg-red-500 text-white rounded p-2 mt-4" onClick={handleReset}>
            Reset Form
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  </div>
</div>

  );
};
export default FormBuilder;







