module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-htmlrefs');
    grunt.loadNpmTasks('node-spritesheet');

    var version = 1;

    grunt.initConfig({
        htmlrefs: {
            dist: {
                src: 'src/index.html',
                dest: '.',
                options: {
                    version: version
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ["tmp/main." +version+ ".js"], dest: 'js/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['src/js/lib/require.js'], dest: 'js/lib', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['tmp/img/sprite.' +version+ '.png'], dest: 'img', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['src/img/*.*'], dest: 'img', filter: 'isFile'}
                ]
            }
        },
        spritesheet: {
            set: {
                options: {
                    // Compiles to bin/assets/images/spritesheets/flags.png
                    outputImage: 'img/sprite.'+version+'.png',
                    // Compiles to bin/assets/stylesheets/flags.css
                    outputCss: 'icons.css',
                    selector: '.scl'
                },
                files: {
                    'tmp': 'src/img/used-icons/*.png'
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    optimize:"uglify2",
                    baseUrl: ".",
                    out: "tmp/main." +version+ ".js",
                    name:"src/js/main.js",
                    paths: {
                        'lib' : 'src/js/lib',
                        'jquery': 'src/js/lib/jquery-2.0.1.min'
                    },
                    shim: {
                        'lib/smoke.min': {
                            deps: ['jquery'],
                            exports: 'smoke'
                        }
                    }
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'tmp/style.css': ['src/style.css'],
                    'tmp/icons.css': ['tmp/icons.css']
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
        clean: ["tmp"]
    });

    grunt.registerTask('default', ['requirejs','spritesheet', 'cssmin', 'copy', 'htmlrefs', 'htmlmin', 'clean']);
};
