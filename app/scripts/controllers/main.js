'use strict';

angular.module('noteriousApp')
    .controller('MainCtrl', function ($scope, NoteriousService) {
            $scope.logout = function() {
                NoteriousService.logout();
            };

            $scope.currentUser = function() {
                return NoteriousService.getCurrentUser();
            };
        });
