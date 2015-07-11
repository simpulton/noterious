angular.module('noterious')
  .directive('note', function(){
    var controller = function($scope) {
      var ctrl = this

      ctrl.loading = false;

      ctrl.updateNote = function (noteId, note) {
        ctrl.loading = true;

        $scope.update({noteId: noteId, note: note, isValid: true});

      };

      ctrl.deleteNote = function (noteId) {
        $scope.remove({noteId:noteId});
      };
    };

    return {
      scope: {
        noteId: '@',
        note:'=',
        remove:'&',
        update: '&'
      },
      templateUrl: 'app/notes/note.tmpl.html',
      controller: controller,
      controllerAs: 'ctrl'
    }
  })
;