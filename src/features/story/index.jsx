import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Permission from "../../components/Permission";
import { PERMISSION } from "../../constant/permission";

const List = lazy(() => import("./pages/List"));
const Edit = lazy(() => import("./pages/Edit"));
const Create = lazy(() => import("./pages/Create"));

const Story = () => {
  return (
    <Routes>
      <Route
        path="create"
        element={
          <Permission route permissions={[PERMISSION.READ_NOVELS, PERMISSION.WRITE_NOVELS, PERMISSION.ALL]}>
            <Create />
          </Permission>
        }
      />
      <Route
        index
        element={
          <Permission route permissions={[PERMISSION.READ_NOVELS, PERMISSION.ALL]}>
            <List />
          </Permission>
        }
      />
      <Route
        path=":id"
        element={
          <Permission route permissions={[PERMISSION.READ_NOVELS, PERMISSION.WRITE_NOVELS, PERMISSION.ALL]}>
            <Edit />
          </Permission>
        }
      />
    </Routes>
  );
};

export default Story;
