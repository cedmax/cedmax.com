import React, { useState, useRef, useEffect } from "react";
import Konami from "react-konami";
import { autoScroll, fadeAudio } from "../dom-utilities";

export default () => {
  const [visible, setVisible] = useState(false);
  const refContainer = useRef(null);
  const refAudio = useRef(null);

  if (typeof document !== "undefined") {
    useEffect(() => {
      document.body.style.overflow = visible ? "hidden" : "auto";
    }, [visible]);
  }

  return (
    <footer>
      <Konami
        konami={[67, 69, 68, 77, 65, 88]}
        easterEgg={() => {
          setVisible(true);
          if (typeof document !== "undefined") {
            autoScroll(refContainer.current, () => {
              fadeAudio(refAudio.current, () => {
                setVisible(false);
              });
            });
          }
        }}
      />
      {visible && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio autoPlay ref={refAudio}>
          <source src={require("../media/Rolemusic_Besos_y_Abrazos.mp3")} />
        </audio>
      )}
      <div className={`credits${visible ? " credits--visible" : ""}`}>
        <div ref={refContainer} className="credits-content">
          <div className="credits__title full-screen">
            <div>
              <h1>Credits</h1>
            </div>
          </div>

          <section className="credits__block">
            <h3>Pictures</h3>
            <div>
              George Agnelli <br />
              Federico Ros <br />
              Paris Web conference <br />
              Front Trends conference <br />
              Front the Front meetup <br />
            </div>
          </section>

          <section className="credits__block">
            <h3>Javascript Libraries</h3>
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/namuol/cheet.js"
              >
                CheetJs
              </a>
              <br />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/desandro/close-pixelate"
              >
                Close Pixelate
              </a>
              <br />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/tholman/giflinks"
              >
                GifLinks
              </a>
              <br />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/jrburke/almond"
              >
                AlmondJs
              </a>
              <br />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/hxgf/smoke.js"
              >
                SmokeJs
              </a>
              <br />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/felipenmoura/web-credits"
              >
                WebCredits
              </a>
            </div>
          </section>

          <section className="credits__block">
            <h3>Icons and Images</h3>
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://simpleicons.org/"
              >
                Simple Icons
              </a>
              <br />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://giphy.com"
              >
                Animated Gifs
              </a>
            </div>
          </section>

          <section className="credits__block">
            <h3>Fonts</h3>
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.dafont.com/super-mario-bros-3.font"
              >
                Super Mario Bros 3
              </a>
              <br />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.dafont.com/8-bit-madness.font"
              >
                8 Bit Madness
              </a>
            </div>
          </section>

          <section className="credits__block">
            <h3>Tune</h3>
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://freemusicarchive.org/music/Rolemusic/~/Besos_y_Abrazos"
              >
                Besos y Abrazos
                <br />
                <small>by Rolemusic</small>
              </a>
            </div>
          </section>

          <section className="full-screen">
            <div>
              <img src={require("../media/me.jpg")} alt="me" />
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
};
