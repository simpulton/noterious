'use strict';

angular.module('noteriousApp', ['ngRoute', 'ngAnimate', 'firebase'])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/boards.html',
                controller: 'BoardsCtrl'
            })
            .when('/:boardId', {
                templateUrl: 'views/board.html',
                controller: 'BoardCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }).run(function ($animate) {
        $animate.enabled(true);
    });
