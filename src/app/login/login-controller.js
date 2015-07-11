'use strict';

angular.module('noterious')
  .controller('LoginCtrl', function (UserModel, $state, $location) {
    var login = this;

    login.loading = false;
    var x = $location.search;

    login.user = {
      email: 'itay@backand.com',
      password: 'itay1234',
      appName: 'noterious',
      register: false
    };

    login.submit = function (user, isValid, isRegistering) {
      if (isValid) {
        login.loading = true;

        if (isRegistering) {

          UserModel.register({
            email: login.user.email,
            password: login.user.password,
            appName: login.user.appName
          })
          .then(function() {
              $state.go('boards');
          })
          .finally(function() {
            login.error = UserModel.error;
            login.reset();
          });

        } else {

          UserModel.login({
            email: login.user.email,
            password: login.user.password,
            appName: login.user.appName
          })
          .then(function() {
            if(!UserModel.error)
              $state.go('boards');
            else
              login.error = UserModel.error;
          },function(ee){
                login.error = UserModel.error;
              })
          .finally(function(reason) {

            login.reset();
          });

        }

      }
    };

    login.reset = function () {
      login.loading = false;
      login.user = {
        email: '',
        password: '',
        appName: 'noterious',
        register: false
      };
    };
  });
