
import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const emailId = sessionStorage.getItem("emailId");

  if (!emailId) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;


