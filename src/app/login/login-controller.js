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

    login.submit = function (user, isValid, isRegistering) {
      login.alerts.length = 0;
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
          }, function(data){
            console.error('data from error callback: ', data);
          })
          .finally(function(){
            login.reset();
          });

        }

      } else {
        console.error('invalid login!');
        login.alerts.push({
          message : 'Please enter valid log in credentials'
        });
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
