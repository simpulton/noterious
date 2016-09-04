'use strict';

angular.module('noterious.common')
  .service('UserModel', function (Auth, $q) {
    var service = this,
        currentUser = null,
        token = null;

    service.getCurrentUser = function () {
      return currentUser;
    };

    service.getToken = function ()
    {
      return token;
    };

    service.setCurrentUser = function (user) {
      currentUser = user;
    };

    service.login = function (user) {
        var deferred = $q.defer();
        Auth.$signInWithEmailAndPassword(user.email, user.password)
            .then(function (firebaseUser) {
                currentUser = firebaseUser.uid;
                firebaseUser.getToken()
                    .then( function (data) {
                        token = data;
                        deferred.resolve(currentUser);
                    })
                    .catch( function (error) {
                        token = null;
                        console.error('Obtaining auth token failed:', error);
                        deferred.reject(error)
                        }
                    );
            })
            .catch(function (error) {
                currentUser = null;
                console.error("Authentication failed:", error);
                deferred.reject(error)
            });
        return deferred.promise;
    };

    service.register = function (user) {
        var deferred = $q.defer();
        Auth.$createUserWithEmailAndPassword(user.email, user.password)
            .then(function (firebaseUser) {
                console.log('User ' + firebaseUser.uid + ' created successfully!');
                deferred.resolve(service.login(user));
            })
            .catch(function (error) {
                console.error('Error: ', error);
                deferred.reject(error)
            })
        return deferred.promise;
    };

    service.logout = function () {
      console.log('LOGOUT FIRED!');
      Auth.$signOut();
      currentUser = null;
    };
  });
