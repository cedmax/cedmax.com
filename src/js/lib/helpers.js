define(function(){
  'use strict';

  var reqAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function(callback) {
      setTimeout(callback, 1000 / 60);
    };

  var extend = function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

  return {
    ready: function(fn){
      if (document.readyState != 'loading') {
        fn();
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    },

    extend: Object.assign || extend,

    getViewPortSize: function () {
      var myWidth = 0,
        myHeight = 0;
      if (typeof(window.innerWidth) == 'number') {
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
      } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
      } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
      }
      return {
        x: myWidth,
        y: myHeight
      };
    },

    throttle: function(callback) {
      return function() {
        return reqAnimFrame(callback);
      };
    },

    getVersion: function(){
      return window.version ? '.' + window.version : '';
    }
  };
});
