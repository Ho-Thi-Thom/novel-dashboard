import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { Suspense } from "react";
import { ColorModeContext, useMode } from "../theme";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { login } from "../app/auth";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useNotify } from "../context/NotifyContext";
import client from "../sanity/config";
import { GET_USER_LOGIN } from "../sanity/users";

const Layout = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Suspense fallback={<div>Loading Child</div>}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const authHOC = (Component) => () => {
  const { notify } = useNotify();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const googleId = localStorage.getItem("user");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await client.fetch(GET_USER_LOGIN, {
          googleId: googleId,
        });
        // googleId FAKE
        if (!data) {
          notify.err("Fake GoogleId :(");
          localStorage.removeItem("user");
          navigate("/auth");
          return;
        }

        // NOT ACTIVE ROLE
        if (!data.role) {
          notify.info("Not active account");
          localStorage.removeItem("user");
          navigate("/auth");
          return;
        }

        // SET TO REDUX
        dispatch(login(data));
      } catch (error) {
        notify.err(error?.message);
        localStorage.removeItem("user");
        navigate("/auth");
      }
    };
    checkUser();
  }, []);

  if (!googleId) {
    return <Navigate to="/auth" />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return <Component />;
};

export default authHOC(Layout);
