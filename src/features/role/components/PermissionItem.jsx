import { Box, Checkbox, Typography } from "@mui/material";
import React from "react";

const PermissionItem = ({ data, ...prop }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", pointerEvents: "none" }}>
      <Checkbox {...prop} checked={data.checked} />
      <Typography variant="h6">{data.name}</Typography>
    </Box>
  );
};

export default PermissionItem;
