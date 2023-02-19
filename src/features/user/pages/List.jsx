import { Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DataGrid from "../../../components/DataGrid";
import Header from "../../../components/Header";
import client from "../../../sanity/config";
import { GET_ALL_USER, ROLE } from "../../../sanity/users";
import { dataGridServices } from "../services";

const List = () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(2);

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

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    client.fetch(ROLE).then((result) => {
      console.log(result);
      const temp = result.map((item) => {
        return { value: item.key, label: item.name };
      });
      console.log(temp);
      setRoles(temp);
    });
  }, []);

  const handleEdit = (params) => {};

  const columns = useMemo(() => {
    return dataGridServices.getColumn({ handleEdit, roles });
  }, []);

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
