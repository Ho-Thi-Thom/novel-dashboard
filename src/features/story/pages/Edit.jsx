import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useQuery from "../../../hook/useQuery";
import client from "../../../sanity/config";
import { GET_DETAIL_NOVEL } from "../../../sanity/novels";
import NovelStep from "../components/NovelStep";
import { isEqual } from "lodash";
import { useNotify } from "../../../context/NotifyContext";

const Edit = () => {
  const { notify } = useNotify();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_DETAIL_NOVEL, { IdNovel: id });
  const handleSubmit = async (_data) => {
    try {
      // alert("success");
      console.log(_data);

      const formatVocabulary = (data) => {
        return data.map((data) => ({ _type: "reference", _ref: data._id }));
      };

      const _dataVocabularies = formatVocabulary(_data.vocabularies);
      const dataVocabularies = formatVocabulary(data.vocabularies);

      const doc = {
        content: _data.content,
        title: _data.title,
        vocabularies: _dataVocabularies,
      };

      let image = null;
      if (_data.image) {
        image = await client.assets.upload("image", _data.image);
      }

      // VALIDATE
      if (image) {
        doc.image = {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: image._id,
          },
        };
      }

      ["content", "title"].forEach((item) => {
        if (isEqual(_data[item], data[item])) {
          delete doc[item];
        }
      });

      if (isEqual(dataVocabularies, _dataVocabularies)) {
        delete doc.vocabularies;
      }

      if (isEqual(doc, {})) {
        notify.warn("No change");
        navigate("/story");
        return;
      }

      const transaction = client.transaction();
      transaction.patch(client.patch(id).set(doc));

      // Verify VOCABULARY

      if (_data.change) {
        _data.change.creates.forEach((item) => {
          const doc = {
            _type: "vocabulary",
            _id: item._id,
            vi: item.vi,
            en: item.en,
          };
          transaction.createIfNotExists(doc);
        });

        _data.change.updates.forEach((item) => {
          const doc = {
            vi: item.vi,
            en: item.en,
          };
          transaction.patch(client.patch(item._id).set(doc));
        });

        _data.change.deletes.forEach((item) => {
          transaction.delete(item._id);
        });
      }

      await transaction.commit();
      notify.success("Update success !");
      navigate("/story");
    } catch (error) {
      notify.err(error.message);
    }
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

  return <NovelStep data={data} onSubmit={handleSubmit} />;
};

export default Edit;
