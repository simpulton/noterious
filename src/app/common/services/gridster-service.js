'use strict';

angular.module('noterious.common')
  .factory('Gridster', function () {
    var options = {
      columns: 12, // the width of the grid, in columns
      pushing: true, // whether to push other items out of the way on move or resize
      floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
      swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
      width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
      colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
      rowHeight: 80, // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
      margins: [10, 10], // the pixel distance between each widget
      outerMargin: true, // whether margins apply to outer edges of the grid
      isMobile: false, // stacks the grid items if true
      mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
      mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
      minColumns: 1, // the minimum columns the grid must have
      minRows: 1, // the minimum height of the grid, in rows
      maxRows: 100,
      defaultSizeX: 3, // the default width of a gridster item, if not specifed
      defaultSizeY: 2, // the default height of a gridster item, if not specified
      minSizeX: 3, // minimum column width of an item
      maxSizeX: null, // maximum column width of an item
      minSizeY: 2, // minumum row height of an item
      maxSizeY: null, // maximum row height of an item
      resizable: {
        enabled: true
      },
      draggable: {
        enabled: true, // whether dragging items is supported
        handle: '.my-class', // optional selector for resize handle
        start: function(event, $element, widget) {}, // optional callback fired when drag is started,
        drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
        stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
      }
    };

    function getOptions() {
      return options;
    }

    return {
      getOptions: getOptions
    };
  })
;