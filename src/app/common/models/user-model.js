'use strict';

angular.module('noterious.common')
  .service('UserModel', function (Auth) {
    var service = this,
      currentUserId = null;

    service.getCurrentUserId = function () {
      return currentUserId;
    };

    service.login = function (email, password) {
      Auth.$authWithPassword({
        email: email,
        password: password
      }).then(function(authData) {
        currentUserId = authData.uid;
        console.log('Logged in as:', authData.uid);
      }).catch(function(error) {
        currentUserId = null;
        console.error('Authentication failed:', error);
      });
    };

    service.register = function(email, password) {
      Auth.$createUser({
        email: email,
        password: password
      }).then(function(userData) {
        console.log('User ' + userData.uid + ' created successfully!');

        return Auth.$authWithPassword({
          email: email,
          password: password
        });
      }).then(function(authData) {
        currentUserId = authData.uid;
        console.log('Logged in as:', authData.uid);
      }).catch(function(error) {
        console.error('Error: ', error);
      });
    };
    
    service.logout = function () {
      auth.$unauth();
    };
  });
