/* global require */

require( [
	'jquery',
	'lib/close-pixelate.min',
	'lib/smoke.min',
	'lib/cheet.min',
	'lib/webcredits.min',
	'lib/giflinks.min',
	'lib/backstretch.min',
	'lib/atooltip.min',
], function( $, pixelate, smoke, cheet, webCredits ) {
	'use strict';

	var versioning = window.version?'.'+window.version:'';

	var imgArray = [ {
		name: 'me'+versioning,
		align: 'left',
		centeredX: false
	}, {
		name: 'me2'+versioning,
		align: 'right',
		centeredX: false
	}, {
		name: 'me3'+versioning,
		align: 'right',
		centeredX: true
	} ];

	var reqAnimFrame = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		function( callback ){
			setTimeout(callback, 1000 / 60);
		};

	function throttle(callback){
		return function() {
			return reqAnimFrame(callback);
		};
	}

	function resizeAndPositionCanvas(referenceImg){
		var img = $(referenceImg);
		return function(){
			$('main canvas').css({
				'top':  (- ($('main').offset().top - $(document).scrollTop()))+'px',
				'width': $(document).width() + 'px',
				'left': img.position().left + 'px',
				'min-width': img.width()+'px'
			});
		};
	}

	function renderSvg(referenceImg){
		var img = $(referenceImg);
		$('<svg/>').appendTo($('header'))

		return function(){
			var imgWidth = img.width();
			var imgHeight = img.height();
			var svg = $('svg');
			var offset = svg.offset();
			var svgWidth = svg.width();
			var svgHeight = svg.height();

			var ratio = 450/svgWidth;
			var height = 362/ratio;

			var patternWidth = imgWidth*ratio;
			var patternHeight = imgHeight*ratio;
			var patternTop = (- offset.top)*ratio;

			var patternLeft = (parseInt(img.css('left').replace('px', '')) - offset.left)*ratio;

			svg.replaceWith(
				'<svg style="height:'+ height +'" viewBox="0 0 450 362"><pattern id="mypattern" patternUnits="userSpaceOnUse" width="' +
					patternWidth + '" height="' +  patternHeight + '"><svg style="height:'+ height +'"><image width="'+
					patternWidth +'" height="'+ patternHeight + '" xlink:href="' +
					img.attr('src') + '" x="'+ patternLeft +
					'" y="'+ patternTop +'"></image></pattern>'+
					'<path style="fill:url(#mypattern);" fill-rule="evenodd"  d="M68.98 1.246C28.182 9.342 3.97 43.05 3.892 91.706c0 41.417 16.972 72.634 46.635 85.48 11.6 4.982 17.984 6.15 35.112 6.15 14.092 0 15.727-.156 22.734-2.102 13-3.66 24.057-9.576 32.31-17.44l4.048-3.813-8.564-10.898c-4.75-5.995-9.03-11.366-9.576-11.91-.78-.858-2.102-.235-7.32 3.346-9.73 6.695-16.66 9.654-24.99 10.744-22.19 2.802-38.46-9.342-44.377-33.087-4.126-16.192-3.737-40.48.856-56.285 9.344-32.307 39.94-40.793 69.603-19.462 1.557 1.168 1.947.856 8.564-7.162 3.737-4.67 8.41-10.198 10.277-12.456l3.348-4.048-5.683-3.97c-10.356-7.318-20.4-11.522-32.467-13.624-8.175-1.48-28.028-1.402-35.424.078zM170.5 91.862v87.97h114.446v-30.36h-72.405v-44.375h60.727V76.292h-60.727V34.254H246.8c18.84 0 34.255-.234 34.333-.623 0-.31 1.012-6.928 2.18-14.79 1.168-7.863 1.947-14.403 1.713-14.558-.156-.234-26.004-.39-57.457-.39H170.5v87.97zm141.695 0v87.97h26.393c14.48 0 29.974-.39 34.412-.778 34.022-3.426 55.432-18.84 65.242-46.866 8.33-23.977 7.863-63.914-1.168-86.18-6.54-16.27-18.062-27.09-36.436-34.253-15.882-6.15-29.818-7.863-64.464-7.863h-23.98v87.97zm59.325-56.44c7.552 1.556 11.757 3.658 16.66 8.33 7.865 7.395 11.29 17.282 12.77 36.59.856 11.676.077 27.947-1.87 37.133-3.113 14.79-9.264 23.51-20.008 28.493-5.527 2.49-10.977 3.503-19.074 3.503h-6.54V34.255h6.462c3.504 0 8.72.545 11.6 1.168zM9.342 187.384c0 .778-2.102 38.535-4.67 83.92C2.1 316.693 0 355.695 0 357.875V362h34.88l.466-3.348c.234-1.79.623-25.378.934-52.314.39-35.81.234-52.782-.467-62.903-.545-7.63-.856-14.013-.7-14.168.155-.156 4.67 22.03 9.965 49.278 5.216 27.326 9.732 50.37 9.965 51.303.39 1.79.467 1.79 16.194 1.79h15.805l.467-2.18c.232-1.167 4.28-23.82 9.03-50.368 4.75-26.546 8.72-48.656 8.953-49.045.234-.467.234 1.324 0 3.893-1.09 12.533-1.168 57.997-.233 90.85.622 20.007 1.245 36.59 1.557 36.823.233.234 8.408.312 18.218.234l17.828-.233-4.827-85.244c-2.647-46.866-4.827-86.413-4.827-87.815l-.08-2.49H111.8c-19.698 0-21.41.078-21.8 1.324-.156.778-4.282 25.846-9.11 55.74-5.293 32.62-9.03 53.794-9.42 52.938-.31-.78-4.593-25.224-9.576-54.34-4.982-29.115-9.186-53.56-9.42-54.338-.39-1.246-2.102-1.324-21.8-1.324-19.774 0-21.33.078-21.33 1.324zm188.41-.935c0 .31-11.6 38.38-25.77 84.7s-26.238 85.712-26.783 87.502L144.186 362h43.988l.856-4.048c.546-2.258 2.57-10.9 4.517-19.15l3.58-14.948h51.074l4.594 18.84 4.594 18.917h86.963l15.027-33.085 15.026-33.008 4.126 8.874c2.335 4.906 9.264 19.93 15.415 33.243L405.235 362h22.343c12.38 0 22.422-.156 22.422-.39 0-.155-11.367-21.564-25.303-47.487l-25.303-47.177 22.968-39.703c12.612-21.876 22.967-40.015 22.967-40.404 0-.468-8.41-.78-21.645-.78h-21.72l-13.237 27.403c-7.24 15.103-13.468 27.403-13.858 27.325-.39-.077-6.462-12.378-13.47-27.403l-12.845-27.325h-45.077l3.503 6.384c1.947 3.58 12.302 22.187 23.046 41.494 17.673 31.607 19.386 35.11 18.53 36.59-.546.855-11.367 20.94-23.902 44.607-12.612 23.666-23.123 42.74-23.434 42.428-.312-.39-12.3-39.003-26.627-85.868l-26.08-85.246-25.382-.234c-13.934-.078-25.38 0-25.38.233zm34.488 69.675c4.905 20.318 8.798 37.212 8.642 37.523-.545.857-35.97.78-36.436-.078-.622-.934 17.673-75.67 18.296-74.97.312.313 4.516 17.206 9.498 37.525z"/>'
			);
		}
	}


	$(window).on("backstretch.after", function (e, instance, index) {

		var img = instance.$img.clone();
		var ratio = img.width() / img.height();

		img.appendTo('main').get(0).closePixelate( [
			{ resolution: 18, width: $(document).width() + 'px', height: (ratio * img.width()) + 'px' }
		] );

		resizeAndPositionCanvas = resizeAndPositionCanvas(instance.$img.get(0));
		resizeAndPositionCanvas();
		$(window).on('scroll resize', throttle(resizeAndPositionCanvas));

		renderSvg = renderSvg(instance.$img.get(0));

		//render twice to calculate correctly the timensions the first time
		renderSvg();
		renderSvg();
		$(window).on('resize', throttle(renderSvg));
	});

	var img = imgArray[ Math.floor( Math.random() * imgArray.length ) ];
	$.backstretch( 'img/' + img.name + '.jpg', {
		align: img.align,
		centeredX: img.centeredX,
		centeredY: false,
		speed: 300
	} );

	var isTouch = ('ontouchstart' in document.documentElement);
	if (!isTouch){
		$('[data-src]').each(function(i, elm){
			var dataSrc = $(elm).attr('data-src');
			$(elm).attr('data-src', dataSrc.replace(/\.gif$/g, versioning +'.gif'));
		});
		new GifLinks(document.querySelectorAll( '[data-src]' ), { preload: true });
	}

	$( 'nav a:not([class~="google" ])' ).aToolTip( {
		xOffset: 15,
		yOffset: -65
	} );

	$( 'nav a[rel=smoke]' ).click( function(e) {
		smoke.signal( 'see you soon...' );
	} );

	$( smoke.bodyload );

	cheet('c e d m a x', function(){
		$(document.body).css('overflow', 'hidden');
		var audio = document.createElement('audio');
		audio.innerHTML = '<source src="media/Rolemusic_Besos_y_Abrazos.mp3"/>';
		audio.play();

		webCredits.onend= function(){
			$(document.body).css('overflow', 'initial');
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
		webCredits.init($('.credits').html());
	});

	if (navigator.serviceWorker) {
		navigator.serviceWorker.register('/service-worker.js');
	}

} );
