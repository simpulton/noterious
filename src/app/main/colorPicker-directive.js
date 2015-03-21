angular.module('noterious')
  .directive('colorPicker', function(){

    return {
      restrict : 'E',
      scope: true,
      replace: true,
      templateUrl: 'app/main/colorpicker.html',
      link : function (scope, element, attrs) {
        scope.collapsed = true;
      }
    }
  })
;
