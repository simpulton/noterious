'use strict';

angular.module('noterious')
  .controller('MainCtrl', function (UserModel, Auth, $state) {
    var main = this;
    main.auth = Auth;
    main.currentUser = null;

    main.colors = [
      'blue',
      'green',
      'orange',
      'red',
      'yellow'
    ];

    function random(num) {
      return Math.floor(Math.random() * num);
    }

    main.color = main.colors[random(main.colors.length)];

    main.logout = function () {
      UserModel.logout();
    };

    main.auth.$onAuth(function (authData) {
      if (authData) {
        UserModel.setCurrentUser(authData.uid);
        main.currentUser = authData.uid;
        // $state.go('boards');
      } else {
        main.currentUser = null;
        $state.go('login');
      }
    });
  });
