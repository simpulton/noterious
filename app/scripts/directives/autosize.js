'use strict';

angular.module('noteriousApp')
    .directive('autosize', function () {
        var linker = function (scope, element, attrs) {
            $(element).autosize();
        }

        return {
            restrict: 'A',
            link: linker
        };
    });
