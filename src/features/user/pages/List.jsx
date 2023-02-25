import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DataGrid from "../../../components/DataGrid";
import Header from "../../../components/Header";
import { GET_ALL_USER } from "../../../sanity/users";
import useDataGridService from "../hook/useDataGridService";
import useQuery from "../../../hook/useQuery";

const List = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(5);
  const { user } = useSelector((state) => state.auth);
  const { data, loading, error } = useQuery(GET_ALL_USER, {
    level: user.role.level,
  });

  const handleEdit = (params) => {
    navigate(params.id);
  };

  const columns = useDataGridService({
    handleEdit,
  });

  const refactorData = useMemo(() => {
    if (!data) return [];

    return data
      .map((item) => {
        return item.users;
      })
      .flat(Infinity);
  }, [data]);

  if (loading) return <div> Loading ....</div>;

  if (error) <div>{error.message}</div>;

  return (
    <Box m="20px 5px 20px 20px" sx={{ width: "90%", m: "auto" }}>
      <Header title="List User" subtitle="List of employees of Novels" />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Link style={{ textDecoration: "none" }} to="create"></Link>
      </Box>
      <DataGrid
        rows={refactorData}
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
