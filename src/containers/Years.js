import React, { Fragment } from "react";

export default ({ years }) => (
  <Fragment>
    <h2>Storyline</h2>
    <ol className="flipper">
      {years.map(({ year, events, image }) => (
        <li key={year} className="year flip-container">
          <a className="front">
            <span className="when">{year}</span>
          </a>
          <ul className="what back">
            {!!events && events.map(event => <li key={event}>{event}</li>)}
            {!events && (
              <li>
                <img src={image} />
              </li>
            )}
          </ul>
        </li>
      ))}

      <li className="year year--filler" />
      <li className="year year--filler" />
      <li className="year year--filler" />
      <li className="year year--filler" />
      <li className="year year--filler" />
      <li className="year year--filler" />
      <li className="year year--filler" />
      <li className="year year--filler" />
    </ol>
  </Fragment>
);
