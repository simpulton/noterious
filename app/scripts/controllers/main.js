'use strict';

angular.module('noteriousApp')
    .controller('MainCtrl', function ($scope, $window, UserService) {
            $scope.logout = function() {
                UserService.logout();

                $window.location.href = '/';
            };

            $scope.currentUser = function() {
                return UserService.getCurrentUser();
            };

            $scope.loading = function () {
                return UserService.loading();
            };
        });
