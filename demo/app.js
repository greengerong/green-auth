'use strict';

angular.module("green.auth.demo", ["green.auth"])
.config(["tokenCacheFactory", "authServiceProvider", function(tokenCacheFactory, authServiceProvider){
   //TODO: you can define your token cache. default is in js object.
    //authServiceProvider.setTokenCache(tokenCacheFactory.sessionStorage("my-customer-stroage-token-key"));
}])
.controller("demoController", ["$http", "authService", "$timeout", "$scope", function($http, authService, $timeout, $scope) {

  $scope.setToken = function() {
      var token = $scope.token ? {
        "some-token-key": $scope.token
      } : {};
      authService.setToken(token);
    };

  $scope.requestSuccess = function() {
    console.log("start request(success):");
    $http.get("data.json?rn=" + Math.random()).success(function(data) {
      console.log("response with : ", data);
    }).error(function() {
      console.log("error:", arguments);
    });
  };

  $scope.requestError = function() {
    console.log("start request(error):");
    $http.get("data-error.json?rn=" + Math.random()).success(function(data) {
      console.log(data);
    }).error(function() {
      console.log("error:", arguments);
    });

    $scope.$on("green-auth-event:response-error", function(data, rejection) {
      $scope.isSuccess = false;
      $scope.msg = rejection.status + " " + rejection.data;

      $timeout(function() {
        $scope.msg = null;
      }, 10000);
    });

    $scope.$on("green-auth-event:response-success", function(data, response) {
      console.log(arguments, "success");
      $scope.isSuccess = true;
      $scope.msg = "Get " + response.config.url + " success!(" + angular.toJson(response.data) + ")";

      $timeout(function() {
        $scope.msg = null;
      }, 10000);
    });
  };

}]);