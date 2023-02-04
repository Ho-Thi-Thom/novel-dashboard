import { ListItem, Typography } from "@mui/material";
import React from "react";

const Item = ({ data }) => {
  return (
    <ListItem>
      <Typography>{data.vi}</Typography>
    </ListItem>
  );
};

export default Item;
