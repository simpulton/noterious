'use strict';

angular.module('noterious.common')
  .factory('NotesModel', function ($http, $q, UserModel, ENDPOINT_URI) {
    var service = this,
      notes;

    function extract(result) {
      return result.data;
    }

    function cacheNotes(result) {
      notes = extract(result);
      return notes;
    }

    function getUrl(boardId) {
      return ENDPOINT_URI + 'users/' + UserModel.getCurrentUserId() + '/boards/' + boardId + '/notes.json';
    }

    function getUrlForId(boardId, noteId) {
      return ENDPOINT_URI + 'users/' + UserModel.getCurrentUserId() + '/boards/' + boardId + '/notes/' + noteId + '.json'
    }

    service.all = function (boardId) {
      var deferred = $q.defer();

      if (notes) {
        deferred.resolve(notes)
      } else {
        $http.get(getUrl(boardId)).then(function (notes) {
          deferred.resolve(cacheNotes(notes));
        });
      }

      return deferred.promise;
    };

    service.fetch = function (boardId, noteId) {
      return $http.get(getUrlForId(boardId, noteId));
    };

    service.create = function (boardId, note) {
      return $http.post(getUrl(boardId), note);
    };

    service.update = function (boardId, noteId, note) {
      return $http.put(getUrlForId(boardId, noteId), note);
    };

    service.destroy = function (boardId, noteId) {
      return $http.delete(getUrlForId(boardId, noteId));
    };
  });