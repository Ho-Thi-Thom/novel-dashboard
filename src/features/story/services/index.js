import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, IconButton } from "@mui/material";
import Permission from "../../../components/Permission";
import { PERMISSION } from "../../../constant/permission";

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
          <img alt="img-novel" src={require("../../../utils/img/novel.png")} width={60} height={40} />
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
            <Permission permissions={[PERMISSION.WRITE_NOVELS, PERMISSION.ALL]}>
              <IconButton onClick={() => navigate(params.id)}>
                <ModeEditIcon color="info" />
              </IconButton>
            </Permission>

            <Permission permissions={[PERMISSION.EXECUTE_NOVELS, PERMISSION.ALL]}>
              <IconButton onClick={() => handleDeleteItem(params)}>
                <DeleteForeverIcon color="error" />
              </IconButton>
            </Permission>
          </Box>
        );
      },
    },
  ],
};

export const services = {};
