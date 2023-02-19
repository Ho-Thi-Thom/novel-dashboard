import client from "../../../sanity/config";

export const dataGridServices = {
  getColumn: ({ handleEdit, roles }) => {
    return [
      {
        field: "username",
        headerName: "Username",
        width: 150,
      },
      {
        field: "role",
        headerName: "Role",
        width: 200,
      },
      {
        field: "",
        headerName: "Action",
        width: 200,
      },
    ];
  },
};

export const services = {};
