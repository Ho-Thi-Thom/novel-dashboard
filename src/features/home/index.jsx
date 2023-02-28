import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("./pages/Dashboard"));

const Home = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
    </Routes>
  );
};

export default Home;
