export const getScroll = () => {
  const left =
    window.pageXOffset !== undefined
      ? window.pageXOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollLeft;
  const top =
    window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;

  return { left, top };
};

export const getViewPortSize = () => {
  let myWidth = 0;
  let myHeight = 0;
  if (typeof window.innerWidth === "number") {
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if (
    document.documentElement &&
    (document.documentElement.clientWidth ||
      document.documentElement.clientHeight)
  ) {
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if (
    document.body &&
    (document.body.clientWidth || document.body.clientHeight)
  ) {
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  return {
    x: myWidth,
    y: myHeight
  };
};

export const calculateSvgDimensions = SVG_SIZE_W => ({
  svg,
  props,
  viewPortSize,
  scroll
}) => {
  if (!svg) return {};

  const rect = svg.getBoundingClientRect();

  const offset = {
    top: rect.top + scroll.top,
    left: rect.left + scroll.left
  };

  const svgWidth = rect.width;
  const svgResizeRatio = SVG_SIZE_W / (svgWidth || 1);

  let imgHeight;
  let imgWidth;
  const viewPortSizeRatio = viewPortSize.x / viewPortSize.y;
  if (viewPortSizeRatio > props.ratio) {
    imgWidth = viewPortSize.x;
    imgHeight = imgWidth / props.ratio;
  } else {
    imgHeight = viewPortSize.y;
    imgWidth = imgHeight * props.ratio;
  }

  const patternWidth = imgWidth * svgResizeRatio;
  const patternHeight = imgHeight * svgResizeRatio;
  const patternTop = -offset.top * svgResizeRatio;

  let patternLeft;

  switch (props.background.alignment) {
    case "left":
      patternLeft = -offset.left * svgResizeRatio;
      break;
    case "right":
      patternLeft = (viewPortSize.x - imgWidth - offset.left) * svgResizeRatio;
      break;
    default:
      patternLeft = -(imgWidth / 2 - svgWidth / 2) * svgResizeRatio;
      break;
  }

  return {
    patternHeight,
    patternWidth,
    patternTop,
    patternLeft
  };
};

const timeout = e => window.setTimeout(e, 1e3 / 60);
const isNode = typeof document === "undefined";
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

export const resizeAndPositionCanvas = (ratio, alignment) => () => {
  const basicStyle = {
    // top: `${-document.querySelector("main").getBoundingClientRect().top}px`,
    "min-width": `${getViewPortSize().y * ratio}px`
  };

  if (!alignment) {
    basicStyle.transform = "translateX(-50%)";
    basicStyle.left = "50%";
  } else if (alignment === "right") {
    basicStyle.right = "0";
  }

  Object.keys(basicStyle).forEach(prop => {
    document.querySelector("canvas").style[prop] = basicStyle[prop];
  });
};

export const throttle = callback => () => reqAnimFrame()(callback);
