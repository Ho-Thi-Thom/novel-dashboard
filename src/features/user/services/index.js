import client from "../../../sanity/config";

export const dataGridServices = {
  getColumn: ({ handleEdit, roles }) => {
    // client.fetch()
    return [
      {
        field: "username",
        headerName: "Username",
        width: 150,
        editable: true,
      },
      {
        field: "role",
        headerName: "Role",
        width: 200,
        editable: true,
        type: "singleSelect",
        valueOptions: roles,
      },
    ];
  },
};

export const services = {};
