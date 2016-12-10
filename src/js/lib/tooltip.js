define(function(){
  'use strict';

  return function(){
    var ref = document.querySelector('nav').getBoundingClientRect();
    var tooltips = document.querySelectorAll('.scl');
    for(var i = 0; i < tooltips.length; i++) {
      tooltips[i].addEventListener('mousemove', function(e) {
        var tooltip = e.target.classList.contains('tooltip') ?
            e.target :
            e.target.querySelector(':scope .tooltip');
        tooltip.style.left = e.pageX - ref.left + 10 + 'px';
        tooltip.style.top = e.pageY - ref.top + 'px';
      });
    }
  };
});
