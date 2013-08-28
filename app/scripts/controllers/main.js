'use strict';

angular.module('noteriousApp')
    .controller('MainCtrl', function ($scope, $window, UserService) {
            $scope.logout = function() {
                UserService.logout();

                $window.location.href = '/';
            };

            $scope.userExists = function() {
                return UserService.userExists();
            };

            $scope.loading = function () {
                return UserService.loading();
            };
        });
