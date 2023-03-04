



  import React, { useContext } from "react";
import { FormContext } from "../components/form/FormContext";
import { FormFieldsState, Field } from "../types/formTypes";
import Form from "../components/form/form";

const ListForm: React.FC = () => {
  const { formState, dispatch } = useContext(FormContext);

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE_FORM", payload: id });
  };

  const handleEdit = (formFields: FormFieldsState) => {
    // implement edit functionality here
  };

  const handleDeleteField = (fieldId: number) => {
    
  };

  const handleEditField = (fieldId: number) => {
    // implement edit field functionality here
  };

  return (
    <div className="p-6">
      {formState.forms.length === 0 ? (
        <p className="text-lg font-medium text-gray-500">No forms found</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {formState.forms.map((formFields) => (
            <div
              key={formFields.id}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {formFields.name}
                </h3>
                <Form
                  fields={formFields.fields}
                  onDeleteField={handleDeleteField}
                  onEditField={handleEditField}
                />
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="button"
                  onClick={() => handleDelete(formFields.id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => handleEdit(formFields)}
                  className="inline-flex items-center ml-3 px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListForm;
