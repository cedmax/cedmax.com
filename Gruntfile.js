module.exports = function(grunt) {
  'use strict';

  require('matchdep')
    .filterDev('grunt-!(cli)')
    .forEach(grunt.loadNpmTasks);
  var fs = require('fs');
  var cacheVersion = 34;

  grunt.initConfig({
    htmlrefs: {
      dist: {
        src: 'src/index.html',
        dest: 'dist/index.html',
        options: {
          cacheVersion: cacheVersion,
          includes: {
            bundle: './src/partials/scripts.html',
            schema: './src/partials/schema.html',
            meta: './src/partials/meta.html',
            closeimg: './src/partials/closeimg.html',
          },
        },
      },
    },
    replace: {
      serviceWorker: {
        options: {
          patterns: [
            {
              match: 'filesToCache',
              replacement: fs
                .readdirSync(__dirname + '/src/img')
                .filter(
                  img => img.indexOf('.jpg') > -1 || img.indexOf('.png') > -1
                )
                .map(img => 'img/' + img.replace('.', `.${cacheVersion}.`)),
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['src/service-worker.js'],
            dest: './dist',
          },
        ],
      },
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['_redirects'],
            dest: 'dist/',
            filter: 'isFile',
          },
          {
            expand: true,
            flatten: true,
            src: ['node_modules/sw-toolbox/sw-toolbox.js'],
            dest: 'dist/',
            filter: 'isFile',
          },
          {
            expand: true,
            flatten: true,
            src: ['tmp/main.' + cacheVersion + '.js'],
            dest: 'dist/js/',
            filter: 'isFile',
          },
          {
            expand: true,
            flatten: true,
            src: ['src/media/*'],
            dest: 'dist/media',
            filter: 'isFile',
          },
          {
            expand: true,
            flatten: true,
            src: ['src/img/*.*'],
            dest: 'dist/img',
            filter: 'isFile',
            rename: function(dest, src) {
              return (
                dest + '/' + src.replace('.jpg', '.' + cacheVersion + '.jpg')
              );
            },
          },
          {
            expand: true,
            flatten: true,
            src: ['src/img/gif/*.*'],
            dest: 'dist/img/gif',
            filter: 'isFile',
            rename: function(dest, src) {
              return (
                dest + '/' + src.replace('.gif', '.' + cacheVersion + '.gif')
              );
            },
          },
          {
            expand: true,
            flatten: true,
            src: ['src/img/pp/*.*'],
            dest: 'dist/img/pp',
            filter: 'isFile',
            rename: function(dest, src) {
              return (
                dest + '/' + src.replace('.jpg', '.' + cacheVersion + '.jpg')
              );
            },
          },
        ],
      },
    },
    requirejs: {
      compile: {
        options: {
          deps: ['vendor/almond'],
          optimize: 'uglify2',
          baseUrl: '.',
          out: 'tmp/main.' + cacheVersion + '.js',
          name: 'src/js/main.js',
          paths: {
            lib: 'src/js/lib',
            vendor: 'src/js/vendor',
          },
          shim: {
            'vendor/webcredits.min': {
              exports: 'webCredits',
            },
            'vendor/smoke.min': {
              exports: 'smoke',
            },
            'vendor/giflinks.min': {
              exports: 'GifLinks',
            },
          },
        },
      },
    },
    cssmin: {
      combine: {
        files: {
          'tmp/style.css': ['src/style.css'],
          'tmp/fonts.css': ['src/fonts.css'],
        },
      },
    },
    minifyHtml: {
      options: {
        quotes: true,
      },
      dist: {
        files: {
          'dist/index.html': 'dist/index.html',
        },
      },
    },
    autoprefixer: {
      default: {
        src: 'tmp/style.css',
        dest: 'tmp/style.css',
      },
    },
    clean: {
      tmp: ['tmp'],
      reset: ['media', 'img', 'js', 'service-worker*', 'index.html'],
    },
  });

  grunt.registerTask('default', [
    'clean:reset',
    'requirejs',
    'cssmin',
    'autoprefixer',
    'copy',
    'htmlrefs',
    'minifyHtml',
    'clean:tmp',
    'replace',
  ]);
};
