import React, { memo } from "react";

export default memo(({ schema }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: schema }}
  />
));
