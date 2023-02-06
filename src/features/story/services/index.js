import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, IconButton } from "@mui/material";

export const dataGridServices = {
  getColumn: ({ navigate, handleDeleteItem }) => [
    {
      field: "imageUrl",
      headerName: "Image",
      cellClassName: "name-column--cell",
      editable: true,
      renderCell: (params) => {
        return params.value ? (
          <img src={params.value} width={60} height={40} alt="img-novel" />
        ) : (
          <img alt="img-novel" src={require("../../../untils/img/novel.png")} width={60} height={40} />
        );
      },
    },
    {
      field: "title",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "updatedAt",
      headerName: "Updated",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "",
      headerName: "Action",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        return (
          <Box>
            <IconButton
              onClick={() =>
                navigate(params.id, {
                  state: {
                    data: "data",
                  },
                })
              }
            >
              <ModeEditIcon color="info" />
            </IconButton>
            <IconButton onClick={() => handleDeleteItem(params)}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        );
      },
    },
  ],
};

export const services = {};
