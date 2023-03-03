import { createContext, Dispatch, useReducer } from "react";
import { FormState, FormAction } from "../../types/formTypes";

type FormContextType = {
  formState: FormState;
  dispatch: Dispatch<FormAction>;
};

const initialFormState: FormState = {
  forms: []
};

export const FormContext = createContext<FormContextType>({
  formState: initialFormState,
  dispatch: () => {},
});

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "ADD_FORM_DATA":
      return { forms: [...state.forms, ...action.payload.forms] };
    case "DELETE_FORM":
      return { ...state, forms: state.forms.filter(form => form.id !== action.payload) };
    case "EDIT_FORM":
      return {
        ...state,
        forms: state.forms.map(form => {
          if (form.id === action.payload.id) {
            return { ...action.payload };
          } else {
            return form;
          }
        })
      };
    default:
      return state;
  }
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  return (
    <FormContext.Provider value={{ formState, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

