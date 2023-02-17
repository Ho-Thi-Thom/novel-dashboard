import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

const Dialog = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog
      open={open.state}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Novel ?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{open?.infor?.title}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleConfirm} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Dialog;
