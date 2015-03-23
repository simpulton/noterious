'use strict';

angular.module('noterious')
  .controller('MainCtrl', function (UserModel, $window) {
    var main = this;
    main.currentColor = 'blue';

    main.colors = [
      'blue',
      'green',
      'orange',
      'red',
      'yellow'
    ];

    main.setCurrentColor = function(color) {
      main.currentColor = color;
    };

    main.logout = function () {
      UserModel.logout();
      $window.location.reload();
    };
  });
