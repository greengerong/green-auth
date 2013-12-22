'use strict';

angular.module("green.auth", []).factory("authInterceptor", ["authService", function(authService) {
  return {
    "request": function(config) {
      config.headers = config.headers || {};
      var token = authService.getToken() || {};
      angular.forEach(token, function(value, key) {
        config.headers[key] = value;
      });
      return config;
    }
  };
}]).factory("responseInterceptor", ["$rootScope", function($rootScope) {
  return {
    "responseError": function(rejection) {
      $rootScope.$emit("green-auth-event:response-error", rejection)
      return rejection;
    },
    "response": function(response) {
      $rootScope.$emit("green-auth-event:response-success", response)
      return response;
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