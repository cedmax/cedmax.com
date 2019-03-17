import React, { Fragment, useEffect, useState } from "react";
import { withSiteData } from "react-static";
import Main from "../containers/Main";
import Meta from "../containers/Meta";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import Schema from "../containers/Schema";

const getIndex = backgrounds => Math.floor(Math.random() * backgrounds.length);

export default withSiteData(
  ({ meta, background: backgrounds, years, social, project }) => {
    const [backgroundIdx] = useState(getIndex(backgrounds));
    const [ratio, setRatio] = useState(null);
    const [metaContent] = useState(meta[0]);

    useEffect(() => {
      if (typeof document !== "undefined") {
        const background = backgrounds[backgroundIdx];

        document.body.style.backgroundImage = `url(${background.image})`;
        document.body.classList.add("background");
        if (background.alignment) {
          document.body.classList.add(`background--${background.alignment}`);
        }

        const imgElm = new Image();
        imgElm.onload = () => {
          setRatio(imgElm.width / imgElm.height);
        };
        imgElm.src = backgrounds[backgroundIdx].image;
      }
    }, [backgroundIdx]);

    return (
      <Fragment>
        <Schema schema={metaContent.schema_org} />
        <Meta meta={metaContent} />
        <Main
          meta={metaContent}
          background={backgrounds[backgroundIdx]}
          ratio={ratio}
          projects={project}
          years={years}
        />
        <Header
          background={backgrounds[backgroundIdx]}
          ratio={ratio}
          socials={social}
        />

        <Footer />
      </Fragment>
    );
  }
);
