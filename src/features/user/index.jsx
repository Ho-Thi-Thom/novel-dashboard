import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Permission from "../../components/Permission";
import { PERMISSION } from "../../constant/permission";

const List = lazy(() => import("./pages/List"));
const Edit = lazy(() => import("./pages/Edit"));

const User = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <Permission route permissions={[PERMISSION.READ_USERS, PERMISSION.ACTIVE_USERS, PERMISSION.ALL]}>
            <List />
          </Permission>
        }
      />
      <Route
        path=":id"
        element={
          <Permission route permissions={[PERMISSION.ACTIVE_USERS, PERMISSION.ALL]}>
            <Edit />
          </Permission>
        }
      />
    </Routes>
  );
};

export default User;
