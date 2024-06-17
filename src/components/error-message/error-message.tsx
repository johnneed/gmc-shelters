import React from "react";
import "./styles.css";
import {Typography} from "@mui/material";
interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({message = "An error occurred"}:ErrorMessageProps) => {
  return (
      <div className="error-message">
          <Typography>{message}</Typography>
      </div>
  );
};

export default ErrorMessage;
