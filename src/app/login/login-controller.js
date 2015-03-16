'use strict';

angular.module('noterious')
  .controller('LoginCtrl', function (UserService) {
    var login = this;

    login.user = {
      email: '',
      password: '',
      register: false
    };

    login.submit = function () {
      if (login.loginForm.$valid) {
        ((login.user.register) ? UserService.register : UserService.login)(login.user.email, login.user.password);
        login.reset();
      }
    };

    login.reset = function () {
      login.user = {
        email: '',
        password: '',
        register: false
      };
    };
  });
