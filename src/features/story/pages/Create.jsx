import React from "react";
import client from "../../../sanity/config";
import NovelStep from "../components/NovelStep";

const Create = () => {
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

      alert("success");
    } catch (error) {
      alert("error");
    }
  };
  return <NovelStep onSubmit={handleSubmit} />;
};

export default Create;
