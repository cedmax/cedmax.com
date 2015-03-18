module.exports = function( grunt ) {
	'use strict';

	require('matchdep').filterDev('grunt-!(cli)').forEach(grunt.loadNpmTasks);

	var assetsVersion = 6;
	var imagesVersion = 1;

	grunt.initConfig( {
		htmlrefs: {
			dist: {
				src: 'src/index.html',
				dest: 'index.html',
				options: {
					assetsVersion: assetsVersion,
					imagesVersion: imagesVersion,
					includes: {
						bundle: './src/partials/scripts.html',
						shareimg: './src/partials/shareimg.html'
					}
				}
			}
		},
		copy: {
			main: {
				files: [ {
					expand: true,
					flatten: true,
					src: [ 'tmp/main.' + assetsVersion + '.js' ],
					dest: 'js/',
					filter: 'isFile'
				}, {
					expand: true,
					flatten: true,
					src: [ 'src/js/lib/almond.js' ],
					dest: 'js/lib',
					filter: 'isFile'
				}, {
					expand: true,
					flatten: true,
					src: [ 'tmp/img/sprite.' + imagesVersion + '.png' ],
					dest: 'img',
					filter: 'isFile'
				}, {
					expand: true,
					flatten: true,
					src: [ 'src/img/*.*' ],
					dest: 'img',
					filter: 'isFile',
					rename: function(dest, src) {
						return dest +'/'+ src.replace('.jpg', '.'+ imagesVersion+'.jpg');
					}
				}, {
					expand: true,
					flatten: true,
					src: [ 'src/img/gif/*.*' ],
					dest: 'img/gif',
					filter: 'isFile',
					rename: function(dest, src) {
						return dest +'/'+ src.replace('.gif', '.'+ imagesVersion+'.gif');
					}
				}  ]
			}
		},
		sprite: {
			all: {
				src: 'src/img/used-icons/*.png',
				destImg: 'img/sprite.' + imagesVersion + '.png',
				destCSS: 'tmp/icons.css',
				imgPath: 'img/sprite.' + imagesVersion + '.png',
				'cssOpts': {
					'cssClass': function( item ) {
						return '.scl.' + item.name;
					}
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					optimize: 'uglify2',
					baseUrl: '.',
					out: 'tmp/main.' + assetsVersion + '.js',
					name: 'src/js/main.js',
					paths: {
						'lib': 'src/js/lib',
						'jquery': 'src/js/lib/jquery-2.0.1.min'
					},
					shim: {
						'lib/smoke.min': {
							deps: [ 'jquery' ],
							exports: 'smoke'
						},
						'lib/giflinks.min': {
							exports: 'GifLinks'
						}
					}
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'tmp/style.css': [ 'src/style.css' ],
					'tmp/icons.css': [ 'tmp/icons.css' ]
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true
				},
				files: {
					'index.html': 'index.html'
				}
			}
		},
		clean: [ 'tmp' ]
	} );

	grunt.registerTask( 'default', [ 'requirejs', 'sprite', 'cssmin', 'copy', 'htmlrefs', 'htmlmin', 'clean' ] );
};