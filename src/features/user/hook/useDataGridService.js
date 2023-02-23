import { Box, IconButton, Switch, Typography } from "@mui/material";
import React, { useMemo } from "react";
import Permission from "../../../components/Permission";
import { PERMISSION } from "../../../constant/permission";
import usePermission from "../../../hook/usePermission";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useSelector } from "react-redux";

const useDataGridService = ({ handleEdit }) => {
  const listPermission = usePermission();
  const { user } = useSelector((state) => state.auth);
  const columns = useMemo(() => {
    const showActionColumn = [PERMISSION.ACTIVE_USERS, PERMISSION.ALL].some((p) => listPermission.includes(p));

    const actionColumn = {
      field: "",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        if (user._id === params.row.id) return null;
        return (
          <Box>
            <Permission permissions={[PERMISSION.ACTIVE_USERS, PERMISSION.ALL]}>
              <IconButton onClick={() => handleEdit(params)}>
                <ModeEditIcon color="info" />
              </IconButton>
            </Permission>
          </Box>
        );
      },
    };
    const cols = [
      {
        field: "username",
        headerName: "Username",
        width: 150,
        editable: false,
      },
      {
        field: "role",
        headerName: "Role",
        width: 150,
        editable: false,
        renderCell: (params) => params.row.role?.name,
      },
      {
        field: "active",
        headerName: "Active",
        flex: 1,
        editable: false,
        renderCell: (params) => {
          const isActive = params.row.active;
          return <Typography color={isActive ? "cyan" : "crimson"}>{isActive ? "Active" : "InActive"}</Typography>;
        },
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
