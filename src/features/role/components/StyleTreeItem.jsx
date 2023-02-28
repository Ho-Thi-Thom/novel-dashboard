import { Box, Icon, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

const StyleTreeItem = ({ value, handleClick }) => {
  const [isActive, setIsActive] = useState(false);
  const active = { color: "red" };
  const style = { width: "100%", padding: "4px 8px", mt: 0.5, minWidth: "100px" };
  return (
    <Box
      sx={isActive ? { ...style } : style}
      onClick={() => {
        setIsActive(true);
        handleClick(value._id);
      }}
    >
      <Typography variant="h6" color="inherit">
        {value.name}
      </Typography>
    </Box>
  );
};

export default StyleTreeItem;
