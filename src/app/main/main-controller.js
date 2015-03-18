'use strict';

angular.module('noterious')
  .controller('MainCtrl', function (UserModel, Auth, $state) {
    var main = this;
    main.auth = Auth;

    main.colors = ['blue', 'green', 'orange', 'red', 'yellow'];
    main.color = main.colors[Math.floor(Math.random() * main.colors.length)];

    main.logout = function () {
      UserModel.logout();
    };

    main.auth.$onAuth(function (authData) {
      if (authData) {
        $state.go('boards');
      } else {
        $state.go('login');
      }
    });
  });
