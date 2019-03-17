/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useEffect } from "react";
import Svg from "./Svg";
import FullScreenGif from "../containers/FullScreenGif";
import { isIE } from "../dom-utilities";

export default ({ socials, ratio, background }) => {
  const [gif, setGif] = useState(null);

  useEffect(() => {
    document.querySelector("header svg").style.visibility = gif
      ? "hidden"
      : "visible";
  }, [gif]);

  return (
    <header>
      <nav>
        <ul>
          {socials.map(
            ({
              background: {
                rgb: { r, g, b, a }
              },
              shadow: {
                rgb: { r: sr, g: sg, b: sb, a: sa }
              },
              negative,
              gif,
              image,
              description,
              service,
              link
            }) => (
              <li key={service}>
                <a
                  target="_blank"
                  onMouseOver={() => setGif(gif)}
                  onMouseOut={() => setGif()}
                  className="scl"
                  style={{
                    background: `rgba(${r}, ${g}, ${b}, ${a})`,
                    boxShadow: `3px 3px 0 rgba(${sr}, ${sg}, ${sb}, ${sa})`
                  }}
                  href={link}
                  rel="noreferrer noopener"
                >
                  <img
                    style={{
                      filter: `invert(${negative ? "0%" : "100%"})`
                    }}
                    src={image}
                    alt={service}
                  />
                  <span className="tooltip">{description}</span>
                </a>
              </li>
            )
          )}
        </ul>
      </nav>
      {!isIE && <Svg background={background} ratio={ratio} />}
      <FullScreenGif gif={gif} />
    </header>
  );
};
