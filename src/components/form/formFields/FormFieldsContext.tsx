import { createContext, Dispatch, useReducer } from "react";
import { Field, FieldAction,FormFieldsState } from "../../../types/formTypes";


type FormFieldsContextType = {
  formFieldsState: FormFieldsState;
  dispatch: Dispatch<FieldAction>;
};

export const initialFormFieldsState: FormFieldsState = {
  fields: [],
  name: '', 
  id: 0,
};

export const FormFieldsContext = createContext<FormFieldsContextType>({
  formFieldsState: initialFormFieldsState,
  dispatch: () => {},
});

const formFieldsReducer = (state: FormFieldsState, action: FieldAction): FormFieldsState => {
  switch (action.type) {
    case "ADD_FIELD":
      return { ...state, fields: [...state.fields, action.payload] };
      case "UPDATE_FIELD_VALUE":
        if ("id" in action.payload) {
          const { id, value } = action.payload;
          return {
            ...state,
            fields: state.fields.map((field) =>
              field.id === id ? { ...field, value } : field
            ),
          };
        } else if ("fieldId" in action.payload) {
          const { fieldId, updatedField } = action.payload;
          return {
            ...state,
            fields: state.fields.map((field) =>
              field.id === fieldId ? updatedField : field
            ),
          };
        }
        return state;
      
    case "REMOVE_FIELD":
      return { ...state, fields: state.fields.filter((field) => field.id !== action.payload) };
      case "RESET_FORM":
        return { ...initialFormFieldsState };
    default:
      return state;
  }
};

export const FormFieldsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formFieldsState, dispatch] = useReducer(formFieldsReducer, initialFormFieldsState);

  return (
    <FormFieldsContext.Provider value={{ formFieldsState, dispatch }}>
      {children}
    </FormFieldsContext.Provider>
  );
};
