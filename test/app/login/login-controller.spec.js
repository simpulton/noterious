'use strict';

describe('Controller: LoginCtrl', function () {

  beforeEach(module('noterious'));
  beforeEach(module('noteriousTmpl'));

  var loginCtrl;
  var mockUserModel;
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

  var resolvePromises = function (){
    // promises are resolved/dispatched only on next $digest cycle
    scope.$apply();
  };

  beforeEach(inject(function ($controller, $state, $q, $rootScope, _$httpBackend_) {
    mockUserModel = {
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

    spyOn(mockUserModel, 'register').and.callThrough();
    spyOn(mockUserModel, 'login').and.callThrough();

    state = $state;
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;

    loginCtrl = $controller('LoginCtrl', {
      UserModel: mockUserModel,
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

    it('should register and login user when valid and registering', function () {
      spyOn(state, 'go');
      spyOn(loginCtrl, 'reset').and.callThrough();

      var expectedEmail = 'test.user@onehungrymind.com';
      var expectedPassword = 'super secret!';

      loginCtrl.user.email = expectedEmail;
      loginCtrl.user.password = expectedPassword;

      loginCtrl.submit({ /* ignored */ }, true, true);

      expect(mockUserModel.register).toHaveBeenCalledWith({
        email: expectedEmail,
        password: expectedPassword
      });

      resolvePromises();

      expect(state.go).toHaveBeenCalledWith('boards');
      expect(loginCtrl.reset).toHaveBeenCalled();
      expect(loginCtrl.user).toEqual(createDefaultUserState());
      expect(loginCtrl.loading).toBeFalsy();

      expect(mockUserModel.login).toHaveBeenCalled();
    });

    it('should login user when valid and not registering', function () {
      spyOn(state, 'go');
      spyOn(loginCtrl, 'reset').and.callThrough();

      var expectedEmail = 'test.user@onehungrymind.com';
      var expectedPassword = 'super secret!';

      loginCtrl.user.email = expectedEmail;
      loginCtrl.user.password = expectedPassword;

      loginCtrl.submit({ /* ignored */ }, true, false);

      expect(mockUserModel.login).toHaveBeenCalledWith({
        email: expectedEmail,
        password: expectedPassword
      });

      resolvePromises();

      expect(state.go).toHaveBeenCalledWith('boards');
      expect(loginCtrl.reset).toHaveBeenCalled();
      expect(loginCtrl.user).toEqual(createDefaultUserState());
      expect(loginCtrl.loading).toBeFalsy();

      expect(mockUserModel.register).not.toHaveBeenCalled();
    });

    it('should not register nor login user when invalid', function () {
      spyOn(state, 'go');
      spyOn(loginCtrl, 'reset');

      loginCtrl.submit({}, false, true);

      expect(mockUserModel.register).not.toHaveBeenCalled();

      expect(state.go).not.toHaveBeenCalled();
      expect(loginCtrl.reset).not.toHaveBeenCalled();
      expect(mockUserModel.login).not.toHaveBeenCalled();

      expect(loginCtrl.loading).toBeFalsy();
    });

  });

});
