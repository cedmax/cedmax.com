define([
  'lib/helpers'
], function(helpers) {
  'use strict';

  return function(ratio, position) {
    return function() {
      var basicStyle = {
        'top': (-document.querySelector('main').getBoundingClientRect().top) + 'px',
        'min-width': helpers.getViewPortSize().y * ratio + 'px'
      };

      if (!position) {
        basicStyle.transform = 'translateX(-50%)';
        basicStyle.left = '50%';
      } else if (position === 'right') {
        basicStyle.right = '0';
      }

      helpers.extend(document.querySelector('main canvas').style, basicStyle);
    };
  };
});
