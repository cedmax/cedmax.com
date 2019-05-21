import React, { Fragment, memo } from "react";

export default memo(({ meta }) => (
  <Fragment>
    <h1>{meta.name}</h1>
    <h2>
      <em>
        {meta.title}
        <br />
        <small>{meta.subtitle}</small>
      </em>
    </h2>
    <p className="bio">{meta.description}</p>
  </Fragment>
));
