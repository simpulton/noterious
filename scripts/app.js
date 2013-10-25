'use strict';

angular.module('noteriousApp', ['ngRoute', 'ngAnimate', 'firebase'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/boards.html',
                controller: 'BoardsRESTCtrl'
            })
            .when('/:boardId', {
                templateUrl: 'views/board.html',
                controller: 'BoardRESTCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }).run(function ($animate, $rootScope) {
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


