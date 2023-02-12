import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

const client = SanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2021-10-21",
  token: process.env.REACT_APP_SANITY_TOKEN,
  useCdn: true,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;

export const createNovel = (doc) => {
  return client.create(doc);
};
