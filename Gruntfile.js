module.exports = function(grunt) {

    //grunt.loadNpmTasks('grunt-conventional-changelog');
    grunt.loadNpmTasks('grunt-karma');
    grunt.initConfig({
        karma: {
            options: {
                browsers: ['Chrome'],
                files: [
                    'test/**/*.js'
                ],
                frameworks: ['mocha'],
                plugins: ['karma-mocha', 'karma-chrome-launcher']
            },
            continuous: {
              singleRun: true
            },
            dev: {
                reporters: 'dots',
                background: true
            }
            //auto: {
            //    autoWatch: true
            //}
        }
    });

    //grunt.registerTask('test', 'karam');
    grunt.registerTask('test', ['karma:continuous']);
};
