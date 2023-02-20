import { Box, Button } from "@mui/material";
import { gapi } from "gapi-script";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { Navigate } from "react-router-dom";
import client from "../../../sanity/config";
import perfect_two from "../../../utils/img/mp4/perfect_two.mp4";

const Auth = () => {
  const [, setLogin] = useState(false);

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: process.env.REACT_APP_GOOGLE_API_TOKEN });
    });
  }, []);

  const responseGoogle = async (response) => {
    const { googleId, name, imageUrl } = response.profileObj;

    await client.createIfNotExists({
      _id: googleId,
      _type: "user",
      username: name,
      image: imageUrl,
    });

    localStorage.setItem("user", googleId);

    // FAKE re-render
    setLogin(true);
  };

  if (localStorage.getItem("user")) {
    return <Navigate to="/" />;
  }

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
