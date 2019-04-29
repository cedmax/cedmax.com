import React, { memo } from "react";
import PetProjects from "./PetProjects";
import Years from "./Years";
import Pixelated from "../containers/Pixelated";
import { isIE } from "../dom-utilities";

export default memo(({ meta, projects, years, background, ratio }) => (
  <main>
    <h1>{meta.name}</h1>
    <h3>
      <em>
        {meta.title}
        <br />
        <small>{meta.subtitle}</small>
      </em>
    </h3>
    <p className="bio">{meta.description}</p>

    <PetProjects projects={projects} />
    <Years years={years} />
    {!isIE && ratio && <Pixelated background={background} ratio={ratio} />}
  </main>
));
