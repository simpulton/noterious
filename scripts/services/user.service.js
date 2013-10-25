'use strict';

angular.module('noteriousApp')
    .factory('UserService', function ($rootScope, angularFireAuth) {
        var $scope = $rootScope.$new(false);
        $scope.loading = true;
        $scope.user = {};

        var ref = new Firebase('https://noterious.firebaseio.com/');
        angularFireAuth.initialize(ref, {scope: $scope, name: 'user'});

        var login = function (email, password) {
            $scope.loading = true;

            angularFireAuth.login('password', {
                email: email,
                password: password
            });
        };

        var logout = function () {
            angularFireAuth.logout();
        };

        var register = function (email, password) {
            $scope.loading = true;
            angularFireAuth.createUser(email, password);
        };

        var existy = function (x) {
            return x != null;
        };

        var userExists = function () {
            return existy($scope.user) && existy($scope.user.id);
        };

        var getCurrentUserId = function () {
            return userExists() ? $scope.user.id : null;
        };

        var getCurrentUserEmail = function () {
            return userExists() ? $scope.user.email : '';
        };

        var loading = function () {
            return $scope.loading;
        };

        $scope.$on("angularFireAuth:login", function(evt, user) {
            $scope.user = user;
            $scope.loading = false;
            $rootScope.$broadcast('onLogin');
        });

        $scope.$on("angularFireAuth:logout", function(evt) {
            $scope.user = null;
            $scope.loading = false;
            $rootScope.$broadcast('onLogout');
        });

        $scope.$on("angularFireAuth:error", function(evt, err) {
            $scope.user = null;
            $scope.loading = false;
            $rootScope.$broadcast('onLogout');
        });

        return {
            loading: loading,
            userExists: userExists,
            getCurrentUserId: getCurrentUserId,
            getCurrentUserEmail: getCurrentUserEmail,
            login: login,
            logout: logout,
            register: register
        }
    });
