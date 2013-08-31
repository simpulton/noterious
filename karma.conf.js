// Karma configuration
module.exports = function(config) {
  config.set({
    basePath : '',
    files : [
      'app/lib/angularjs-1.2-30a21c8/angular.js',
      'app/lib/angularjs-1.2-30a21c8/angular-animate.js',
      'app/lib/angularjs-1.2-30a21c8/angular-route.js',
      'app/lib/angularjs-1.2-30a21c8/angular-mocks.js',
      'https://cdn.firebase.com/v0/firebase.js',
      'app/bower_components/angular-fire/angularFire.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      'test/spec/**/*.js'
    ],
    exclude : [],
    reporters : ['progress'],
    frameworks: ['jasmine'],
    port : 8080,
    runnerPort : 9100,
    colors : true,
    autoWatch : false,
    browsers : ['Chrome'],
    captureTimeout : 5000,
    singleRun : false
  });
};
