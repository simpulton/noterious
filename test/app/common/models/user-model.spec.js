'use strict';

describe('Service: UserModel', function () {

  var UserModel;
  var mockAuth;
  var scope;

  var createUser = function () {
    return {
      email: 'test.user@onehungrymind.com',
      password: 'super secret!'
    };
  };

  beforeEach(function () {
      mockAuth = {};
      module('noterious');
      module(function ($provide) {
        $provide.value('Auth', mockAuth);
      });

      //create a simple mock Auth object that returns promises that can be spied-upon
      inject(function ($q) {
        mockAuth.$authWithPassword = function () {
          var deferred = $q.defer();
          deferred.resolve("data for successful login");
          return deferred.promise;
        };

        mockAuth.$createUser = function (user) {
          var deferred = $q.defer();
          deferred.resolve(
            {
              uid: 'uid-42',
              email: user.email,
              password: user.password
            }
          );
          return deferred.promise;
        };
      });

      spyOn(mockAuth, '$authWithPassword').and.callThrough();
      spyOn(mockAuth, '$createUser').and.callThrough();

    }
  );

  beforeEach(inject(function ($rootScope, _UserModel_) {
    scope = $rootScope.$new();
    UserModel = _UserModel_;
  }));

  it('should be defined', function () {
    expect(UserModel).toBeDefined();
  });

  describe('register', function () {

    it('should be defined', function () {
      expect(UserModel.register).toBeDefined();
    });

    it('should register the provided user and log them in', function () {

      var expectedUser = createUser();

      spyOn(UserModel, 'login');

      UserModel.register(expectedUser);

      scope.$apply(); // promises are resolved/dispatched only on next $digest cycle

      expect(mockAuth.$createUser).toHaveBeenCalledWith({
        email: expectedUser.email,
        password: expectedUser.password
      });

      expect(UserModel.login).toHaveBeenCalledWith(expectedUser.email, expectedUser.password);
    });

  });

});