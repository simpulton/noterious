'use strict';

angular.module('noteriousApp')
    .factory('NoteriousService', function ($rootScope, angularFire) {
        var currentUser = 'blah blah blah';
        var baseUrl = 'https://noterious.firebaseio.com/';
        var noteriousRef = new Firebase(baseUrl);

        //---------------------------------------------------------------------
        // Authentication
        // NOTE: Move to a separate service
        //---------------------------------------------------------------------
        var auth = new FirebaseSimpleLogin(noteriousRef, function (error, user) {
            if (error) {
                // an error occurred while attempting login
                console.log(error);
            } else if (user) {
                // user authenticated with Firebase
                // console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
                this.user = user;
            } else {
                // user is logged out
            }
        });

        var register = function (email, password) {
            auth.createUser(email, password, function (error, user) {
                if (!error) {
                    console.log('User Id: ' + user.id + ', Email: ' + user.email);
                }
            });
        };

        var login = function (email, password) {
            auth.login('password', {
                email: email,
                password: password
            });
        };

        var logout = function () {
            auth.logout();
        };

        var changePassword = function (email, oldPassword, newPassword) {
            auth.changePassword(email, oldPassword, newPassword, function (error, success) {
                if (!error) {
                    console.log('Password change successfully');
                }
            });
        };

        var getCurrentUser = function() {
            return auth.user;
        }

        return {
            getCurrentUser: getCurrentUser,
            register: register,
            login: login,
            logout: logout,
            changePassword: changePassword,
            currentUser: currentUser
        }
    });
