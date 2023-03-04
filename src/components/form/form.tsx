import React, { useContext } from "react";
import { FormFieldsContext } from "./formFields/FormFieldsContext";
import { Field, FieldText, FieldCheckbox, FieldRadio, FieldSelect } from "../../types/formTypes";
import FormText from "./formFields/FormText";
import FormCheckbox from "./formFields/FormCheckbox";
import FormRadio from "./formFields/FormRadio";
import FormSelect from "./formFields/FormSelect";

type Props = {
  fields: Field[];
  onDeleteField: (fieldId: number) => void;
  onEditField: (fieldId: number) => void;
};

const Form: React.FC<Props> = ({ fields, onDeleteField, onEditField }) => {
  const { dispatch } = useContext(FormFieldsContext);

  const renderField = (field: Field) => {
    switch (field.type) {
      case "text":
        return (
          <FormText
            key={field.id}
            field={field as FieldText}
            

          />
        );
      case "checkbox":
        return (
          <FormCheckbox
            key={field.id}
            field={field as FieldCheckbox}
            dispatch={dispatch}
            onDeleteField={onDeleteField}
            onEditField={onEditField}
          />
        );
      case "radio":
        return (
          <FormRadio
            key={field.id}
            field={field as FieldRadio}
            dispatch={dispatch}
            onDeleteField={onDeleteField}
            onEditField={onEditField}
          />
        );
      case "select":
        return (
          <FormSelect
          index={0}
            key={field.id}
            field={field as FieldSelect}
            dispatch={dispatch}
            onDeleteField={onDeleteField}
            onEditField={onEditField}
          />
        );
      default:
        return null;
    }
  };

  return <form>{fields.map(renderField)}</form>;
};

export default Form;
