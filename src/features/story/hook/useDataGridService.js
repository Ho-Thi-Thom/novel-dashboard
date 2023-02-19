import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, IconButton } from "@mui/material";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Permission from "../../../components/Permission";
import usePermission from "../../../hook/usePermission";

const useDataGridService = ({ handleDeleteItem }) => {
  const navigate = useNavigate();
  const listPermission = usePermission();
  const columns = useMemo(() => {
    const showActionColumn = ["WNOVELS", "ENOVELS", "RWE"].some((p) => listPermission.includes(p));

    const actionColumn = {
      field: "",
      headerName: "Action",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        return (
          <Box>
            <Permission permissions={["WNOVELS", "RWE"]}>
              <IconButton onClick={() => navigate(params.id)}>
                <ModeEditIcon color="info" />
              </IconButton>
            </Permission>

            <Permission permissions={["ENOVELS", "RWE"]}>
              <IconButton onClick={() => handleDeleteItem?.(params)}>
                <DeleteForeverIcon color="error" />
              </IconButton>
            </Permission>
          </Box>
        );
      },
    };
    const cols = [
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
    ];

    if (showActionColumn) {
      cols.push(actionColumn);
    }

    return cols;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return columns;
};

export default useDataGridService;
