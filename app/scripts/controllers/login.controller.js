'use strict';

angular.module('noteriousApp')
    .controller('LoginCtrl', function ($scope, UserService) {
        $scope.user = {
            email: '',
            password: '',
            register: false
        };

        $scope.login = function (email, password, register) {
            ((register) ? UserService.register : UserService.login)(email, password);
        };

        $scope.reset = function () {
            $scope.user = {
                email: '',
                password: '',
                register: false
            };
        };
    });
