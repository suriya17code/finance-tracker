
"use client"
import React, { createContext, useState, useContext } from "react";
import { Snackbar, Alert, AlertColor, SlideProps, Slide, keyframes } from "@mui/material";
 
interface SnackbarContextProps {
  showSnackbar: (message: string, severity: AlertColor) => void;
}
 
const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);
 
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
 
export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error" | "info" | "warning",
      });

      const showSnackbar = (message: string, severity: "success" | "error" | "info" | "warning" = "success") => {
        setSnackbar({ open: true, message, severity });
      };    
      
  const bounceAnimation = keyframes`
    0% { transform: translateY(-50px); opacity: 0; }
    50% { transform: translateY(0); opacity: 1; }
    75% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  `;
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}
 
  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
       open={snackbar.open}
       autoHideDuration={3000}
       onClose={() => setSnackbar({ ...snackbar, open: false })}
       sx={{
        "& .MuiPaper-root": {
          animation: `${bounceAnimation} 0.6s ease-in-out`,
        },
      }}
       >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
        {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
 