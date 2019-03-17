import React from "react";

export default ({ schema_org }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: schema_org }}
  />
);
