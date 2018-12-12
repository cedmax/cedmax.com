define(['vendor/smoke.min', 'lib/helpers'], function(smoke, helpers) {
  'use strict';

  return function() {
    document.body.addEventListener('click', function(event) {
      if (
        event.target.getAttribute('rel') === 'smoke' ||
        event.target.parentNode.getAttribute('rel') === 'smoke'
      ) {
        smoke.signal('see you soon...');
        document
          .querySelector('#innerced image')
          .setAttribute(
            'y',
            document.querySelector('#innerced image').getAttribute('y') - 150
          );
      }
    });
    helpers.ready(smoke.bodyload);
  };
});
