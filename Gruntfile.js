module.exports = function( grunt ) {
	'use strict';

	require('matchdep').filterDev('grunt-!(cli)').forEach(grunt.loadNpmTasks);
	var swPrecache = require('sw-precache');
	var path = require('path');

	var cacheVersion = 10;

	grunt.registerMultiTask('swPrecache', function(){
		var done = this.async();
		var config = this.data;

		writeServiceWorkerFile(config, function(error) {
			if (error) {
				grunt.fail.warn(error);
			}
			done();
		});
	});

	function writeServiceWorkerFile(config, callback) {
		var config = {
			addCacheBuster:false,
			cacheId: cacheVersion,
			logger: grunt.log.writeln,
			staticFileGlobs: config.src
		};

		swPrecache.write(path.join('./', 'service-worker.js'), config, callback);
	}


	grunt.initConfig( {
		swPrecache: {
			dev: {
				src: ['js/lib/almond.js', 'js/main.'+cacheVersion+'.js', 'img/*', 'index.html' ]
			}
		},
		htmlrefs: {
			dist: {
				src: 'src/index.html',
				dest: 'index.html',
				options: {
					cacheVersion: cacheVersion,
					includes: {
						bundle: './src/partials/scripts.html',
						schema: './src/partials/schema.html',
						meta: './src/partials/meta.html',
						closeimg: './src/partials/closeimg.html'
					}
				}
			}
		},
		copy: {
			main: {
				files: [ {
					expand: true,
					flatten: true,
					src: [ 'tmp/main.' + cacheVersion + '.js' ],
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
					src: [ 'src/media/*' ],
					dest: 'media',
					filter: 'isFile'
				}, {
					expand: true,
					flatten: true,
					src: [ 'tmp/img/sprite.' + cacheVersion + '.png' ],
					dest: 'img',
					filter: 'isFile'
				}, {
					expand: true,
					flatten: true,
					src: [ 'src/img/*.*' ],
					dest: 'img',
					filter: 'isFile',
					rename: function(dest, src) {
						return dest +'/'+ src.replace('.jpg', '.'+ cacheVersion+'.jpg');
					}
				}, {
					expand: true,
					flatten: true,
					src: [ 'src/img/gif/*.*' ],
					dest: 'img/gif',
					filter: 'isFile',
					rename: function(dest, src) {
						return dest +'/'+ src.replace('.gif', '.'+ cacheVersion+'.gif');
					}
				}  ]
			}
		},
		sprite: {
			all: {
				src: 'src/img/used-icons/*.png',
				destImg: 'img/sprite.' + cacheVersion + '.png',
				destCSS: 'tmp/icons.css',
				imgPath: 'img/sprite.' + cacheVersion + '.png',
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
					out: 'tmp/main.' + cacheVersion + '.js',
					name: 'src/js/main.js',
					paths: {
						'lib': 'src/js/lib',
						'jquery': 'src/js/lib/jquery-2.0.1.min'
					},
					shim: {
						'lib/webcredits.min': {
							exports: 'webCredits'
						},
						'lib/smoke.min': {
							exports: 'smoke'
						},
						'lib/giflinks.min': {
							deps: ['jquery'],
						},
						'lib/backstretch.min': {
							deps: ['jquery'],
						},
						'lib/jrumble.min': {
							deps: ['jquery'],
						},
						'lib/atooltip.min': {
							deps: ['jquery'],
						}
					}
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'tmp/style.css': [ 'src/style.css' ],
					'tmp/icons.css': [ 'tmp/icons.css' ],
					'tmp/fonts.css': [ 'src/fonts.css' ]
				}
			}
		},
		minifyHtml: {
			options: {
				quotes: true
			},
			dist: {
				files: {
					'index.html': 'index.html'
				}
			}
		},
		autoprefixer:{
			default: {
				src: 'tmp/style.css',
				dest: 'tmp/style.css'
			},
		},
		clean: {
			tmp: [ 'tmp' ],
			reset: ['media', 'img', 'js', 'service-worker.js', 'index.html']
		}
	} );

	grunt.registerTask( 'default', [ 'requirejs', 'sprite', 'cssmin', 'autoprefixer', 'copy', 'htmlrefs', 'minifyHtml', 'clean:tmp', 'swPrecache' ] );
};
