define([
  'vendor/close-pixelate.min',
  'lib/resize-canvas',
  'lib/render-svg',
  'lib/helpers'
], function(pixelate, resizeAndPositionCanvas, renderSvg, helpers) {
  'use strict';

  return function(img, imgElm) {
    return function() {
      document.body.style.backgroundImage = 'url(img/' + img.name + '.jpg)';
      if (img.position) {
        document.body.classList.add('background--' + img.position);
      }
      var imgClone = imgElm.cloneNode(true);
      var ratio = imgElm.width / imgElm.height;

      var viewPortSize = helpers.getViewPortSize();
      document.querySelector('main').appendChild(imgClone);
      imgClone.closePixelate([{
        resolution: 18,
        width: (viewPortSize.y * ratio) + 'px',
        height: viewPortSize.y + 'px'
      }]);

      resizeAndPositionCanvas = resizeAndPositionCanvas(ratio, img.position);
      resizeAndPositionCanvas();
      window.addEventListener('scroll', helpers.throttle(resizeAndPositionCanvas));
      window.addEventListener('resize', helpers.throttle(resizeAndPositionCanvas));

      renderSvg = renderSvg(imgClone, ratio, img.position);

      //render twice to calculate correctly the dimensions the first time
      renderSvg();
      renderSvg();
      window.addEventListener('resize', helpers.throttle(renderSvg));
    };
  };
});
