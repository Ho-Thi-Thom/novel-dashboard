import { Box, IconButton, Switch, Typography } from "@mui/material";
import React, { useMemo } from "react";
import Permission from "../../../components/Permission";
import { PERMISSION } from "../../../constant/permission";
import usePermission from "../../../hook/usePermission";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const useDataGridService = ({ handleEdit }) => {
  const listPermission = usePermission();
  const columns = useMemo(() => {
    const showActionColumn = [PERMISSION.ACTIVE_USERS, PERMISSION.ALL].some((p) => listPermission.includes(p));

    const actionColumn = {
      field: "",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
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
        field: "roleName",
        headerName: "Role",
        width: 150,
        editable: false,
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
