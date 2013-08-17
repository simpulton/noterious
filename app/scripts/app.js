'use strict';

angular.module('noteriousApp', ['ngRoute', 'ngAnimate'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/boards', {
                templateUrl: 'views/boards.html',
                controller: 'BoardsCtrl'
            })
            .when('/boards/:boardId', {
                templateUrl: 'views/board.html',
                controller: 'BoardCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });