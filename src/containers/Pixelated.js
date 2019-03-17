/* eslint-disable no-new */
import React, { useRef, useEffect } from "react";
import {
  getViewPortSize,
  resizeAndPositionCanvas,
  throttle
} from "../dom-utilities";
import ClosePixelate from "../vendor/close-pixelate";

const pixelate = (img, alignment, ratio) => {
  const viewPortSize = getViewPortSize();
  new ClosePixelate(img, [
    {
      resolution: 18,
      width: `${viewPortSize.y * ratio}`,
      height: `${viewPortSize.y}`
    }
  ]);
  const resize = resizeAndPositionCanvas(ratio, alignment);
  resize();
  window.addEventListener("resize", throttle(resize));
};

export default ({ background, ratio }) => {
  const refImage = useRef(null);

  if (typeof document !== "undefined") {
    useEffect(() => {
      const { current: image } = refImage;
      if (image && ratio) {
        const int = setInterval(() => {
          if (!image.width) {
            return;
          }
          clearInterval(int);
          pixelate(image, background.alignment, ratio);
        }, 100);
      }
    }, [refImage, ratio]);
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  return <img ref={refImage} src={background.image} />;
};
