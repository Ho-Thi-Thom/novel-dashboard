import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, IconButton, Switch } from "@mui/material";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Permission from "../../../components/Permission";
import usePermission from "../../../hook/usePermission";
import { PERMISSION } from "../../../constant/permission";

const useDataGridService = ({ handleEdit }) => {
  const navigate = useNavigate();
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
                <ModeEditIcon color="warning" />
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
          return (
            <Box>
              <Switch checked={params.row.active} inputProps={{ "aria-label": "controlled" }} color="info" />
            </Box>
          );
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
