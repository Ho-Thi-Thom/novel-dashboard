import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { TIME_CLOSE, useNotify } from "../context/NotifyContext";

const Notification = () => {
  const { show, message, type, closeNotify } = useNotify();
  //   notify :{isOpen :"flase", type:"", massage:""}
  // <Notification notify={{ isOpen: "true", message: "error", type: "error" }} />;
  return (
    <Snackbar open={show} autoHideDuration={TIME_CLOSE} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
      <Alert severity={type} onClose={closeNotify}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
