import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import DataGrid from "../../../components/DataGrid";
import Header from "../../../components/Header";
import client from "../../../sanity/config";
import { GET_ALL_NOVEL } from "../../../sanity/novels";
import { dataGridServices } from "../services";

const List = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery("novels", () => client.fetch(GET_ALL_NOVEL), {
    initialData: [],
  });

  const [open, setOpen] = useState({
    state: false,
    infor: "",
  });
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   client
  //     .fetch(GET_ALL_NOVEL)
  //     .then((result) => {
  //       setData(result);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [isLoading]);

  const openConfirm = (params) => {
    setOpen({ state: true, infor: params.row });
  };

  const handleClose = () => {
    setOpen({ state: false, infor: "" });
  };
  const handleDeleteItem = (params) => {
    openConfirm(params);
    // client
    //   .delete(params.row.id)
    //   .then(() => {
    //     console.log(" deleted", params.row);
    //     // setIsLoading(true);
    //     refetch();
    //   })
    //   .catch((err) => {
    //     console.error("Delete failed: ", err.message);
    //   });
  };
  const handleConfirm = () => {
    // console.log(open.infor);
    // delete
    handleClose();
  };
  const [pageSize, setPageSize] = useState(7);

  const columns = useMemo(() => {
    return dataGridServices.getColumn({
      handleDeleteItem,
      navigate,
    });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box m="20px 5px 20px 20px">
      <Header title="Novels" subtitle="List of Novel" />
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
      <Dialog
        open={open.state}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete this story ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{open.infor.title}</DialogContentText>
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
