import ClosePixelate from "./vendor/close-pixelate";
import memoize from "memoize-one";

const isNode = typeof document !== "undefined";
const getViewPort = () => (isNode ? {} : require("viewport-js"));
const getScroll = getViewPort().calculateScroll;
const getViewPortSize = getViewPort().calculateDimensions;
const multiplyBy = num => otherNum => num * otherNum;

export const calculateSvgDimensions = SVG_SIZE_W => ({
  svg,
  background: { ratio, alignment },
}) => {
  if (!svg) return {};

  const scroll = getScroll();
  const rect = svg.getBoundingClientRect();
  const offset = {
    top: rect.top + scroll.scrollY,
    left: rect.left + scroll.scrollX,
  };

  const svgWidth = rect.width;
  const svgResizeRatio = SVG_SIZE_W / (svgWidth || 1);

  let imgHeight;
  let imgWidth;
  const viewPortSize = getViewPortSize();
  const viewPortSizeRatio = viewPortSize.width / viewPortSize.height;

  if (viewPortSizeRatio > ratio) {
    imgWidth = viewPortSize.width;
    imgHeight = imgWidth / ratio;
  } else {
    imgHeight = viewPortSize.height;
    imgWidth = imgHeight * ratio;
  }

  const multiplyByRatio = multiplyBy(svgResizeRatio);
  const patternWidth = multiplyByRatio(imgWidth);
  const patternHeight = multiplyByRatio(imgHeight);
  const patternTop = multiplyByRatio(-offset.top);

  let patternLeft;

  switch (alignment) {
    case "left":
      patternLeft = multiplyByRatio(-offset.left);
      break;
    case "right":
      patternLeft = multiplyByRatio(
        viewPortSize.width - imgWidth - offset.left
      );
      break;
    default:
      patternLeft = multiplyByRatio(-(imgWidth / 2 - svgWidth / 2));
      break;
  }

  return {
    patternHeight,
    patternWidth,
    patternTop,
    patternLeft,
  };
};

const timeout = e => window.setTimeout(e, 1e3 / 60);
const reqAnimFrame = () =>
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  timeout;

export const autoScroll = (node, callback) => {
  const currentTopPosition = 0;
  const maxNeg =
    document.documentElement.clientHeight -
    document.querySelector(".credits-content").scrollHeight;

  const doThat = currentTopPosition => () => {
    currentTopPosition -= 1;
    node.style.top = `${currentTopPosition}px`;

    if (currentTopPosition > maxNeg) {
      reqAnimFrame()(doThat(currentTopPosition));
    } else {
      setTimeout(callback, 1500);
    }
  };

  reqAnimFrame()(doThat(currentTopPosition));
};

export const fadeAudio = (refAudio, callback) => {
  const fadeout = setInterval(() => {
    let vol = refAudio.volume;
    vol -= 0.05;
    if (vol > 0) {
      refAudio.volume = vol;
    } else {
      refAudio.pause();
      clearInterval(fadeout);
      callback();
    }
  }, 100);
};

const detectIe = () => {
  if (isNode) return false;
  const ua = window.navigator.userAgent;

  const msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }

  const trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11 => return version number
    const rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }

  const edge = ua.indexOf("Edge/");
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
  }

  // other browser
  return false;
};

export const isIE = !!detectIe();

const resizeAndPositionCanvas = (ratio, alignment) => () => {
  const canvas = document.querySelector("canvas");
  canvas.style.top = `${-document.querySelector("main").getBoundingClientRect()
    .top}px`;
  canvas.style.minWidth = `${getViewPortSize().height * ratio}px`;
};

export const throttle = callback => () => reqAnimFrame()(callback);

let instance;
let throttledResize;
export const pixelate = (img, alignment, ratio) => {
  const viewPortSize = getViewPortSize();
  const config = [
    {
      resolution: 18,
      width: `${viewPortSize.height * ratio}`,
      height: `${viewPortSize.height}`,
    },
  ];

  if (instance) {
    instance.img = img;
    instance.render(config);
    window.removeEventListener("resize", throttledResize);
    window.removeEventListener("resize", throttledResize);
  } else {
    instance = new ClosePixelate(img, config);
  }

  const resize = resizeAndPositionCanvas(ratio, alignment);
  throttledResize = throttle(resize);

  window.addEventListener("resize", throttledResize);
  window.addEventListener("scroll", throttledResize);

  resize();
};
