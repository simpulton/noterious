angular.module('noterious')
  .directive('note', function(NotesModel){
    var controller = function($scope) {
      var ctrl = this

      ctrl.loading = false;

      ctrl.updateNote = function (noteId, note) {
        ctrl.loading = true;

        NotesModel.update(noteId, note)
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
        $scope.remove({noteId:noteId});
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
      controllerAs: 'ctrl'
    }
  })
;