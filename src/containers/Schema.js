import React from "react";

export default ({ schema }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: schema }}
  />
);
