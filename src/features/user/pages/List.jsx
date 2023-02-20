import { Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DataGrid from "../../../components/DataGrid";
import Header from "../../../components/Header";
import { GET_ALL_USER, GET_ALL_ROLE } from "../../../sanity/users";
import { dataGridServices } from "../services";
import useQuery from "../hook/useQuery";
import useDataGridService from "../hook/useDataGridService";

const List = () => {
  const [pageSize, setPageSize] = useState(2);

  const { data, loading, error } = useQuery(GET_ALL_USER);

  const handleEdit = (params) => {
    console.log(params);
  };

  const columns = useDataGridService({
    handleEdit,
  });

  if (loading) return <div> Loading ....</div>;

  if (error) <div>{error.message}</div>;

  return (
    <Box m="20px 5px 20px 20px">
      <Header title="List User" subtitle="List of employees of Novels" />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Link style={{ textDecoration: "none" }} to="create"></Link>
      </Box>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[7, 10, 20]}
        pagination
      />
    </Box>
  );
};

export default List;
