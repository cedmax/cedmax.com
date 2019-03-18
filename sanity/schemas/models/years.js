export default {
  title: "Years",
  name: "years",
  type: "document",
  preview: {
    select: {
      title: "year",
    },
  },
  orderings: [
    {
      title: "Years",
      name: "yearsdesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  fields: [
    {
      title: "Year",
      name: "year",
      type: "number",
    },
    {
      title: "Events",
      name: "events",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      title: "Filler",
      name: "image",
      type: "image",
    },
  ],
};
