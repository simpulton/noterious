'use strict';

angular.module('noterious.common')
  .factory('Auth', function ($firebaseAuth) {
    var ref = new Firebase("https://docs-sandbox.firebaseio.com", "example3");
    return $firebaseAuth(ref);
  })
;