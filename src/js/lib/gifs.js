define(['vendor/giflinks.min', 'lib/helpers'], function(GifLinks, helpers) {
  'use strict';

  return function() {
    var isTouch = 'ontouchstart' in document.documentElement;
    if (!isTouch) {
      var elements = document.querySelectorAll('[data-src]');
      for (var i = 0, l = elements.length; i < l; i++) {
        var elm = elements[i];
        var dataSrc = elm.getAttribute('data-src');
        elm.setAttribute(
          'data-src',
          dataSrc.replace(/\.gif$/g, helpers.getVersion() + '.gif')
        );
        elm.addEventListener('mouseover', function() {
          document.body.classList.add('hide-svg');
        });
        elm.addEventListener('mouseout', function() {
          document.body.classList.remove('hide-svg');
        });
      }

      new GifLinks(document.querySelectorAll('[data-src]'), {
        preload: true,
      });
    }
  };
});
