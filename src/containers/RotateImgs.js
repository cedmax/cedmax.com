import React, { Fragment, memo } from "react";
import Konami from "react-konami";

export default memo(({ total, idx, setIdx }) => (
  <Fragment>
    <Konami
      konami={[39]}
      easterEgg={() => {
        let next = idx + 1;
        next = next < total ? next : 0;
        setIdx(next);
      }}
    />
    <Konami
      konami={[37]}
      easterEgg={() => {
        let prev = idx - 1;
        prev = prev > 0 ? prev : total - 1;
        setIdx(prev);
      }}
    />
  </Fragment>
));
