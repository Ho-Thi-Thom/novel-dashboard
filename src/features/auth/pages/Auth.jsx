import { Box } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import perfect_two from "../../../utils/mp4/perfect_two.mp4";
import client from "../../../sanity/config";

const Auth = () => {
  const [, setLogin] = useState(false);

  const responseGoogle = async (response) => {
    const { sub, name, picture } = jwtDecode(response.credential);

    await client.createIfNotExists({
      _id: sub,
      _type: "user",
      username: name,
      image: picture,
    });

    localStorage.setItem("user", sub);

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
          <GoogleLogin onSuccess={responseGoogle} onFailure={responseGoogle} />
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
