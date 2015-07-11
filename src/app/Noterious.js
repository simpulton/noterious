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
  BackandProvider.setAnonymousToken('33305b02-f647-4ea9-a277-c7b7261cc7bf');
  BackandProvider.setSignUpToken('d1b315bc-6611-4c9b-b3de-19c22e68339c');
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
