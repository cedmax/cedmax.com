import React from "react";

export default ({ gif }) =>
  !!gif && (
    <div
      className="gif"
      style={{
        backgroundImage: `url(${gif})`
      }}
    />
  );
