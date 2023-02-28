import { isEmpty } from "lodash";
import React, { useMemo, useState } from "react";
import useQuery from "../../../hook/useQueryPermission";
import { GET_PERMISSION_OF_ROLE } from "../../../sanity/permission";
import PermissionItem from "./PermissionItem";

const Permission = ({ data, id }) => {
  const { data: permissionOfRole } = useQuery(GET_PERMISSION_OF_ROLE, { id: id });

  const result = useMemo(() => {
    if (isEmpty(permissionOfRole) || isEmpty(data)) return [];
    return data.map((item) => {
      const temp = permissionOfRole.listPermission.map((p) => p._id);
      const checked = temp.includes(item._id);
      return { ...item, checked };
    });
  }, [data, permissionOfRole]);

  return result.map((item) => {
    return <PermissionItem data={item} key={item._id} />;
  });
};

export default Permission;
