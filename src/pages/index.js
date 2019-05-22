import React, { Fragment, useEffect, useState } from "react";
import { withSiteData } from "react-static";
import RotateImgs from "../containers/RotateImgs";
import Main from "../containers/Main";
import Meta from "../containers/Meta";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import Schema from "../containers/Schema";
import PetProjects from "../containers/PetProjects";
import Years from "../containers/Years";
import Pixelated from "../containers/Pixelated";
import { isNode } from "../dom-utilities";

const getIndex = backgrounds => Math.floor(Math.random() * backgrounds.length);

export default withSiteData(
  ({
    meta: [metaContent],
    background: backgrounds,
    years,
    social,
    project: projects,
  }) => {
    const [backgroundIdx, setBackgroundIdx] = useState(getIndex(backgrounds));
    const background = backgrounds[backgroundIdx];
    useEffect(() => {
      if (!isNode) {
        document.body.style.backgroundImage = `url(${background.image})`;
        document.body.className = "background";
        if (background.alignment) {
          document.body.classList.add(`background--${background.alignment}`);
        }
      }
    }, [backgroundIdx]);

    return (
      <Fragment>
        <Schema schema={metaContent.schema_org} />
        <Meta meta={metaContent} />
        <main>
          <Main meta={metaContent} years={years} />
          <PetProjects projects={projects} />
          <Years years={years} />
          <Pixelated background={background} />
        </main>
        <Header background={background} socials={social} />
        <Footer />
        <RotateImgs
          total={backgrounds.length}
          idx={backgroundIdx}
          setIdx={setBackgroundIdx}
        />
      </Fragment>
    );
  }
);
