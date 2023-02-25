import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Permission from "../../components/Permission";
import { PERMISSION } from "../../constant/permission";

const List = lazy(() => import("./pages/List"));

const Role = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <Permission route permissions={[PERMISSION.ALL]}>
            <List />
          </Permission>
        }
      />
    </Routes>
  );
};

export default Role;
