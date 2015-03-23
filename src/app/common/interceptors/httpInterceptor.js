(function() {
  'use strict';

  function httpInterceptor($cookieStore, $q, $location) {
    return {
        request: function(config) {
          if ($cookieStore.get('backand_token')) {
              config.headers['Authorization'] = $cookieStore.get('backand_token');
          }
          return config;
      },
      requestError: function(rejection) {
        return $q.reject(rejection);
      },
      response: function(response) {
        return response;
      },
      responseError: function(rejection) {
        //if not sign in screen :
        if ((rejection.config.url+"").indexOf('token') === -1){
          if (rejection.status === 401) {
            $cookieStore.remove('backand_token');
            $location.path('/login');
            return $q.reject(rejection);
          }
        }
        return $q.reject(rejection);
      }
    };
  }

  angular.module('noterious.common', [])
    .factory('httpInterceptor', ['$cookieStore','$q', '$location', httpInterceptor]);
})();
