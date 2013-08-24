'use strict';

angular.module('noteriousApp')
    .controller('MainCtrl', function ($scope, NoteriousService) {
        $scope.notes = [];

        NoteriousService.login('simpul@gmail.com', 'insecure');
    });
