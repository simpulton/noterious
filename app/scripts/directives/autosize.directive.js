'use strict';

angular.module('noteriousApp')
    .directive('autosize', function () {
        var linker = function (scope, element, attrs) {
            $(element).autosize();

            scope.$watch(attrs.ngModel, function(val) {
                scope.model = val;
                $(element).trigger('autosize.resize');
            });
        };

        return {
            restrict: 'A',
            link: linker
        };
    });
