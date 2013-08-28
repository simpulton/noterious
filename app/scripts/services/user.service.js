'use strict';

angular.module('noteriousApp')
    .factory('UserService', function ($rootScope) {
        var baseUrl = 'https://noterious.firebaseio.com/';
        var noteriousRef = new Firebase(baseUrl);

        var _loading = true;

        var auth = new FirebaseSimpleLogin(noteriousRef, function (error, user) {
            if (error) {
                // an error occurred while attempting login
                this.user = null;
                console.log(error);
            } else if (user) {
                // user authenticated with Firebase
                // console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
                this.user = user;
                $rootScope.$broadcast('onLogin');
            } else {
                // user is logged out
                this.user = null;
                $rootScope.$broadcast('onLogout');
                console.log('User is logged out');
            }

            _loading = false;
            $rootScope.$broadcast('dataLoaded');
        });

        var login = function (email, password) {
            _loading = true;

            auth.login('password', {
                email: email,
                password: password
            });
        };

        var logout = function () {
            auth.logout();
        };1

        var register = function (email, password) {
            var self = auth;
            _loading = true;
            auth.createUser(email, password, function (error, user) {
                _loading = false;

                if (!error) {
                    self.user = user;
                    $rootScope.$broadcast('onLogin');
                    console.log('User Id: ' + user.id + ', Email: ' + user.email);
                }
            });
        };

        var changePassword = function (email, oldPassword, newPassword) {
            _loading = true;
            auth.changePassword(email, oldPassword, newPassword, function (error, success) {
                if (!error) {
                    console.log('Password change successfully');
                }
                _loading = false;
            });
        };

        function existy(x) { return x != null; }

        function userExists() { return existy(auth.user) && existy(auth.user.id); }

        var getCurrentUserId = function() {
            return userExists() ? auth.user.id : null;
        }

        var loading = function() {
            return _loading;
        }

        return {
            loading: loading,
            userExists: userExists,
            getCurrentUserId: getCurrentUserId,
            register: register,
            login: login,
            logout: logout,
            changePassword: changePassword
        }
    });
