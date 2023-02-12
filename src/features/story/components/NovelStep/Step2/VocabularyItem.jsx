import { useTheme } from "@emotion/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Box, IconButton, Typography } from "@mui/material";
import React, { forwardRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { tokens } from "../../../../../theme";
import VocabularyInput from "./VocabularyInput";

const VocabularyItem = ({ data, onMove, onCreate, onEdit, onDelete }) => {
  const theme = useTheme();
  const color = tokens(theme);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "vocabulary",
    item: { data },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "vocabulary",
    drop: (item) => onMove(item.data),
    // hover: (item) => {
    //   console.log(item);
    // },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  if (!isDragging && canDrop) {
    return <Item data={data} ref={drop} sx={isOver && { bgcolor: "red" }} />;
  }

  return (
    <Item
      data={data}
      ref={drag}
      sx={isDragging && { bgcolor: color.grey[400] }}
      onCreate={onCreate}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default VocabularyItem;

const Item = forwardRef(({ data, sx = {}, onCreate, onEdit, onDelete, ...props }, ref) => {
  const [parent] = useAutoAnimate();
  const [showInput, setShowInput] = useState({
    show: false,
    isEdit: false,
  });
  const theme = useTheme();
  const color = tokens(theme);
  const handleOpenInput = (isEdit) => {
    setShowInput({
      show: true,
      isEdit,
    });
  };
  const handleCloseInput = () => {
    setShowInput({
      show: false,
      isEdit: false,
    });
  };
  const handleSubmit = (newData) => {
    if (showInput.isEdit) {
      onEdit(newData);
    } else {
      onCreate(newData);
    }
    handleCloseInput();
  };
  return (
    <Box ref={parent}>
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
        alignItems="center"
      >
        <MoreVertOutlinedIcon />
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Typography whiteSpace="nowrap">{data.en}</Typography>
          <Typography whiteSpace="nowrap">{data.vi}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 0.3 }}>
          <IconButton onClick={() => handleOpenInput(true)}>
            <CreateOutlinedIcon />
          </IconButton>
          <IconButton onClick={() => handleOpenInput(false)}>
            <AddCircleOutlineIcon sx={{ color: color.blueAccent[500] }} />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteOutlinedIcon color="error" />
          </IconButton>
        </Box>
      </Box>
      {showInput.show && (
        <VocabularyInput
          defaultValues={showInput.isEdit ? data : null}
          onCancel={handleCloseInput}
          onSubmit={handleSubmit}
        />
      )}
    </Box>
  );
});
