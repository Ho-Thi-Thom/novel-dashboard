import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const List = lazy(() => import("./pages/List"));
const Edit = lazy(() => import("./pages/Edit"));
const Create = lazy(() => import("./pages/Create"));

const Story = () => {
  return (
    <Routes>
      <Route path="create" element={<Create />} />
      <Route index element={<List />} />
      <Route path=":id" element={<Edit />} />
    </Routes>
  );
};

export default Story;
