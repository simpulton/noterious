'use strict';

angular.module('noteriousApp')
    .controller('MainCtrl', function ($scope, $window, UserService) {
        // TODO Turn this into a directive
        $scope.colors = ['blue', 'green', 'orange', 'red', 'yellow'];
        $scope.color = $scope.colors[Math.floor(Math.random() * $scope.colors.length)];

        $scope.logout = function () {
            UserService.logout();

            $window.location.href = '/';
        };

        $scope.userExists = function () {
            return UserService.userExists();
        };

        $scope.loading = function () {
            return UserService.loading();
        };
    });
