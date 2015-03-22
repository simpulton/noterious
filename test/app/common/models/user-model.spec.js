'use strict';

describe('Service: UserModel', function () {

  var UserModel;
  var mockAuth;

  beforeEach(function () {
      module('noterious');

      //create a simple mock Auth object that returns promises that can be spied-upon
      mockAuth = {
        $authWithPassword: function () {
          var deferred = $q.defer();
          deferred.resolve("data for successful login");
          return deferred.promise;
        },
        $createUser: function () {
          var deferred = $q.defer();
          deferred.resolve("data for successful registration");
          return deferred.promise;
        }
      };

      spyOn(mockAuth, '$authWithPassword').and.callThrough();
      spyOn(mockAuth, '$createUser').and.callThrough();

      module(function ($provide) {
        //in angular, services are created via factory functions, return mock
        var mockAuthFactoryFn = function () { return mockAuth };

        //re-configure angular to provide the mock 'Auth' service
        $provide.service('Auth', mockAuthFactoryFn);
      });
    }
  );


  beforeEach(inject(function (_UserModel_) {
    UserModel = _UserModel_;
  }));

  it('should be defined', function () {
    expect(UserModel).toBeDefined();
  });

});