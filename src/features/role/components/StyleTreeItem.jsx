import { Box, Icon, Typography } from "@mui/material";
import React from "react";

const StyleTreeItem = ({ value }) => {
  return (
    <Box sx={{ width: "100%", padding: "4px 8px", mt: 0.5, minWidth: "100px" }}>
      <Typography variant="h6" color="inherit">
        {value.name}
      </Typography>
    </Box>
  );
};

export default StyleTreeItem;
