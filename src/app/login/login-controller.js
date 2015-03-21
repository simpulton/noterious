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

    function onSuccess(result) {
      $state.go('boards');
    }

    function onError(reason) {
      login.error = reason.message;
      console.log('login.error', login.error);
    }

    function onCompletion() {
      login.reset();
    }

    login.submit = function (user, isValid, isRegistering) {
      if (isValid) {
        login.loading = true;

        if (isRegistering) {
          UserModel.register({
            email: login.user.email,
            password: login.user.password
          })
          .then(onSuccess)
          .catch(onError)
          .finally(onCompletion);

        } else {
          UserModel.login({
            email: login.user.email,
            password: login.user.password
          })
          .then(onSuccess)
          .catch(onError)
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
