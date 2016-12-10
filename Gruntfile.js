module.exports = function( grunt ) {
  'use strict';

  require('matchdep').filterDev('grunt-!(cli)').forEach(grunt.loadNpmTasks);
  var swPrecache = require('sw-precache');
  var path = require('path');

  var cacheVersion = 21;

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
    config = {
      addCacheBuster:false,
      cacheId: cacheVersion,
      logger: grunt.log.writeln,
      staticFileGlobs: config.src
    };

    swPrecache.write(path.join('./', 'service-worker.'+cacheVersion+'.js'), config, callback);
  }


  grunt.initConfig( {
    swPrecache: {
      dev: {
        src: ['js/vendor/almond.js', 'js/main.'+ cacheVersion +'.js', 'img/*', 'index.html' ]
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
          src: [ 'src/js/vendor/almond.js' ],
          dest: 'js/vendor',
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
    requirejs: {
      compile: {
        options: {
          optimize: 'uglify2',
          baseUrl: '.',
          out: 'tmp/main.' + cacheVersion + '.js',
          name: 'src/js/main.js',
          paths: {
            'lib': 'src/js/lib',
            'vendor': 'src/js/vendor',
          },
          shim: {
            'vendor/webcredits.min': {
              exports: 'webCredits'
            },
            'vendor/smoke.min': {
              exports: 'smoke'
            },
            'vendor/giflinks.min': {
              exports: 'GifLinks'
            },
          }
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'tmp/style.css': [ 'src/style.css' ],
          'tmp/icons.css': [ 'src/icons.css' ],
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
      reset: ['media', 'img', 'js', 'service-worker*', 'index.html']
    }
  } );

  grunt.registerTask( 'default', [ 'clean:reset', 'requirejs', 'cssmin', 'autoprefixer', 'copy', 'htmlrefs', 'minifyHtml', 'clean:tmp', 'swPrecache' ] );
};
