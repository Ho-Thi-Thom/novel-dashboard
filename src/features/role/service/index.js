import { isNil } from "lodash";

export const listToTree = (list) => {
  const map = {},
    roots = [];
  let node, i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i]._id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parent?._id && !isNil(map[node.parent._id])) {
      // if you have dangling branches check that map[node.parent._id] exists
      list[map[node.parent._id]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
};
