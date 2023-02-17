import { Box, Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { queryClient } from "../../../App";
import Notification from "../../../components/Notification";
import client from "../../../sanity/config";
import NovelStep from "../components/NovelStep";

const Create = () => {
  const [notification, setNotification] = useState({
    state: false,
    infor: {
      type: "",
      message: "",
    },
  });
  const handleSubmit = async (data) => {
    try {
      const temp = [];
      data?.vocabularies?.forEach((item) => {
        temp.push({ _id: item._id, en: item.en, vi: item.vi });
      });

      // UPLOAD IMAGE
      let image = null;
      if (data.image) {
        image = await client.assets.upload("image", data.image);
      }
      const transaction = client.transaction();

      // CREATE VOCABULARIES
      temp.forEach((vocabulary) => {
        const docVoca = {
          _id: vocabulary._id,
          _type: "vocabulary",
          vi: vocabulary.vi,
          en: vocabulary.en,
        };

        transaction.createIfNotExists(docVoca);
      });

      // CREATE NOVVEL
      const doc = {
        _type: "story",
        content: data.content,
        title: data.title,
        vocabularies: temp.map((data) => ({
          _type: "reference",
          _ref: data._id,
        })),
      };
      if (image) {
        doc.image = {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: image._id,
          },
        };
      }
      transaction.create(doc);

      await transaction.commit({
        autoGenerateArrayKeys: true,
      });
      setNotification({
        state: "true",
        infor: {
          type: "success",
          message: "Create Novel Success",
        },
      });
    } catch (error) {
      setNotification({
        state: "true",
        infor: {
          type: "error",
          message: `Create Novel Error: ${error}`,
        },
      });
    }
  };

  return (
    <>
      <NovelStep onSubmit={handleSubmit} />

      {notification.state ? (
        <>
          <Notification notify={{ isOpen: true, message: notification.infor.message, type: notification.infor.type }} />
          <Box sx={{ width: "75%", mx: "auto", display: "flex", justifyContent: "center", gap: 2 }}>
            <Link style={{ textDecoration: "none" }}>
              <Button variant="contained" color="secondary" onClick={() => window.location.reload(true)}>
                Create
              </Button>
            </Link>
            <Link to={"/story"} style={{ textDecoration: "none" }}>
              <Button color="info" variant="contained">
                List Novel
              </Button>
            </Link>
          </Box>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Create;
