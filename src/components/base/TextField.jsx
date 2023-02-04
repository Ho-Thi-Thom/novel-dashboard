import React from "react";
import { TextField as MTextField } from "@mui/material";
import { Controller } from "react-hook-form";

const TextField = ({ control, name, label, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <MTextField
          variant="outlined"
          fullWidth
          label={label}
          error={error}
          helperText={error?.message}
          {...field}
          {...props}
        />
      )}
    />
  );
};

export default TextField;
