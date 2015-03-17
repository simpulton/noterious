'use strict';

angular.module('noterious')
  .controller('MainCtrl', function (UserModel, Auth, $location) {
    var main = this;
    main.auth = Auth;

    main.colors = ['blue', 'green', 'orange', 'red', 'yellow'];
    main.color = main.colors[Math.floor(Math.random() * main.colors.length)];

    main.logout = function () {
      UserModel.logout();
    };

    main.auth.$onAuth(function (authData) {
      if (authData) {
        $location.path('/');
      } else {
        $location.path('/login');
      }
    });
  });
