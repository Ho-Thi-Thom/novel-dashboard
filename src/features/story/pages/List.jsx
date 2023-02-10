import { Box, Button } from "@mui/material";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import DataGrid from "../../../components/DataGrid";
import Header from "../../../components/Header";
import client from "../../../sanity/config";
import { GET_ALL_NOVEL } from "../../../sanity/novels";
import { dataGridServices } from "../services";

const List = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery("novels", () => client.fetch(GET_ALL_NOVEL), {
    initialData: [],
  });

  const handleDeleteItem = (params) => {
    console.log(params.row.title);
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
          <Button variant="contained" color="secondary" onClick={() => {}}>
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
        // checkboxSelection
        // onSelectionModelChange={(item) => console.log(item)}
      />
    </Box>
  );
};

export default List;
