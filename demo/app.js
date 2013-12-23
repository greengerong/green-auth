'use strict';

angular.module("green.auth.demo", ["green.auth"]).controller("demoController", ["$http", "authService", "$timeout", "$scope", function($http, authService, $timeout, $scope) {

  var setToken = function() {
      var token = $scope.token ? {
        "some-token-key": $scope.token
      } : {

      };
      authService.setToken(token);
    };

  $scope.requestSuccess = function() {
    setToken();

    console.log("start request(success):");
    $http.get("data.json?rn=" + Math.random()).success(function(data) {
      console.log("response with : ", data);
    });
  };

  $scope.requestError = function() {
    setToken();

    console.log("start request(error):");
    $http.get("data-error.json?rn=" + Math.random()).success(function(data) {
      console.log(data);
    });

    $scope.$on("green-auth-event:response-error", function(data, rejection) {
      $scope.isSuccess = false;
      $scope.msg = rejection.status + " " + rejection.data;

      $timeout(function() {
        $scope.msg = null;
      }, 10000);
    });

    $scope.$on("green-auth-event:response-success", function(data, response) {
      console.log(arguments,"success");
      $scope.isSuccess = true;
      $scope.msg = "Get " + response.config.url + " success!(" + angular.toJson(response.data) + ")";

      $timeout(function() {
        $scope.msg = null;
      }, 10000);
    });
  };

}]);