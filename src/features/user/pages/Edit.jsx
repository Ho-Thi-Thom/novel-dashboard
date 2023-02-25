import { yupResolver } from "@hookform/resolvers/yup";
import { CloseFullscreen } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import SelectBox from "../../../components/base/SelectBox";
import Switch from "../../../components/base/Switch";
import TField from "../../../components/base/TextField";
import Header from "../../../components/Header";
import { useNotify } from "../../../context/NotifyContext";
import client from "../../../sanity/config";
import { GET_ALL_ROLE } from "../../../sanity/users";
import { GET_USER_BY_ID } from "../../../sanity/users";
import useQuery from "../../../hook/useQuery";
import { service } from "../services/edit";

const validationSchema = yup.object().shape({
  username: yup.string().required("required"),
  role: yup.string().required("required"),
});

const initialValues = {
  active: false,
  role: "",
  username: "",
};

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = useRef([]);
  const { notify } = useNotify();

  const { data: roles } = useQuery(GET_ALL_ROLE);

  const form = useForm({
    mode: "onBlur",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    client
      .fetch(GET_USER_BY_ID, { Id: id })
      .then((result) => {
        data.current = result;
        handleReset();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleSubmit = async (info) => {
    const doc = service.createDoc(data.current, info);
    const hasDoc = Object.keys(doc).length > 0;
    if (!hasDoc) {
      notify.info("No change");
      return;
    }

    try {
      await service.update(data.current._id, doc);
      notify.success("Update user success");
      navigate("/user");
    } catch (error) {
      notify.err(error.message);
    }
  };

  const handleReset = () => {
    if (data.current) {
      const info = {
        active: data.current.active,
        username: data.current.username,
        role: data.current.role?._id,
      };
      form.reset(info);
    }
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TField control={form.control} label="Username" name="username" />

            <SelectBox control={form.control} label="Role" name="role" options={roles} />

            <Switch control={form.control} label="Active" name="active" />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button variant="contained" type="button" color="info" onClick={handleReset}>
                Reset
              </Button>
              <Button variant="contained" type="submit" color="secondary">
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Edit;
