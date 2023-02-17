import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import TextField from "../../../../../components/base/TextField";

const shema = yup.object().shape({
  en: yup.string().required("required"),
  vi: yup.string().required("required"),
});
const initialValue = {
  en: "",
  vi: "",
};
const VocabularyInput = ({ onCancel, onSubmit, defaultValues }) => {
  const form = useForm({
    defaultValues: defaultValues ?? initialValue,
    resolver: yupResolver(shema),
  });

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, border: 1, p: 2, borderRadius: "4px" }}>
        <TextField variant="standard" control={form.control} name="en" label="English" />
        <TextField variant="standard" control={form.control} name="vi" label="Vietnamese" />
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button variant="contained" color="info" type="submit">
            Save
          </Button>
          {onCancel && (
            <Button variant="outlined" color="error" type="button" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </form>
  );
};

export default VocabularyInput;
