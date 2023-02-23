import { Box, InputLabel, Switch as Sw } from "@mui/material";
import React, { useId } from "react";
import { Controller } from "react-hook-form";

const Switch = ({ control, name, label, onChange, ...props }) => {
  const id = useId();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Sw checked={field.value} color="secondary" onChange={(e, value) => field.onChange(value)} id={id} />
          <InputLabel htmlFor={id} sx={{ cursor: "pointer", userSelect: "none" }}>
            {label}
          </InputLabel>
        </Box>
      )}
    />
  );
};

export default Switch;
