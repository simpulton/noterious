'use strict';

angular.module('noterious', [
  'ui.router',
  'ngAnimate',
  'backand',
  'ngCookies',
  'noterious.common'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider, BackandProvider) {
  BackandProvider.manageDefaultHeaders();
  //BackandProvider.setAnonymousToken('Your Anonymous Token');
  //BackandProvider.setSignUpToken('Your SignUp Token');
  BackandProvider.setApiUrl('http://api.backand.co:8099');

  $httpProvider.interceptors.push('httpInterceptor');
  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('login', {
      url:'/login',
      templateUrl: 'app/login/login.tmpl.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
    })
    .state('boards', {
      url:'/boards',
      templateUrl: 'app/boards/boards.tmpl.html',
      controller: 'BoardsCtrl',
      controllerAs: 'ctrl'
    })
    .state('notes', {
      url:'/boards/:boardId/notes',
      templateUrl: 'app/notes/notes.tmpl.html',
      controller: 'NotesCtrl',
      controllerAs: 'ctrl'
    });
});
