import { Box } from "@mui/material";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
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

  const columns = useMemo(() => {
    return dataGridServices.getColumn({
      handleDeleteItem,
      navigate,
    });
  }, []);

  return (
    <Box m="20px 5px 20px 20px">
      <Header title="Novels" subtitle="List of Novel" />

      <DataGrid
        rows={data}
        columns={columns}
        // checkboxSelection
        // onSelectionModelChange={(item) => console.log(item)}
      />
    </Box>
  );
};

export default List;
