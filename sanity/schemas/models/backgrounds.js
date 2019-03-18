import React from "react";

export default {
  title: "Backgrounds",
  name: "background",
  type: "document",
  options: {
    hotspot: true,
  },
  preview: {
    select: {
      title: "alignment",
      imageUrl: "image.asset.url",
    },
    prepare({ imageUrl }) {
      return {
        title: "",
        media: <img src={imageUrl} alt="background" />,
      };
    },
  },
  fields: [
    {
      title: "Background",
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      title: "Alignment",
      name: "alignment",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
      },
    },
  ],
};
