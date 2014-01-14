'use strict';
module.exports = function(grunt) {

    //frameworks = ["requirejs"];
    //grunt.loadNpmTasks('grunt-conventional-changelog');
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        karma: {
            options: {
                browsers: ['PhantomJS' /*'Chrome', 'Firefox'*/],
                runnerPort: 9999,
                //files: [
                //    'src/head.load.js',
                //    'src/honey.source.js',
                //    'test/honey.js'
                //],
                frameworks: ['mocha', 'chai'],
                autoWatch: true,
                colors : true,
                plugins: [
                    'karma-mocha',
                    'karma-spec-reporter',
                    'karma-chai',
                    'karma-phantomjs-launcher'
                ]
            },
            continuous: {
                singleRun: true,
                browsers: ['PhantomJS'],
                reporters : ['spec'],
                options: {
                    files: [
                        'src/head.load.js',
                        'src/honey.source.js',
                        'test/honey.js'
                    ]
                }
            },
            debug: {
                singleRun: true,
                browsers: ['PhantomJS'],
                reporters : ['spec'],
                options: {
                    files: [
                        'src/head.load.js',
                        'src/honey.source.js',
                        'test/debug.js'
                    ]
                }
            },
            all: {
                singleRun: true,
                browsers: ['PhantomJS'],
                reporters : ['spec'],
                options: {
                    files: [
                        'src/head.load.js',
                        'src/honey.source.js',
                        'test/*.js'
                    ]
                }
            }
        }
    });

    grunt.registerTask('test:honey', ['karma:continuous']);
    grunt.registerTask('test:debug', ['karma:debug']);
    grunt.registerTask('test', ['karma:all']);
};
