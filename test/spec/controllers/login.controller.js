'use strict';

describe('Controller: LoginCtrl', function () {
    // load the controller's module
    beforeEach(module('noteriousApp'));

    var LoginCtrl,
        scope,
        mockUserService;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        mockUserService = {
            register: function (email, password) {
                return true;
            },
            login: function (email, password) {
                return true;
            }
        };
        LoginCtrl = $controller('LoginCtrl', {
            $scope: scope, UserService: mockUserService
        });

        scope.loginForm = {
            $valid: true
        };

        spyOn(mockUserService, 'login').andCallThrough();
        spyOn(mockUserService, 'register').andCallThrough();

    }));

    it('should reset user when reset is called', function () {
        scope.user.email = 'test@test.com';
        expect(scope.user.email).toEqual('test@test.com');
        scope.reset();
        expect(scope.user).toEqual({email: '',password: '',register: false});
    });

    it('should register when submit is called with register true parameter', function () {
        scope.submit('test@test.com', 'insecure', true);
        expect(mockUserService.register).toHaveBeenCalled();
    });

    it('should login when submit is called with register false parameter', function () {
        scope.submit('test@test.com', 'insecure', false);
        expect(mockUserService.login).toHaveBeenCalled();
    });

    it('should not login or register if form is invalid', function () {
        scope.loginForm.$valid = false;
        scope.submit('test@test.com', 'insecure', false);
        expect(mockUserService.login).not.toHaveBeenCalled();
        scope.submit('test@test.com', 'insecure', true);
        expect(mockUserService.register).not.toHaveBeenCalled();
    });
});