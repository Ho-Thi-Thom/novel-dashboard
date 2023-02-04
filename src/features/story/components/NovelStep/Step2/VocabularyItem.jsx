import React, { forwardRef } from "react";
import { Box, Typography } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { tokens } from "../../../../../theme";
import { useTheme } from "@emotion/react";
const VocabularyItem = ({ data }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "vocabulary",
    item: { data },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "vocabulary",
    drop: (item) => console.log(item),
    hover: (item) => {
      console.log(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  if (!isDragging && canDrop) {
    return <Item data={data} ref={drop} sx={isOver && { bgcolor: "red" }} />;
  }

  return (
    <>
      <Item data={data} ref={drag} />
    </>
  );
};

export default VocabularyItem;

const Item = forwardRef(({ data, sx = {}, ...props }, ref) => {
  const theme = useTheme();
  const color = tokens(theme);
  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        gap: 2,
        ...sx,
        border: 1,
        marginY: 1,
        p: "7px",
        borderRadius: "4px",
      }}
      {...props}
    >
      <MoreVertOutlinedIcon />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Typography>{data.en}</Typography>/<Typography>{data.vi}</Typography>
      </Box>
    </Box>
  );
});
