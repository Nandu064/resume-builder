import React, { useState, useEffect, createContext, useCallback } from "react";
import "../Components/FormStyles/styles.css";

const AppContext = createContext();

function AppProvider({ children }) {
  const [formData, setFormData] = useState({
    personalDetails: {},
    educationDetails: [],
    experienceDetails: [],
    skills: [],
    languages: [],
    projectDetails: [],
  });
  useEffect(() => {
    let ldata = JSON.parse(JSON.stringify(localStorage.getItem("details")));
    console.log("ldata: ", JSON.parse(ldata));
    setFormData({ ...formData, personalDetails: ldata?.personalDetails });
  }, []);
  const [currentForm, setCurrentForm] = useState(0);
  const handleNextPage = (currentPage) => {
    setCurrentForm((currentForm) => currentForm + 1);
    console.log("formData", formData);
  };
  const handlePrevPage = (currentPage) => {
    setCurrentForm((currentForm) => currentForm - 1);
  };

  return (
    <AppContext.Provider
      value={{
        formData,
        setFormData,
        currentForm,
        setCurrentForm,
        handleNextPage,
        handlePrevPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
