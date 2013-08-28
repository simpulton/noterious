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
    }));

    it('notes should be defined', function () {
        expect(scope.userExists()).toEqual(true);
        expect(scope.loading()).toEqual(false);
    });
});
