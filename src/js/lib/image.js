define([
  'vendor/close-pixelate.min',
  'lib/resize-canvas',
  'lib/render-svg',
  'lib/helpers',
], function(pixelate, resizeAndPositionCanvas, renderSvg, helpers) {
  'use strict';

  return function(img, imgElm) {
    return function() {
      document.body.style.backgroundImage = 'url(img/' + img.name + '.jpg)';
      document.body.classList.add('background');
      if (img.position) {
        document.body.classList.add('background--' + img.position);
      }

      if (!helpers.isIe()) {
        var imgClone = imgElm.cloneNode(true);
        var int = setInterval(function() {
          if (!imgClone.width) {
            return;
          } else {
            clearInterval(int);
          }
          var ratio = imgElm.width / imgElm.height;

          var viewPortSize = helpers.getViewPortSize();
          document.querySelector('main').appendChild(imgClone);

          imgClone.closePixelate([
            {
              resolution: 18,
              width: viewPortSize.y * ratio + 'px',
              height: viewPortSize.y + 'px',
            },
          ]);

          resizeAndPositionCanvas = resizeAndPositionCanvas(
            ratio,
            img.position
          );
          resizeAndPositionCanvas();
          window.addEventListener(
            'scroll',
            helpers.throttle(resizeAndPositionCanvas)
          );
          window.addEventListener(
            'resize',
            helpers.throttle(resizeAndPositionCanvas)
          );

          renderSvg = renderSvg(imgClone, ratio, img.position);

          //render twice to calculate correctly the dimensions the first time
          renderSvg();
          renderSvg();
          window.addEventListener('resize', helpers.throttle(renderSvg));
        }, 50);
      }
    };
  };
});
