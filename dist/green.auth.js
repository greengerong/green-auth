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
}])
.constant("tokenCacheFactory", {
  "jsObject": function(){
    var tokenStorage;
      return {
     save : function(token) {
        tokenStorage = angular.copy(token);
        return tokenStorage;
      },
    get : function() {
      return tokenStorage;
    },
    remove : function(){
      tokenStorage = null;
    }
   }
  },
  "localStorage": function(storageKey){
      return {
     save : function(token) {
        window.localStorage.setItem(storageKey, angular.toJson(token));
        return token;
      },
     get : function() {
      var tokenStr = window.localStorage.getItem(storageKey);
      return tokenStr ? angular.fromJson(tokenStr) : null;
    },
    remove : function(){
      window.localStorage.removeItem(storageKey);
    }
   }
  },
   "sessionStorage": function(storageKey){
      return {
     save : function(token) {
        window.sessionStorage.setItem(storageKey, angular.toJson(token));
        return token;
      },
     get : function() {
      var tokenStr = window.sessionStorage.getItem(storageKey);
      return tokenStr ? angular.fromJson(tokenStr) : null;
    },
    remove : function(){
      window.sessionStorage.removeItem(storageKey);
    }
   }
  },
}).provider('authService', function() {
  var tokenCache, self = this;

  self.setTokenCache = function(cache){
    tokenCache = cache;
    return self;
  };

  self.$get = ['tokenCacheFactory', function(tokenCacheFactory){
    tokenCache = tokenCache || tokenCacheFactory.jsObject();

    return {
      setToken : function(token) {
        return tokenCache.save(token);
     },
     getToken : function() {
        return tokenCache.get();
     },
     removeToken : function(){
      return tokenCache.remove();
     }
    };
   
  }];
}).config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor', "responseInterceptor");
}])
