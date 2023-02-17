import { Box, FormControl, InputLabel, MenuItem, Typography } from "@mui/material";
import React from "react";
import Select from "@mui/material/Select";
import { useState } from "react";
import { Controller } from "react-hook-form";

const SelectBox = ({ control, data, ...props }) => {
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  console.log("abc", data);
  return (
    <Controller
      control={control}
      name={data.infor.roleName}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="simple-select-autowidth-label">{data.infor.roleName}</InputLabel>
          <Select
            labelId="simple-select-autowidth-label"
            id="simple-select-autowidth"
            value={age}
            onChange={handleChange}
            autoWidth
            label={data.infor.roleName}
            color="secondary"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Twenty</MenuItem>
            <MenuItem value={21}>Twenty one</MenuItem>
            <MenuItem value={22}>Twenty one and a half</MenuItem>
          </Select>
        </FormControl>
      )}
    />
  );
};

export default SelectBox;
