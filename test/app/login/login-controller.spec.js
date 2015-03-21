'use strict';

describe('Controller: LoginCtrl', function () {

  beforeEach(module('noterious'));

  var loginCtrl;
  var UserModel;
  var state;
  var scope;
  var $httpBackend;

  var createDefaultUserState = function () {
    return {
      email: '',
      password: '',
      register: false
    };
  };

  beforeEach(inject(function ($controller, $state, $q, $rootScope, _$httpBackend_) {
    UserModel = {
      login: function () {
        var deferred = $q.defer();
        deferred.resolve("data for successful login");
        return deferred.promise;
      },
      register: function () {
        var deferred = $q.defer();
        deferred.resolve("data for successful registration");
        return deferred.promise;
      }
    };

    spyOn(UserModel, 'register').and.callThrough();
    spyOn(UserModel, 'login').and.callThrough();

    state = $state;
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;

    loginCtrl = $controller('LoginCtrl', {
      UserModel: UserModel,
      $state: state
    });

  }));

  it('should be defined', function () {
    expect(loginCtrl).toBeDefined();
  });

  describe('submit', function () {

    it('should be defined', function () {
      expect(loginCtrl.submit).toBeDefined();
    });

    it('should register user when valid and registering', function () {

      $httpBackend.whenGET("app/login/login.tmpl.html").respond('{}');

      $httpBackend.flush();

      afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      spyOn(state, 'go');
      spyOn(loginCtrl, 'reset').and.callThrough();

      var expectedEmail = 'test.user@onehungrymind.com';
      var expectedPassword = 'super secret!';

      loginCtrl.user.email = expectedEmail;
      loginCtrl.user.password = expectedPassword;

      loginCtrl.submit({}, true, true);

      expect(UserModel.register).toHaveBeenCalledWith({
        email: expectedEmail,
        password: expectedPassword
      });

      scope.$apply(); // promises are resolved/dispatched only on next $digest cycle

      expect(state.go).toHaveBeenCalledWith('boards');
      expect(loginCtrl.reset).toHaveBeenCalled();
      expect(loginCtrl.user).toEqual(createDefaultUserState());

      expect(UserModel.login).not.toHaveBeenCalled();
    });

  });

});
