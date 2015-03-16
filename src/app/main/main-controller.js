'use strict';

angular.module('noterious')
  .controller('MainCtrl', function (UserModel) {
    var main = this;

    main.colors = ['blue', 'green', 'orange', 'red', 'yellow'];
    main.color = main.colors[Math.floor(Math.random() * main.colors.length)];

    main.logout = function() {
      UserModel.logout();
    };
  });
