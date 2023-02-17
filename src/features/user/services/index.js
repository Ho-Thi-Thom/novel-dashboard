import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, IconButton } from "@mui/material";

export const dataGridServices = {
  getColumn: ({ handleEdit }) => [
    {
      field: "username",
      headerName: "Username",
      editable: true,
      width: 150,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      width: 150,
    },
    {
      field: "",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            <IconButton onClick={() => handleEdit(params.row)}>
              <ModeEditIcon color="info" />
            </IconButton>
          </Box>
        );
      },
    },
  ],
};

export const services = {};
