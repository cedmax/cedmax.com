define([
  'vendor/cheet.min',
  'vendor/webcredits.min'
], function(cheet, webCredits) {
  'use strict';

  return function(){
    var audio = document.createElement('audio');

    cheet('c e d m a x', function() {
      webCredits.onstart = function(){
        document.body.style.overflow = 'hidden';
        audio.innerHTML = '<source src="media/Rolemusic_Besos_y_Abrazos.mp3"/>';
        audio.play();
      };

      webCredits.onend = function() {
        document.body.style.overflow = 'initial';
        var fadeout = setInterval(function() {
          var vol = audio.volume;
          vol -= 0.05;
          if (vol > 0) {
            audio.volume = vol;
          } else {
            audio.pause();
            clearInterval(fadeout);
          }
        }, 100);
      };

      webCredits.init(document.querySelector('.credits').innerHTML);
    });
  };
});
