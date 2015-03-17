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

    service.login = function (email, password) {
      Auth.$authWithPassword({
        email: email,
        password: password
      }).then(function(authData) {
        currentUser = authData.uid;
        console.log('Logged in as:', authData.uid);
      }).catch(function(error) {
        currentUser = null;
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
        currentUser = authData.uid;
        console.log('Logged in as:', authData.uid);
      }).catch(function(error) {
        console.error('Error: ', error);
      });
    };
    
    service.logout = function () {
      console.log('LOGOUT FIRED!');
      Auth.$unauth();
    };
  });
