import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Image from "../../../../components/base/Image";
import TextField from "../../../../components/base/TextField";
import Upload from "../../../../components/base/Upload";

const validationSchema = yup.object().shape({
  title: yup.string().required("required"),
  content: yup.string().required("required"),
  imageUrl: yup.string().nullable(),
  image: yup.string().nullable(),
});

const initialValues = {
  title: "",
  content: "",
  imageUrl: "",
  image: null,
};

const Step1 = ({ data, nextStep }) => {
  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  const handleSubmit = (data) => {
    nextStep(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <TextField control={form.control} name="title" label="Title" />
      <TextField
        control={form.control}
        size="medium"
        name="content"
        label="Content"
        multiline
        minRows={4}
        sx={{ mt: "20px", mb: "20px", display: "flex" }}
      />
      <label htmlFor="image" title="Upload">
        <Image
          control={form.control}
          name="imageUrl"
          label="Image"
          width="300px"
          height="300px"
          alt="img-novel"
          style={{ borderRadius: "8px", cursor: "pointer", objectFit: "cover" }}
          placeholder={
            <img
              alt="placeholder"
              src={require("../../../../untils/img/novel.png")}
              width={60}
              height={40}
              style={{ borderRadius: "6px", cursor: "pointer" }}
            />
          }
        />
      </label>
      <Upload
        id="image"
        control={form.control}
        hidden
        name="upload"
        accept="image/png, image/jpg, image/jpeg"
        onChange={(fileBlob, file) => {
          form.setValue("imageUrl", fileBlob); // sử dụng chỉ để hiển thị
          form.setValue("image", file); // sử dụng để upload lên sanity
        }}
      />

      <Button color="success" variant="contained" fullWidth type="submit" style={{ marginTop: "7px" }}>
        Next step
      </Button>
    </form>
  );
};

export default Step1;
