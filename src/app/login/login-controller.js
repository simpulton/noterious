'use strict';

angular.module('noterious')
  .controller('LoginCtrl', function (UserModel, $state) {
    var login = this;

    login.loading = false;

    login.user = {
      email: '',
      password: '',
      register: false
    };

    login.submit = function (user, isValid, isRegistering) {
      if (isValid) {
        login.loading = true;

        if (isRegistering) {

          UserModel.register({
            email: login.user.email,
            password: login.user.password
          })
          .then(function() {
            $state.go('boards');
          })
          .finally(function() {
            login.reset();
          });

        } else {

          UserModel.login({
            email: login.user.email,
            password: login.user.password
          })
          .then(function() {
            $state.go('boards');
          })
          .finally(function() {
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
        register: false
      };
    };
  });
