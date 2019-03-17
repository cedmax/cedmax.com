import React from "react";
import PetProjects from "./PetProjects";
import Years from "./Years";

export default ({ meta, projects, years }) => (
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
  </main>
);
