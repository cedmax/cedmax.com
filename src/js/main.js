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
		return function(){
			var img = $(referenceImg);
			$('main canvas').css({
				'top':  (- ($('main').offset().top - $(document).scrollTop()))+'px',
				'width': $(document).width() + 'px',
				'left': img.position().left + 'px',
				'min-width': img.width()+'px'
			});
		};
	}

	$(window).on("backstretch.after", function (e, instance, index) {

		var img = instance.$img.clone();
		var ratio = img.width() / img.height();

		img.appendTo('main').get(0).closePixelate( [
	        { resolution: 18, width: $(document).width() + 'px', height: (ratio * img.width()) + 'px' }
	    ] );
		var func = resizeAndPositionCanvas(instance.$img.get(0));
		func();

		$(window).on('scroll resize', throttle(func));
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
