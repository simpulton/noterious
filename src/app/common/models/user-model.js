'use strict';

angular.module('noterious.common')
  .service('UserModel', function (Auth) {
    var service = this,
      currentUser = null;

    service.getCurrentUser = function () {
      return currentUser;
    };

    service.setCurrentUser = function(user){
      currentUser = user;
    };

    service.login = function (user) {
      return Auth.$authWithPassword({
        email: user.email,
        password: user.password
      })
      .then(function(authData) {
        currentUser = authData.uid;
        console.log('Logged in as:', authData.uid);
        return currentUser;
      })
      .catch(function(error) {
        currentUser = null;
        console.error('Authentication failed:', error);
      });
    };

    service.register = function(user) {
      return Auth.$createUser({
        email: user.email,
        password: user.password
      })
      .then(function(userData) {
        console.log('User ' + userData.uid + ' created successfully!');

        return service.login(user.email, user.password);
      })
      .catch(function(error) {
        console.error('Error: ', error);
      });
    };

    service.logout = function () {
      console.log('LOGOUT FIRED!');
      Auth.$unauth();
    };
  });
