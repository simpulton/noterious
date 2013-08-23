'use strict';

angular.module('noteriousApp')
    .directive('editInPlace', function () {
        var controller = function($scope) {
            $scope.editorEnabled = false;

            $scope.enableEditor = function () {
                $scope.editorEnabled = true;
            };

            $scope.disableEditor = function () {
                $scope.editorEnabled = false;
            };

        };

        return {
            restrict: 'A',
            controller: controller,
            scope: { content:'=' }
        };
    });
