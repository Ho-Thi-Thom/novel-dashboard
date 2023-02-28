import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import useQuery from "../../../hook/useQuery";
import { GET_PERMISSION_OF_ROLE } from "../../../sanity/permission";
import PermissionItem from "./PermissionItem";

const Permission = ({ data, id }) => {
  const { data: permissionOfRole, refetch } = useQuery(GET_PERMISSION_OF_ROLE, { id });

  useEffect(() => {
    refetch({ id });
  }, [id]);

  const result = useMemo(() => {
    if (isEmpty(permissionOfRole) || isEmpty(data)) return [];
    return data.map((item) => {
      const temp = permissionOfRole.listPermission.map((p) => p._id);
      const checked = temp.includes(item._id);
      return { ...item, checked };
    });
  }, [data, permissionOfRole]);

  console.log(result);
  return result.map((item) => {
    return <PermissionItem data={item} key={item._id} color="success" />;
  });
};

export default Permission;
