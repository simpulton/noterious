'use strict';

angular.module('noterious.common')
  .factory('Auth', function ($firebaseAuth, ENDPOINT_URI) {
    var config = {
    apiKey: "apiKey",
    authDomain: "noterious.firebaseapp.com",
    databaseURL: ENDPOINT_URI,
    storageBucket: "noterious.appspot.com",
  };
  firebase.initializeApp(config);
  return $firebaseAuth(firebase.auth())
  })
;