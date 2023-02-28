import { Box, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DataGrid from "../../../components/DataGrid";
import Header from "../../../components/Header";
import { GET_ALL_USER, SEARCH_PARAMS } from "../../../sanity/users";
import useDataGridService from "../hook/useDataGridService";
import useQuery from "../../../hook/useQuery";
import Search from "../../../components/Search";
import { isEmpty } from "lodash";

const List = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(5);
  const { user } = useSelector((state) => state.auth);
  const { data, loading, error, refetch } = useQuery(GET_ALL_USER, {
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

  const handleSearch = ({ params }) => {
    let value = params.trim();
    if (value) {
      refetch(
        {
          level: user.role.level,
          value: `*${value}*`,
        },
        SEARCH_PARAMS
      );
    } else {
      refetch({
        level: user.role.level,
      });
    }
  };

  if (error) <div>{error.message}</div>;

  return (
    <Box m="20px 5px 20px 20px" sx={{ width: "90%", m: "auto" }}>
      <Header title="List User" subtitle="List of employees of Novels" />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <Typography>{loading && "Loading ...."}</Typography>
        <Search onSearch={handleSearch} />
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
