'use strict';

angular.module("green.auth.demo", ["green.auth"]).controller("demoController", ["$http", "authService", "$rootScope", "$timeout", function($http, authService, $rootScope, $timeout) {
  var vm = this;

  var setToken = function() {
      var token = vm.token ? {
        "some-token-key": vm.token
      } : {

      };
      authService.setToken(token);
    };

  vm.requestSuccess = function() {
    setToken();

    console.log("start request(success):");
    $http.get("data.json?rn=" + Math.random()).success(function(data) {
      console.log("response with : ", data);
    });
  };

  vm.requestError = function() {
    setToken();

    console.log("start request(error):");
    $http.get("data-error.json?rn=" + Math.random()).success(function(data) {
      console.log(data);
    });

    $rootScope.$on("green-auth-event:response-error", function(data, rejection) {
      vm.isSuccess = false;
      vm.msg = rejection.status + " " + rejection.data;

      $timeout(function() {
        vm.msg = null;
      }, 3000);
    });

    $rootScope.$on("green-auth-event:response-success", function(data, response) {
      vm.isSuccess = true;
      console.log(response, "");
      vm.msg = "Get " + response.config.url + " success!(" + angular.toJson(response.data) + ")";

      $timeout(function() {
        vm.msg = null;
      }, 3000);
    });
  };

  return vm;
}]);