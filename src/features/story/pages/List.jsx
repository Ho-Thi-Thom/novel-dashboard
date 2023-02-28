import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import DataGrid from "../../../components/DataGrid";
import Header from "../../../components/Header";
import Permission from "../../../components/Permission";
import client from "../../../sanity/config";
import { GET_ALL_NOVEL, SEARCH_PARAMS } from "../../../sanity/novels";
import useDataGridService from "../hook/useDataGridService";
import { PERMISSION } from "../../../constant/permission";
import useQuery from "../../../hook/useQuery";
import Search from "../../../components/Search";
const List = () => {
  const [open, setOpen] = useState({
    state: false,
    info: "",
  });
  const { data, loading, error, refetch } = useQuery(GET_ALL_NOVEL);

  const handleClose = () => {
    setOpen({ state: false, info: "" });
  };

  const handleDeleteItem = (params) => {
    setOpen({ state: true, info: params.row });
  };

  const handleConfirm = () => {
    client
      .delete(open.info?.id)
      .then(() => {
        refetch();
      })
      .catch((err) => {
        console.error("Delete failed: ", err.message);
      });
    handleClose();
  };
  const [pageSize, setPageSize] = useState(7);

  const columns = useDataGridService({
    handleDeleteItem,
  });

  const handleSearch = ({ params }) => {
    let value = params.trim();
    if (value) {
      refetch(
        {
          value: `*${value}*`,
        },
        SEARCH_PARAMS
      );
    } else {
      refetch();
    }
  };

  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <Box m="20px 5px 20px 20px" sx={{ width: "90%", m: "auto" }}>
      <Header title="Novels" subtitle="List of Novel" />
      <Permission permissions={[PERMISSION.WRITE_NOVELS, PERMISSION.ALL]}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, alignItems: "flex-end" }}>
          <Typography>{loading && "Loading ...."}</Typography>
          <Box sx={{ display: "flex", justifyContent: "end", gap: 2, alignItems: "center" }}>
            <Search onSearch={handleSearch} />
            <Link style={{ textDecoration: "none" }} to="create">
              <Button variant="contained" color="info">
                Create
              </Button>
            </Link>
          </Box>
        </Box>
      </Permission>

      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[7, 10, 20]}
        pagination
      />

      <Dialog
        open={open.state}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete this story ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{open.info.title}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default List;
