import React from "react";
import PermissionItem from "./PermissionItem";

const Permission = ({ data }) => {
  return data.map((item) => {
    return <PermissionItem data={item} key={item._id} />;
  });
};

export default Permission;
