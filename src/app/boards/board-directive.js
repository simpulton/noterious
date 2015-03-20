angular.module('noterious')
  .directive('board', function(BoardsModel){
    var controller = function($scope) {
      var ctrl = this;

      ctrl.loading = false;

      ctrl.updateBoard = function (boardId, board) {
        ctrl.loading = true;
        BoardsModel.update(boardId, board)
          .then(function (result) {
            console.log('result', result);
          })
          .catch(function (reason) {
            //
          })
          .finally(function () {
            ctrl.loading = false;
          });
      };

      ctrl.deleteBoard = function (boardId) {
        $scope.remove({boardId:boardId});
      };
    };

    return {
      scope: {
        boardId:'@',
        board:'=',
        remove:'&'
      },
      templateUrl: 'app/boards/board.tmpl.html',
      controller: controller,
      controllerAs: 'ctrl'
    }
  })
;