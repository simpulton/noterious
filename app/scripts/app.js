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
    }).run(function ($animate, $rootScope) {
        $animate.enabled(true);

        $rootScope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };
    });
