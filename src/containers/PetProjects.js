import React, { Fragment } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default ({ projects }) => (
  <Fragment>
    <h2>Pet Projects</h2>
    <ol className="flipper">
      {projects.map(project => (
        <li key={project.name} className="pproject flip-container">
          <span
            className="front"
            style={{
              backgroundImage: `url('${project.thumbnail}')`
            }}
          >
            <LazyLoadImage
              alt={`${project.name} screenshot`}
              src={`${project.image}?h=200`}
            />
          </span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={project.link}
            className="what back"
          >
            {project.name}
          </a>
        </li>
      ))}
      <li className="pproject pproject--filler" />
      <li className="pproject pproject--filler" />
      <li className="pproject pproject--filler" />
      <li className="pproject pproject--filler" />
      <li className="pproject pproject--filler" />
      <li className="pproject pproject--filler" />
    </ol>
  </Fragment>
);
