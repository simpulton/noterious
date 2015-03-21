'use strict';

angular.module('noterious')
  .controller('LoginCtrl', function (UserModel, $state) {
    var login = this;

    login.loading = false;

    login.alerts = [];

    login.user = {
      email: '',
      password: '',
      register: false
    };

    function onSuccess(result) {
      $state.go('boards');
    }

    function onError(reason) {
      login.error = reason.message;
    }

    function onCompletion() {
      login.reset();
    }

    login.submit = function (user, isValid, isRegistering) {
      login.alerts.length = 0;
      if (isValid) {
        login.loading = true;

        if (isRegistering) {
          UserModel.register({
            email: login.user.email,
            password: login.user.password
          })
          .then(onSuccess, onError)
          .finally(onCompletion);

        } else {
          UserModel.login({
            email: login.user.email,
            password: login.user.password
          })
          .then(onSuccess, onError)
          .finally(onCompletion);
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
