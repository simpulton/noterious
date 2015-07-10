'use strict';

angular.module('noterious.common')
  .service('UserModel', function (Backand) {
    var service = this,
      currentUser = null;

    service.getCurrentUser = function () {
      return currentUser;
    };

    service.setCurrentUser = function(user){
      currentUser = user;
    };

    service.login = function (user) {
      return Backand.signin(user.email, user.password, user.appName)
        .then(
        function () {
          service.error = '';
          return;
        },
        function (data) {
          service.error = data && data.error_description || 'Unknown error from server';
          console.log(service.error);

        }
      );
    };

    service.register = function(user) {
      return Backand.signup(user.email, 'last', user.email, user.password, '743b8bb5-af18-4275-a5e4-50f5b7b7ba4d')
        .then(
        function(userData) {
          service.error= '';
          console.log('User ' + userData.username + ' created successfully!');
          return userData.username;
        },
        function (data) {
          service.error = data.error_description || 'Unknown error from server';
          console.log(service.error);
        }
      );
    };

    service.logout = function () {
      Backand.signout();
    };
  });
