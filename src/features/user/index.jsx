import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const List = lazy(() => import("./pages/List"));
const Edit = lazy(() => import("./pages/Edit"));
const Create = lazy(() => import("./pages/Create"));

const User = () => {
  return (
    <Routes>
      <Route index element={<List />} />
      <Route path=":id" element={<Edit />} />
      <Route path="create" element={<Create />} />
    </Routes>
  );
};

export default User;
