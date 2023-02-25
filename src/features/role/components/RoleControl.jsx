import { TreeItem, TreeView } from "@mui/lab";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useMemo } from "react";
import { isEmpty } from "lodash";

let i = 0;
const RoleControl = ({ data = [] }) => {
  const renderTree = useMemo(() => {
    const renderItem = (data) => {
      return (
        <>
          {data.map((item) => {
            return (
              <TreeItem key={item._id} nodeId={item._id} label={<div>{item.name}</div>}>
                {!isEmpty(item.children) && renderItem(item.children)}
              </TreeItem>
            );
          })}
        </>
      );
    };

    return renderItem(data);
  }, [data]);

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ flex: 1, overflowY: "auto" }}
    >
      {renderTree}
    </TreeView>
  );
};

export default RoleControl;
