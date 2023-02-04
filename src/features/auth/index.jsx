import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Auth = lazy(() => import("./pages/Auth"));

const AuthPage = () => {
  return (
    <Routes>
      <Route index element={<Auth />} />
    </Routes>
  );
};

export default AuthPage;
