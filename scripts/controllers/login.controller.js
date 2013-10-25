'use strict';

angular.module('noteriousApp')
    .controller('LoginCtrl', function ($scope, UserService) {
        $scope.user = {
            email: '',
            password: '',
            register: false
        };

        $scope.submit = function (email, password, register) {
          if($scope.loginForm.$valid) {
            ((register) ? UserService.register : UserService.login)(email, password);
            $scope.reset();
          }
        };

        $scope.reset = function () {
            $scope.user = {
                email: '',
                password: '',
                register: false
            };
        };
    });
