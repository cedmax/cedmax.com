define(['lib/helpers'], function(helpers) {
  'use strict';

  return function(){
    var imagesToLoad = document.querySelectorAll('[data-lazy]');
    for (var i = 0, l = imagesToLoad.length; i < l; i++) {
      var img = imagesToLoad[i];
      var src = img.getAttribute('data-lazy');
      if(helpers.getVersion()) {
        src = src.replace(/\.jpg$/g, helpers.getVersion() + '.jpg');
      }

      img.src = src;
    }
  };
});
