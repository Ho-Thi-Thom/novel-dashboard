import { Box } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataGrid from "../../../components/DataGrid";
import Header from "../../../components/Header";
import { GET_ALL_USER } from "../../../sanity/users";
import useDataGridService from "../hook/useDataGridService";
import useQuery from "../hook/useQuery";

const List = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(5);

  const { data, loading, error } = useQuery(GET_ALL_USER);

  const handleEdit = (params) => {
    // console.log("user edit", params);
    navigate(params.id, { state: { data: params.row } });
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
