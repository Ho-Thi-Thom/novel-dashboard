import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import SelectBox from "../../../components/base/SelectBox";
import Switch from "../../../components/base/Switch";
import TField from "../../../components/base/TextField";
import Header from "../../../components/Header";
import { GET_ALL_ROLE } from "../../../sanity/users";
import useQuery from "../hook/useQuery";

const validationSchema = yup.object().shape({
  username: yup.string().required("required"),
  // role: yup.string().notOneOf([""], "You must select an option!"),
});

const initialValues = {
  active: false,
  role: "",
  username: "",
};

const Edit = () => {
  const location = useLocation();
  const { current: data } = useRef(location.state.data);

  const { data: roles } = useQuery(GET_ALL_ROLE);

  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (data) {
      const info = {
        active: data.active,
        username: data.username,
        role: data.role._id,
      };
      form.reset(info);
    }
  }, [data]);

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box m="20px 5px 20px 20px">
      <Header title="Edit User" subtitle="Change user information " />
      <Box
        sx={{
          width: "75%",
          mx: "auto",
          display: "flex",
          justifyContent: "center",
          gap: 2,
          padding: 2,
        }}
      >
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TField control={form.control} label="Username" name="username" />

            <SelectBox control={form.control} label="Role" name="role" options={roles} />

            <Switch control={form.control} label="Active" name="active" />
            <Button
              variant="contained"
              type="submit"
              style={{ marginTop: "7px", display: "flex", color: "black" }}
              color={"info"}
            >
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Edit;
