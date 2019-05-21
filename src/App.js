import React, { Suspense } from "react";
import { Root, Routes } from "react-static";

import "./app.css";

const App = () => (
  <Root>
    <Suspense fallback={<div />}>
      <Routes />
    </Suspense>
  </Root>
);

export default App;
