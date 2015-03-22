'use strict';

describe('Service: UserModel', function () {

  var UserModel;
  var mockAuth;
  var scope;

  var expectedUid = 'uid-42';

  var createUser = function () {
    return {
      email: 'test.user@onehungrymind.com',
      password: 'super secret!'
    };
  };

  var randInt = function(){
    return Math.floor((Math.random() * 1000) + 1)
  };

  var resolvePromises = function (){
    // promises are resolved/dispatched only on next $digest cycle
    scope.$apply();
  };

  beforeEach(function () {
      mockAuth = {};
      expectedUid = 'uid-' + randInt();

      module('noterious');
      module(function ($provide) {
        $provide.value('Auth', mockAuth);
      });

      //create a 'simple' mock Auth object that returns promises that can be spied-upon
      inject(function ($q) {
        mockAuth.$authWithPassword = function (user) {
          var deferred = $q.defer();
          deferred.resolve({
              uid: expectedUid,
              email: user.email,
              password: user.password
            }
          );
          return deferred.promise;
        };

        mockAuth.$createUser = function (user) {
          var deferred = $q.defer();
          deferred.resolve(
            {
              uid: expectedUid,
              email: user.email,
              password: user.password
            }
          );
          return deferred.promise;
        };

        mockAuth.$unauth = function () {
          var deferred = $q.defer();
          deferred.resolve();
          return deferred.promise;
        };
      });

      spyOn(mockAuth, '$authWithPassword').and.callThrough();
      spyOn(mockAuth, '$createUser').and.callThrough();
      spyOn(mockAuth, '$unauth').and.callThrough();

    }
  );

  beforeEach(inject(function ($rootScope, _UserModel_) {
    scope = $rootScope.$new();
    UserModel = _UserModel_;
  }));

  it('should be defined', function () {
    expect(UserModel).toBeDefined();
  });

  it('currentUser should default to a logged-out state', function () {
    expect(UserModel.getCurrentUser()).toBeNull();
  });

  describe('register', function () {

    it('should be defined', function () {
      expect(UserModel.register).toBeDefined();
    });

    it('should register the provided user and log them in', function () {
      spyOn(UserModel, 'login').and.callThrough();

      var expectedUser = createUser();

      UserModel.register(expectedUser);

      resolvePromises();

      expect(mockAuth.$createUser).toHaveBeenCalledWith({
        email: expectedUser.email,
        password: expectedUser.password
      });

      expect(UserModel.getCurrentUser()).toEqual(expectedUid);

      expect(UserModel.login).toHaveBeenCalledWith(expectedUser.email, expectedUser.password);
    });

    it('should login the provided user', function () {
      spyOn(UserModel, 'register');

      var expectedUser = createUser();

      UserModel.login(expectedUser);

      resolvePromises();

      expect(mockAuth.$authWithPassword).toHaveBeenCalledWith({
        email: expectedUser.email,
        password: expectedUser.password
      });

      expect(UserModel.getCurrentUser()).toEqual(expectedUid);

      expect(UserModel.register).not.toHaveBeenCalled();
    });

    it('should logout the user', function () {
      spyOn(UserModel, 'register');

      var expectedUser = createUser();
      UserModel.login(expectedUser);
      resolvePromises();

      UserModel.logout();

      resolvePromises();

      expect(mockAuth.$unauth).toHaveBeenCalled();

      expect(UserModel.getCurrentUser()).toBeNull();

      expect(UserModel.register).not.toHaveBeenCalled();
    });

  });

});