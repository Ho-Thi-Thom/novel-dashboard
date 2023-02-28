import { useSelect } from "@mui/base";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import Header from "../../../components/Header";
import HeaderContent from "../../../components/HeaderContent";
import useQuery from "../../../hook/useQuery";
import { GET_ALL_PERMISSION } from "../../../sanity/permission";
import { GET_ALL_ROLE } from "../../../sanity/role";
import Permission from "../components/Permission";
import RoleControl from "../components/RoleControl";
import { listToTree } from "../service";

const List = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, loading, error } = useQuery(GET_ALL_ROLE, { level: user.role.level });
  const { data: permission } = useQuery(GET_ALL_PERMISSION);
  const [id, setId] = useState(user.role._id);
  const refactorData = useMemo(() => listToTree(data), [data]);

  return (
    <Box m="20px 5px 20px 20px" sx={{ width: "90%", m: "auto" }}>
      <Header title="Role Control" subtitle="Management role" />
      <Box sx={{ display: "flex", height: "75vh", gap: 2 }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", border: 1, borderRadius: "7px", p: 1.5 }}>
          <HeaderContent title="Role" subtitle="List role" />
          <RoleControl data={refactorData} setId={setId} />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", border: 1, borderRadius: "7px", p: 1.5 }}>
          <HeaderContent title="Permission" subtitle="List permission" />
          <Permission data={permission} id={id} />
        </Box>
      </Box>
    </Box>
  );
};

export default List;
