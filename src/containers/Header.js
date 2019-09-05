/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, memo, useRef } from "react";
import Svg from "./Svg";
import FullScreenGif from "../containers/FullScreenGif";
import { isIE } from "../dom-utilities";

export default memo(({ socials, background }) => {
  const [gif, setGif] = useState(null);
  const headerRef = useRef();
  return (
    <header ref={headerRef}>
      <nav>
        <ul>
          {socials.map(
            ({
              background: {
                rgb: { r, g, b, a },
              },
              shadow: {
                rgb: { r: sr, g: sg, b: sb, a: sa },
              },
              negative,
              gif,
              image,
              description,
              service,
              link,
            }) => (
              <li key={service}>
                <a
                  target="_blank"
                  onMouseOver={() => setGif(gif)}
                  onMouseOut={() => setGif()}
                  className="scl"
                  style={{
                    background: `rgba(${r}, ${g}, ${b}, ${a})`,
                    boxShadow: `3px 3px 0 rgba(${sr}, ${sg}, ${sb}, ${sa})`,
                  }}
                  href={link}
                  rel="noreferrer noopener"
                >
                  <img
                    style={{
                      filter: `invert(${negative ? "0%" : "100%"})`,
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
      <Svg headerRef={headerRef} hide={!!gif} background={background} />
      <FullScreenGif gif={gif} />
    </header>
  );
});
