// Karma configuration
module.exports = function(config) {
  config.set({
    basePath : '',

    // list of files / patterns to load in the browser
    files : [
      'test/e2e/*.js',
      'test/e2e/**/*.js'
    ],

    // list of files to exclude
    exclude : [],

    // test results reporter to use
    // possible values: dots || progress || growl
    reporters : ['progress'],
    frameworks : ['ng-scenario'],

    // web server port
    port : 8888,

    // cli runner port
    runnerPort : 9100,

    // enable / disable colors in the output (reporters and logs)
    colors : true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch : false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers : ['Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout : 5000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun : false,

    urlRoot : '/_karma_',
    proxies : {
      '/': 'http://localhost:9000/'
    }
  });
};
