/* global require */
require([
  'lib/image',
  'lib/tooltip',
  'lib/gifs',
  'lib/say-bye',
  'lib/cheet',
  'lib/helpers'
], function(imageOnLoad, enableTooltip, enableGifs, enableGreets, enableCheetCode, helpers) {
  'use strict';

  var versioning = helpers.getVersion();

  var imgArray = [{
    name: 'me' + versioning,
    position: 'left'
  }, {
    name: 'me2' + versioning,
    position: 'right'
  },{
    name: 'me5' + versioning
  }, {
    name: 'me3' + versioning
  }, {
    name: 'me6' + versioning,
    position: 'left'
  }, {
    name: 'me7' + versioning
  }];

  var img = imgArray[Math.floor(Math.random() * imgArray.length)];
  var imgElm = new Image();
  imgElm.onload = imageOnLoad(img, imgElm);
  imgElm.src = 'img/' + img.name + '.jpg';

  enableGifs();
  enableTooltip();
  enableGreets();
  enableCheetCode();

  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker'+versioning+'.js');
  }
});
