// Generated on 2013-10-24 using generator-angular 0.4.0
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});
var mountFolder = function(connect, dir) {
        return connect.static(require('path').resolve(dir));
    };


// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    grunt.loadNpmTasks('grunt-karma');
    // configurable paths
    var yeomanConfig = {
        app: 'demo',
        dist: 'dist',
        src: "src"
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            copy: {
                files: ['<%= yeoman.src %>/*.js'],
                tasks: ['copy']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: ['<%= yeoman.app %>/{,*/}*.html', '<%= yeoman.app %>/{,*/}*.js', '.tmp/styles/{,*/}*.css', '{.tmp,<%= yeoman.app %>}/{scripts,release}/{,*/}*.js', '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}']
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                        lrSnippet, mountFolder(connect, '<%= yeoman.src %>'), mountFolder(connect, yeomanConfig.app)];
                    }
                }
            },
            test: {
                options: {
                    middleware: function(connect) {
                        return [
                        mountFolder(connect, '.tmp'), mountFolder(connect, 'test')];
                    }
                }
            },
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>/demo.html'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['<%= yeoman.dist %>/*']
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            release: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.src %>',
                    dest: '<%= yeoman.dist %>',
                    src: ['**']
                }]
            },
            demo: {
                expand: true,
                dot: true,
                cwd: '<%= yeoman.src %>',
                dest: '<%= yeoman.app %>/auth/',
                src: ['**']
            }
        },
        // karma: {
        //     unit: {
        //         configFile: 'karma.conf.js',
        //         singleRun: true
        //     }
        // },
        // cdnify: {
        //     dist: {
        //         html: ['<%= yeoman.dist %>/*.html']
        //     }
        // },
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>/'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/green.auth.js': ['<%= yeoman.dist %>/green.auth.min.js']
                }
            }
        }
    });

    grunt.registerTask('server', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run(['clean', 'connect:livereload', 'open', 'watch']);
    });

    grunt.registerTask('test', ['clean', 'connect:test']); //'karma'
    grunt.registerTask('build', ['clean', 'copy', 'ngmin', 'uglify']);

    grunt.registerTask('default', ['test', 'build']);
};