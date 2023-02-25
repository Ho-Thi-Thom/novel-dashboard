import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Notification from "./components/Notification";
import Permission from "./components/Permission";
import { NotifyProvider } from "./context/NotifyContext";
import Layout from "./layout/Layout";
import { PERMISSION } from "./constant/permission";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Auth = lazy(() => import("./features/auth"));
const Story = lazy(() => import("./features/story"));
const User = lazy(() => import("./features/user"));
const Role = lazy(() => import("./features/role"));

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
        <NotifyProvider>
          <Notification />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="auth" element={<Auth />} />
              <Route path="/" element={<Layout />}>
                <Route
                  path="story/*"
                  element={
                    <Permission
                      route
                      permissions={[
                        PERMISSION.READ_NOVELS,
                        PERMISSION.WRITE_NOVELS,
                        PERMISSION.EXECUTE_NOVELS,
                        PERMISSION.ALL,
                      ]}
                    >
                      <Story />
                    </Permission>
                  }
                />
                <Route
                  path="user/*"
                  element={
                    <Permission route permissions={[PERMISSION.READ_USERS, PERMISSION.ACTIVE_USERS, PERMISSION.ALL]}>
                      <User />
                    </Permission>
                  }
                />
                <Route
                  path="role/*"
                  element={
                    <Permission route permissions={[PERMISSION.ALL]}>
                      <Role />
                    </Permission>
                  }
                />
              </Route>
              <Route path="error" element={<Error />} />
            </Routes>
          </Suspense>
        </NotifyProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;

const Error = () => {
  return <div>Error</div>;
};
