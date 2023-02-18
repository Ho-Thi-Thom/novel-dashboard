import React from "react";
import { Navigate } from "react-router-dom";

const Permission = ({ permissions = [], children }) => {
  //   if (true) {
  //     return <Navigate to="/error" />;
  //   }
  return <>{children}</>;
};

export default Permission;
