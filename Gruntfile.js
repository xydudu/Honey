'use strict';
module.exports = function(grunt) {

    //grunt.loadNpmTasks('grunt-conventional-changelog');
    grunt.loadNpmTasks('grunt-karma');
    grunt.initConfig({
        karma: {
            options: {
                browsers: ['Chrome'],
                port: 9999,
                files: [
                    'test/**/*.js'
                ],
                frameworks: ['mocha'],
                autoWatch: false,
                plugins: ['karma-mocha', 'karma-chrome-launcher', 'karma-ievms']
            }
        }
    });

    grunt.registerTask('test', ['karma']);
    //grunt.registerTask('test', ['karma']);
};
