import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
// import FormList from "./pages/FormList";
// import FormPage from "./pages/FormPage";
import NotFoundPage from "./pages/NotFoundPage";
import { FormProvider } from "./components/form/FormContext";
import { FormFieldsProvider } from "./components/form/formFields/FormFieldsContext";

const App: React.FC = () => {
  return (
    <FormProvider>
      <FormFieldsProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/FormList" element={<FormList />} />
        <Route path="/FormPage" element={<FormPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </FormFieldsProvider>
    </FormProvider>
  );
};

export default App;
