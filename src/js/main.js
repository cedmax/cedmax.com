/* global require */

require( [
	'lib/close-pixelate.min',
	'lib/smoke.min',
	'lib/cheet.min',
	'lib/webcredits.min',
	'lib/giflinks.min'
], function(pixelate, smoke, cheet, webCredits ) {
	'use strict';

	function ready(fn) {
		if (document.readyState != 'loading'){
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}

	var versioning = window.version?'.'+window.version:'';

	var imgArray = [ {
		name: 'me'+versioning,
		centeredX: false
	}, {
		name: 'me2'+versioning,
		centeredX: false
	}, {
		name: 'me5'+versioning,
		centeredX: true
	}, {
		name: 'me3'+versioning,
		centeredX: true
	}];

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

	function resizeAndPositionCanvas(ratio, centered){
		return function(){
			var basicStyle = {
				'top':  (- document.querySelector('main').getBoundingClientRect().top)+'px',
				'min-width': getViewPortSize().y * ratio +'px'
			};
			
			if (!centered) {
				basicStyle.right = '0'
			} else {
				basicStyle.transform = 'translateX(-50%)';
				basicStyle.left = '50%';
			}
			
			Object.assign(document.querySelector('main canvas').style, basicStyle);
		};
	}

	function getViewPortSize(){
		var myWidth = 0, myHeight = 0;
		if( typeof( window.innerWidth ) == 'number' ) {
			//Non-IE
			myWidth = window.innerWidth;
			myHeight = window.innerHeight;
		} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
			//IE 6+ in 'standards compliant mode'
			myWidth = document.documentElement.clientWidth;
			myHeight = document.documentElement.clientHeight;
		} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
			//IE 4 compatible
			myWidth = document.body.clientWidth;
			myHeight = document.body.clientHeight;
		}
		return {
			x: myWidth,
			y: myHeight
		}
	}

	var img = imgArray[ Math.floor( Math.random() * imgArray.length ) ];
	var imgElm = new Image();
	imgElm.onload = function() {
		document.body.style.backgroundImage =  'url(img/' + img.name + '.jpg)';
		if (!img.centeredX) {
			document.body.style.backgroundPositionX = '100%'
		}
		var imgClone = imgElm.cloneNode(true);
		let ratio = imgElm.width / imgElm.height;

		var viewPortSize = getViewPortSize();
		document.querySelector('main').appendChild(imgClone)
		imgClone.closePixelate( [
			{ resolution: 18, width: (viewPortSize.y * ratio) + 'px', height: viewPortSize.y + 'px' }
		] );

		resizeAndPositionCanvas = resizeAndPositionCanvas(ratio, img.centeredX);
		resizeAndPositionCanvas();
		window.addEventListener('scroll', throttle(resizeAndPositionCanvas));
		window.addEventListener('resize', throttle(resizeAndPositionCanvas));
	};

	imgElm.src = 'img/' + img.name + '.jpg';
	var isTouch = ('ontouchstart' in document.documentElement);
	if (!isTouch){
		var elements = document.querySelectorAll('[data-src]');
		for (var i = 0, l = elements.length; i<l; i++){
			var elm = elements[i];
			var dataSrc = elm.getAttribute('data-src');
			elm.setAttribute('data-src', dataSrc.replace(/\.gif$/g, versioning +'.gif'));
		}
		
		new GifLinks(document.querySelectorAll( '[data-src]' ), { preload: true });
	}

		document.body.addEventListener("click", function (event) {
			if (event.target.getAttribute('rel') === "smoke") {
				smoke.signal( 'see you soon...' );
				document.querySelector('#innerced image').setAttribute('y', document.querySelector('#innerced image').getAttribute('y')-150)
			}
		});

	// var tooltips = document.querySelectorAll('.scl');
	// for(var i = 0; i < tooltips.length; i++) {
	// 		tooltips[i].addEventListener('mousemove', function(e) {
	// 				var tooltip = e.target.classList.contains("tooltip") ?
	// 						e.target :
	// 						e.target.querySelector(':scope .tooltip');
	// 				tooltip.style.left =
	// 						e.pageX + tooltip.clientWidth + 10 < document.body.clientWidth ?
	// 						e.pageX + 10 + 'px' :
	// 						document.body.clientWidth + 5 - tooltip.clientWidth + 'px';
	// 				tooltip.style.top =
	// 						e.pageY + tooltip.clientHeight + 10 < document.body.clientHeight ?
	// 						e.pageY + 10 + 'px' : 
	// 						document.body.clientHeight + 5 - tooltip.clientHeight + 'px';
	// 		});
	// }

	ready( smoke.bodyload );

	cheet('c e d m a x', function(){
		document.body.style.overflow = 'hidden';
		var audio = document.createElement('audio');
		audio.innerHTML = '<source src="media/Rolemusic_Besos_y_Abrazos.mp3"/>';
		audio.play();

		webCredits.onend = function(){
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

	// if (navigator.serviceWorker) {
	// 	navigator.serviceWorker.register('/service-worker.js');
	// }

} );
