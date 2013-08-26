'use strict';

angular.module('noteriousApp')
    .controller('LoginCtrl', function ($scope, NoteriousService) {
        $scope.user = {
            email: '',
            password: '',
            register: false
        };

        $scope.login = function (email, password, register) {
            ((register) ? NoteriousService.register : NoteriousService.login)(email, password);
        };

        $scope.reset = function () {
            $scope.user = {
                email: '',
                password: '',
                register: false
            };
        };
    });
