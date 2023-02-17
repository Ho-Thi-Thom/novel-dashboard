import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField as TF,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import TextField from "../../../components/base/TextField";
import client from "../../../sanity/config";
import { ROLE } from "../../../sanity/users";

const validationSchema = yup.object().shape({
  username: yup.string().required("required"),
  role: yup.string().notOneOf([""], "You must select an option!"),
});

const initialValues = {
  username: "",
  role: "",
  id: "",
  keyRole: "",
};
const DialogEdit = ({ dialog, setDialog, handleClose }) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    client.fetch(ROLE).then((result) => {
      setRoles(result);
    });
  }, []);

  console.log(roles);
  const [age, setAge] = useState("");

  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  // useEffect(() => {
  //   if (dialog) {
  //     form.reset(dialog);
  //   }
  // }, []);

  const handleSubmit = (data) => {
    console.log("abc");
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Dialog
      open={dialog.state}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={{ padding: 2, minWidth: "400px" }}>
        <DialogTitle id="alert-dialog-title">Update User ?</DialogTitle>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <TextField control={form.control} name="username" label="Username" size="medium" />
          <TextField
            control={form.control}
            name="role"
            label="Role"
            size="medium"
            sx={{ mt: "20px", mb: "20px", display: "flex" }}
          />

          <Box sx={{ my: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Role"
                onChange={handleChange}
              >
                {roles.map((item, index) => {
                  return <MenuItem key={index}>{item.name} </MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default DialogEdit;
