angular.module('noterious')
  .directive('note', function(NotesModel, $stateParams){
    var controller = function($scope) {
      var ctrl = this,
        boardId = $stateParams.boardId;

      console.log('ctrl', ctrl);
      
      ctrl.loading = false;

      ctrl.updateNote = function (noteId, note) {
        ctrl.loading = true;
        
        NotesModel.update(boardId, noteId, note)
          .then(function (result) {
            //
          })
          .catch(function (reason) {
            //
          })
          .finally(function() {
            ctrl.loading = false;
          });
      };

      ctrl.deleteNote = function (noteId) {
        ctrl.remove({noteId:noteId});
      };
    };

    return {
      scope: {
        noteId: '@',
        note:'=',
        remove:'&'
      },
      templateUrl: 'app/notes/note.tmpl.html',
      controller: controller,
      controllerAs: 'ctrl',
      bindToController: true
    }
  })
;