import React, { Fragment, useEffect, useState } from "react";
import { withSiteData } from "react-static";
import Main from "../containers/Main";
import Schema from "../containers/Schema";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import Pixelated from "../containers/Pixelated";
import { isIE } from "../dom-utilities";

const getRandomIndex = list => Math.floor(Math.random() * list.length);
const getIndex = backgrounds => getRandomIndex(backgrounds);

export default withSiteData(
  ({ meta, background: backgrounds, years, social, project }) => {
    const [backgroundIdx] = useState(getIndex(backgrounds));
    const [ratio, setRatio] = useState(null);

    useEffect(() => {
      if (typeof document !== "undefined") {
        const imgElm = new Image();
        imgElm.onload = () => {
          setRatio(imgElm.width / imgElm.height);
        };
        imgElm.src = backgrounds[backgroundIdx].image;
      }
    }, [backgroundIdx]);

    return (
      <Fragment>
        <Schema meta={meta[0]} />
        <Main meta={meta[0]} projects={project} years={years} />
        <Header
          background={backgrounds[backgroundIdx]}
          ratio={ratio}
          socials={social}
        />
        {!isIE && ratio && (
          <Pixelated background={backgrounds[backgroundIdx]} ratio={ratio} />
        )}
        <Footer />
      </Fragment>
    );
  }
);
