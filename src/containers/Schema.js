import React from "react";

export default ({ meta }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: meta.schema_org }}
  />
);
