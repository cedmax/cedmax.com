import React from "react";

export default {
  title: "Social",
  name: "social",
  type: "document",
  preview: {
    select: {
      title: "service",
      imageUrl: "image.asset.url",
      background: "background.rgb",
      shadow: "shadow.rgb",
      negative: "negative"
    },
    prepare({
      imageUrl,
      title,
      shadow: { a: sa, b: sb, g: sg, r: sr },
      background: { a, b, g, r },
      negative
    }) {
      return {
        title,
        media: (
          <span
            style={{
              display: "inline-flex",
              justifyContent: "center",
              background: `rgba(${r}, ${g}, ${b}, ${a})`,
              boxShadow: `3px 3px 0 rgba(${sr}, ${sg}, ${sb}, ${sa})`,
              flex: "0 0 35px",
              height: "35px",
              marginRight: "auto",
              marginBottom: "auto"
            }}
          >
            <img
              style={{
                maxWidth: "75%",
                maxHeight: "75%",
                alignSelf: "center",
                filter: `invert(${negative ? "0%" : "100%"})`
              }}
              src={imageUrl}
              alt="background"
            />
          </span>
        )
      };
    }
  },
  fields: [
    { title: "Service", name: "service", type: "string" },
    { title: "Description", name: "description", type: "string" },
    { title: "Link", name: "link", type: "url" },
    {
      title: "Icon",
      name: "image",
      type: "image"
    },
    {
      title: "Dark Icon",
      name: "negative",
      type: "boolean"
    },
    {
      title: "Background",
      name: "background",
      type: "color"
    },
    {
      title: "Shadow",
      name: "shadow",
      type: "color"
    },
    {
      title: "Hover",
      name: "gif",
      type: "image"
    },
    { title: "Order", name: "order", type: "number" }
  ],
  orderings: [
    {
      title: "Services",
      name: "serviceDesc",
      by: [{ field: "order", direction: "desc" }]
    }
  ]
};
