'use strict';

angular.module('noteriousApp')
    .directive('editInPlace', function () {

        return {
            restrict: 'A',
            controller: function ($scope) {
                $scope.editorEnabled = false;

                $scope.enableEditor = function () {
                    $scope.editorEnabled = true;
                };

                $scope.disableEditor = function () {
                    $scope.editorEnabled = false;
                };

            },
            scope: { content: '=' }
        };
    });
