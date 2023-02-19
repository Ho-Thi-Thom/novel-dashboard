import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Permission from "../../components/Permission";

const List = lazy(() => import("./pages/List"));
const Edit = lazy(() => import("./pages/Edit"));
const Create = lazy(() => import("./pages/Create"));

const Story = () => {
  return (
    <Routes>
      <Route
        path="create"
        element={
          <Permission route permissions={["RNOVELS", "WNOVELS", "RWE"]}>
            <Create />
          </Permission>
        }
      />
      <Route
        index
        element={
          <Permission route permissions={["RNOVELS", "RWE"]}>
            <List />
          </Permission>
        }
      />
      <Route
        path=":id"
        element={
          <Permission route permissions={["RNOVELS", "WNOVELS", "RWE"]}>
            <Edit />
          </Permission>
        }
      />
    </Routes>
  );
};

export default Story;
