import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { lazy } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataGrid from "../../../components/DataGrid";
import Header from "../../../components/Header";
import client from "../../../sanity/config";
import { GET_ALL_USER } from "../../../sanity/users";
import { dataGridServices } from "../services";
const DialogEdit = lazy(() => import("./DialogEdit"));

const List = () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(2);
  const [dialog, setDialog] = useState({
    state: false,
  });

  useEffect(() => {
    client
      .fetch(GET_ALL_USER)
      .then((result) => {
        const temp = result.map((item) => {
          return { id: item.id, username: item.username, role: item.role.name, keyRole: item.role.key };
        });
        setData(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEdit = (params) => {
    setDialog({ state: true, ...params });
  };

  const handleClose = () => {
    // setDialog((dialog.state = true));
  };
  const columns = useMemo(() => {
    return dataGridServices.getColumn({ handleEdit });
  }, []);

  return (
    <Box m="20px 5px 20px 20px">
      <Header title="List User" subtitle="List of employees of Novels" />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Link style={{ textDecoration: "none" }} to="create">
          <Button variant="contained" color="secondary">
            Create
          </Button>
        </Link>
      </Box>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[7, 10, 20]}
        pagination
      />
      {dialog.state ? <DialogEdit dialog={dialog} setDialog={setDialog} handleClose={handleClose} /> : ""}
    </Box>
  );
};

export default List;
