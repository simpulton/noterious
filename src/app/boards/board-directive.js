angular.module('noterious')
  .directive('simpleBoard', function(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/boards/board-simple.tmpl.html'
    }
  })
  .directive('board', function(BoardsModel){
    var controller = function() {
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
        ctrl.remove({boardId:boardId});
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
      controllerAs: 'ctrl',
      bindToController: true
    }
  })
;