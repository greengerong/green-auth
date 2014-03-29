/******************************************
 *                                        *
 * Auth: green gerong                     *
 * Date: 2014                             *
 * blog: http://greengerong.github.io/    *
 * github: https://github.com/greengerong *
 *                                        *
 ******************************************/
 
'use strict';

angular.module("green.auth", []).factory("authInterceptor", ["$q", "authService", function($q, authService) {
  return {
    "request": function(config) {
      config.headers = config.headers || {};
      var token = authService.getToken() || {};
      angular.forEach(token, function(value, key) {
        if(!config.headers[key]) {
          config.headers[key] = value;
        }
      });
      return config || $q.when(config);
    }
  };
}]).factory("responseInterceptor", ["$q", "$rootScope", function($q, $rootScope) {
  return {
    "responseError": function(rejection) {
      $rootScope.$broadcast("green-auth-event:response-error", rejection)
      return $q.reject(rejection);;
    },
    "response": function(response) {
      $rootScope.$broadcast("green-auth-event:response-success", response)
      return response || $q.when(response);
    }
  }
}]).service('authService', [function() {
  var tokenCache, self = this;

  self.setToken = function(token) {
    tokenCache = angular.copy(token);
    return self;
  };

  self.getToken = function() {
    return tokenCache;
  };

}]).config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor', "responseInterceptor");
}])
