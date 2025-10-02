// src/components/RutaPrivadaAdmin.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const RutaPrivadaAdmin = ({ children }) => {
  const autorizado = localStorage.getItem("adminAuth") === "true";

  return autorizado ? children : <Navigate to="/" replace />;
};

export default RutaPrivadaAdmin;
