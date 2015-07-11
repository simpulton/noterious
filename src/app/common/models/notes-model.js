'use strict';

angular.module('noterious.common')
  .service('NotesModel', function ($http, $q, Backand) {
    var service = this;

    function extract(result) {
      if(angular.isDefined(result.data.data))
        return result.data.data;
      else
        return result.data;
    }

    function getUrl() {
      return Backand.getApiUrl() + '/1/objects/notes';
    }

    function getUrlForId(noteId) {
      return Backand.getApiUrl() + '/1/objects/notes/' + noteId;
    }

    service.all = function () {
      return $http.get(getUrl()).then(extract);
    };

    service.fetch = function (noteId) {
      return $http.get(getUrlForId(noteId)).then(extract);
    };

    service.create = function (note) {
      return $http.post(getUrl(), note).then(extract);
    };

    service.update = function (noteId, note) {
      return $http.put(getUrlForId(noteId), note).then(extract);
    };

    service.destroy = function (noteId) {
      return $http.delete(getUrlForId(noteId)).then(extract);
    };
  });