import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useNotify } from "../../../context/NotifyContext";
import client from "../../../sanity/config";
import NovelStep from "../components/NovelStep";

const Create = () => {
  const { notify } = useNotify();
  const [completedStep, setCompletedStep] = useState(false);
  const novelRef = useRef();
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
        const docVocabularies = {
          _id: vocabulary._id,
          _type: "vocabulary",
          vi: vocabulary.vi,
          en: vocabulary.en,
        };

        transaction.createIfNotExists(docVocabularies);
      });

      // CREATE NOVEL
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
      setCompletedStep(true);
      notify.success("Create Novel Success");
    } catch (error) {
      notify.err(`Create Novel Error: ${error}`);
    }
  };

  const handleRestartStep = () => {
    setCompletedStep(false);
    novelRef.current?.refresh();
  };

  return (
    <>
      <NovelStep onSubmit={handleSubmit} ref={novelRef} />
      {completedStep && (
        <Box sx={{ width: "75%", mx: "auto", display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleRestartStep}>
            Create
          </Button>
          <Link to={"/story"} style={{ textDecoration: "none" }}>
            <Button color="info" variant="contained">
              List Novel
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
};

export default Create;
