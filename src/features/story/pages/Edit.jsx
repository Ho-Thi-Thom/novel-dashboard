import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import client from "../../../sanity/config";
import { GET_DETAIL_NOVEL } from "../../../sanity/novels";
import NovelStep from "../components/NovelStep";

const Edit = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery("novel", () => client.fetch(GET_DETAIL_NOVEL, { IdNovel: id }));

  if (isLoading) return <div>Loading data...</div>;

  return <NovelStep data={data} />;
};

export default Edit;
