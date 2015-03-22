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

  var expectRequestForViewTemplate = function(templateQueryPath) {
    $httpBackend.whenGET(templateQueryPath).respond('{}');

    $httpBackend.flush();

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  };

  var expectRequestForLoginViewTemplate =  function(){
    expectRequestForViewTemplate("app/login/login.tmpl.html");
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
      spyOn(state, 'go');
      spyOn(loginCtrl, 'reset').and.callThrough();
      expectRequestForLoginViewTemplate();

      var expectedEmail = 'test.user@onehungrymind.com';
      var expectedPassword = 'super secret!';

      loginCtrl.user.email = expectedEmail;
      loginCtrl.user.password = expectedPassword;

      loginCtrl.submit({ /* ignored */ }, true, true);

      expect(UserModel.register).toHaveBeenCalledWith({
        email: expectedEmail,
        password: expectedPassword
      });

      scope.$apply(); // promises are resolved/dispatched only on next $digest cycle

      expect(state.go).toHaveBeenCalledWith('boards');
      expect(loginCtrl.reset).toHaveBeenCalled();
      expect(loginCtrl.user).toEqual(createDefaultUserState());
      expect(loginCtrl.loading).toBeFalsy();

      expect(UserModel.login).not.toHaveBeenCalled();
    });

    it('should login user when valid and not registering', function () {
      spyOn(state, 'go');
      spyOn(loginCtrl, 'reset').and.callThrough();
      expectRequestForLoginViewTemplate();

      var expectedEmail = 'test.user@onehungrymind.com';
      var expectedPassword = 'super secret!';

      loginCtrl.user.email = expectedEmail;
      loginCtrl.user.password = expectedPassword;

      loginCtrl.submit({ /* ignored */ }, true, false);

      expect(UserModel.login).toHaveBeenCalledWith({
        email: expectedEmail,
        password: expectedPassword
      });

      scope.$apply(); // promises are resolved/dispatched only on next $digest cycle

      expect(state.go).toHaveBeenCalledWith('boards');
      expect(loginCtrl.reset).toHaveBeenCalled();
      expect(loginCtrl.user).toEqual(createDefaultUserState());
      expect(loginCtrl.loading).toBeFalsy();

      expect(UserModel.register).not.toHaveBeenCalled();
    });

    it('should not register nor login user when invalid', function () {
      spyOn(state, 'go');
      spyOn(loginCtrl, 'reset');
      expectRequestForLoginViewTemplate();

      loginCtrl.submit({}, false, true);

      expect(UserModel.register).not.toHaveBeenCalled();

      expect(state.go).not.toHaveBeenCalled();
      expect(loginCtrl.reset).not.toHaveBeenCalled();
      expect(UserModel.login).not.toHaveBeenCalled();

      expect(loginCtrl.loading).toBeFalsy();
    });

  });

});
