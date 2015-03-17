'use strict';

angular.module('noterious', [
  'ngRoute',
  'ngAnimate',
  'firebase',
  'noterious.common'
])
  .constant('ENDPOINT_URI', 'https://noterious.firebaseio.com/')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/login/login.tmpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/boards/:boardId', {
        templateUrl: 'app/notes/notes.tmpl.html',
        controller: 'NotesCtrl',
        controllerAs: 'ctrl',
        resolve: {
          'currentUser': ['Auth', function (Auth) {
            return Auth.$requireAuth();
          }]
        }
      })
      .when('/', {
        templateUrl: 'app/boards/boards.tmpl.html',
        controller: 'BoardsCtrl',
        controllerAs: 'ctrl',
        resolve: {
          'currentUser': ['Auth', function (Auth) {
            return Auth.$requireAuth();
          }]
        }
      })
      .otherwise({
        redirectTo: '/login'
      })
    ;
  })
  .run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
      if (error === 'AUTH_REQUIRED') {
        $location.path('/login');
      }
    });
  })
;