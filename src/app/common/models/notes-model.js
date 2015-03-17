'use strict';

angular.module('noterious.common')
  .service('NotesModel', function ($http, $q, UserModel, ENDPOINT_URI) {
    var service = this;

    function extract(result) {
      return result.data;
    }

    function getUrl(boardId) {
      return ENDPOINT_URI + 'users/' + UserModel.getCurrentUser() + '/boards/' + boardId + '/notes.json';
    }

    function getUrlForId(boardId, noteId) {
      return ENDPOINT_URI + 'users/' + UserModel.getCurrentUser() + '/boards/' + boardId + '/notes/' + noteId + '.json'
    }

    service.all = function (boardId) {
      return $http.get(getUrl(boardId)).then(extract);
    };

    service.fetch = function (boardId, noteId) {
      return $http.get(getUrlForId(boardId, noteId)).then(extract);
    };

    service.create = function (boardId, note) {
      return $http.post(getUrl(boardId), note).then(extract);
    };

    service.update = function (boardId, noteId, note) {
      return $http.put(getUrlForId(boardId, noteId), note).then(extract);
    };

    service.destroy = function (boardId, noteId) {
      return $http.delete(getUrlForId(boardId, noteId)).then(extract);
    };
  });