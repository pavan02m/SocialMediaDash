import React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  if (localStorage.getItem("auth_token")) {
    return <Navigate to={"/home"} />;
  } else {
    return children;
  }
}
