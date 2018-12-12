define(function() {
  'use strict';

  return function() {
    var tooltips = document.querySelectorAll('.scl');
    var tooltip;
    for (var i = 0; i < tooltips.length; i++) {
      tooltips[i].addEventListener('mousemove', function(e) {
        var ref = document.querySelector('nav').getBoundingClientRect();
        var tmpTooltip = e.target.classList.contains('tooltip')
          ? e.target
          : e.target.querySelector(':scope .tooltip');
        if (tmpTooltip) {
          tooltip = tmpTooltip;
        }
        if (tooltip) {
          tooltip.style.left = e.pageX - ref.left + 'px';
          tooltip.style.top = e.pageY - ref.top - document.scrollTop + 'px';
        }
      });
    }
  };
});
