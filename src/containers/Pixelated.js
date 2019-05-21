/* eslint-disable no-new */
import React, { useRef, useEffect, memo } from "react";
import { pixelate } from "../dom-utilities";
import { isIE } from "../dom-utilities";

export default memo(({ background: { ratio, alignment, image } }) => {
  if (isIE || !ratio) return null;

  const refImage = useRef(null);

  if (typeof document !== "undefined") {
    useEffect(() => {
      const { current: image } = refImage;
      const int = setInterval(() => {
        if (image.width) {
          clearInterval(int);
          pixelate(image, alignment, ratio);
        }
      }, 100);
    }, [image]);
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  return <img ref={refImage} src={image} />;
});
