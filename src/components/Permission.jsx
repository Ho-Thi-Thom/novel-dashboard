import React from "react";
import { Navigate } from "react-router-dom";
import usePermission from "../hook/usePermission";

const Permission = ({ permissions = [], children, route = false }) => {
  const listPermission = usePermission();

  const checkPermission = permissions.some((permission) => listPermission.includes(permission));

  if (!checkPermission) {
    if (route) {
      return <Navigate to="/error" />;
    }
    return <></>;
  }

  return <>{children}</>;
};

export default Permission;
