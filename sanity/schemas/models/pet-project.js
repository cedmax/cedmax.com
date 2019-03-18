export default {
  title: "Pet Projects",
  name: "project",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      title: "Thumbnail",
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      title: "Link",
      name: "link",
      type: "url",
    },
    {
      title: "Order",
      name: "order",
      type: "number",
    },
  ],
  orderings: [
    {
      title: "Pet Projects",
      name: "petProjects",
      by: [{ field: "order", direction: "desc" }],
    },
  ],
};
