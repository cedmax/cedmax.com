/* global require */

require( [
	'jquery',
	'lib/smoke.min',
	'lib/backstretch.min',
	'lib/jrumble.min',
	'lib/atooltip.min'
], function( $, smoke ) {
	'use strict';

	var imgArray = [ {
		name: 'me',
		align: 'left',
		centeredX: false
	}, {
		name: 'me2',
		align: 'right',
		centeredX: false
	}, {
		name: 'me3',
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

	$( '#content a:not([class~="google" ])' ).aToolTip( {
		xOffset: 15,
		yOffset: -65
	} ).jrumble();

	$( '# content a[ rel = smoke ]' ).click( function() {
		smoke.signal( 'see you soon...' );
	} );
} );