'use strict';

describe('Controller: MainCtrl', function () {
    // load the controller's module
    beforeEach(module('noteriousApp'));

    var MainCtrl,
        scope,
        mockUserService;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        mockUserService = {
            userExists: function () {
                return true;
            },
            loading: function () {
                return false;
            }
        };
        MainCtrl = $controller('MainCtrl', {
            $scope: scope, UserService: mockUserService
        });

        spyOn(mockUserService, 'userExists').andCallThrough();
    }));

    it('userExists should be true', function () {
        expect(scope.userExists()).toEqual(true);
    });

    it('loading should be false', function () {
        expect(scope.loading()).toEqual(false);
    });

    it('userExists should have been called', function () {
        scope.userExists();
        expect(mockUserService.userExists).toHaveBeenCalled();
        expect(scope.userExists()).toEqual(true);
    });
});
