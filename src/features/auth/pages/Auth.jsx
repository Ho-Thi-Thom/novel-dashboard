import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import perfect_two from "../../../untils/img/mp4/perfect_two.mp4";
import { Box, Button, Typography } from "@mui/material";
import client from "../../../sanity/config";
import md5 from "md5";
import { useQuery } from "react-query";
import { GET_USER_LOGIN } from "../../../sanity/users";
import { useState } from "react";
import Notification from "../../../components/Notification";
const Auth = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: "860741111025-eigskqdrv1vnms8vfnb6pneol98720es.apps.googleusercontent.com" });
    });
  }, []);

  const checkUserLogin = (googleId) => {
    try {
      client.fetch(GET_USER_LOGIN, { googleId: md5(googleId) }).then((resutl) => {
        setData(resutl);
      });
    } catch (error) {
      return false;
    }
    return true;
  };
  const responseGoogle = (response) => {
    const { googleId, name } = response.profileObj;
    if (checkUserLogin(googleId)) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/", { replace: true });
    } else {
      client
        .createIfNotExists({
          _id: md5(googleId),
          _type: "user",
          username: name,
        })
        .then(() => {
          <Notification
            notify={{
              isOpen: "true",
              message: "Your account has been registered, please wait for the administrator to confirm!",
              type: "infor",
            }}
          />;
        })
        .catch((error) => {
          <Notification
            notify={{
              isOpen: "true",
              message: error,
              type: "infor",
            }}
          />;
        });
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <video
        src={perfect_two}
        type="video/mp4"
        loop
        controls
        muted
        autoPlay
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          objectFit: "fill",
          opacity: "0.5",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "50%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                variant="outlined"
                color="primary"
                startIcon={<FcGoogle />}
              >
                Sign in with Google
              </Button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
