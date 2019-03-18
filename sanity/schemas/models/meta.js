export default {
  name: "meta",
  title: "Meta",
  type: "document",
  liveEdit: false,
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "meta_title",
      title: "Meta Title",
      type: "string",
    },
    {
      name: "meta_decription",
      title: "Meta Decription",
      type: "string",
    },
    { name: "schema_org", title: "Schema.org json", type: "text" },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "image",
      title: "Social image",
      type: "image",
    },
  ],
};
