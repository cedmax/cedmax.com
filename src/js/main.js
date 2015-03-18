/* global require, version */

require( [
	'jquery',
	'lib/smoke.min',
	'lib/giflinks.min',
	'lib/backstretch.min',
	'lib/jrumble.min',
	'lib/atooltip.min',
], function( $, smoke ) {
	'use strict';

	var imgArray = [ {
		name: 'me.'+version,
		align: 'left',
		centeredX: false
	}, {
		name: 'me2.'+version,
		align: 'right',
		centeredX: false
	}, {
		name: 'me3.'+version,
		align: 'right',
		centeredX: true
	} ];

	var img = imgArray[ Math.floor( Math.random() * imgArray.length ) ];
	$.backstretch( 'img/' + img.name + '.jpg', {
		align: img.align,
		centeredX: img.centeredX,
		centeredY: false,
		speed: 300
	} );
 	
 	var isTouch = !!("undefined" != typeof document.documentElement.ontouchstart);
 	if (!isTouch){
 		$('[data-src]').each(function(i, elm){
 			var dataSrc = $(elm).attr('data-src');
 			$(elm).attr('data-src', dataSrc.replace(/\.gif$/g, '.'+version +'.gif'));
 		});
 		GifLinks(document.querySelectorAll( '[data-src]' ), { preload: true });
 	}
	

	$( '#content a:not([class~="google" ])' ).aToolTip( {
		xOffset: 15,
		yOffset: -65
	} );

	$( '#content a[rel=smoke]' ).click( function() {
		smoke.signal( 'see you soon...' );
	} );
} );