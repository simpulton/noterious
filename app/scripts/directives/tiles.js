'use strict';

angular.module('noteriousApp')
    .directive('tiles', function ($window, $timeout) {
        var linker = function (scope, element, attrs) {
            var colCount = 0;
            var colWidth = 300;
            var margin = 10;
            var spaceLeft = 0;
            var windowWidth = 0;
            var blocks = [];
            var paddingTop = 60;

            function setupBlocks() {
                windowWidth = $(window).width();
                blocks = [];

                // Calculate the margin so the blocks are evenly spaced within the window
                colCount = Math.floor(windowWidth / (colWidth + margin * 2));
                spaceLeft = (windowWidth - ((colWidth * colCount) + (margin * (colCount - 1)))) / 2;

                for (var i = 0; i < colCount; i++) {
                    blocks.push(margin);
                }
                positionBlocks();
            }

            function positionBlocks() {
                $('.block').each(function (i) {
                    var min = blocks.min();
                    var index = blocks.indexOf(min);
                    var leftPos = margin + (index * (colWidth + margin));
                    $(this).css({
                        'left': (leftPos + spaceLeft) + 'px',
                        'top': (min + paddingTop) + 'px'
                    });
                    blocks[index] = min + $(this).outerHeight() + margin;
                });
            }

            $timeout(setupBlocks, 100);

            $(window).resize(setupBlocks);
        }

        return {
            restrict: 'A',
            link: linker
        };
    });


