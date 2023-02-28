import { TreeItem, TreeView, treeItemClasses } from "@mui/lab";
import React, { Fragment, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useMemo } from "react";
import { isEmpty } from "lodash";
import StyleTreeItem from "./StyleTreeItem";
import { styled } from "@mui/system";
import { tokens } from "../../../theme";
import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";

const RoleControl = ({ data = [], setId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  //   [`& .${treeItemClasses.label}`]: {
  //     marginTop: 3,
  //     marginBottom: 3,
  //   },
  //   [`& .${treeItemClasses.selected}`]: {
  //     background: colors.grey[400] + "!important",
  //     borderRadius: "7px",
  //   },
  // }));
  const renderTree = useMemo(() => {
    const renderItem = (data) => {
      return (
        <>
          {data.map((item) => {
            return (
              <TreeItem
                key={item._id}
                nodeId={item._id}
                label={<StyleTreeItem value={item} />}
                onClick={() => {
                  setId(item._id);
                }}
              >
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
