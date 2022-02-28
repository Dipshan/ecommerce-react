import React, { createContext } from "react";
import { useState } from "react";

export const SnackbarContext = createContext();

function SnackbarProvider({ children }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    messsage: "",
    type: "success",
  });

  const openSnackbar = (message, type = "success") => {
    setSnackbar({
      open: true,
      message,
      type,
    });
  };

  const closeSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <SnackbarContext.Provider
      value={{
        snackbar,
        openSnackbar,
        closeSnackbar,
      }}
      className="snackbar-body"
    >
      {children}
    </SnackbarContext.Provider>
  );
}

export default SnackbarProvider;
