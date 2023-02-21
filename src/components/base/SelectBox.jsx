import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import React, { useId } from "react";
import { Controller } from "react-hook-form";

const SelectBox = ({
  control,
  data,
  label,
  name,
  options = [],
  getLabelOption = (option) => option.name,
  getValueOption = (option) => option._id,
  ...props
}) => {
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id={id} color="secondary">
            {label}
          </InputLabel>
          <Select
            labelId={id}
            label={label}
            value={field.value}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(value);
            }}
            color="secondary"
            autoWidth
          >
            {options?.map((option, index) => {
              const value = getValueOption?.(option);
              const label = getLabelOption?.(option);
              return (
                <MenuItem key={index} value={value}>
                  {label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default SelectBox;
