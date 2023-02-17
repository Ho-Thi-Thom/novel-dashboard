import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
const Notification = (props) => {
  const { notify } = props;
  //   notify :{isOpen :"flase", type:"", massage:""}
  // <Notification notify={{ isOpen: "true", message: "error", type: "error" }} />;
  return (
    <Snackbar open={notify.isOpen} autoHideDuration={3000} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
      <Alert severity={notify.type}>{notify.message}</Alert>
    </Snackbar>
  );
};

export default Notification;
