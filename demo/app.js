'use strict';

angular.module("green.auth.demo", ["green.auth", "ngCookies"])
    .config(["tokenCacheFactory", "authServiceProvider",
        function(tokenCacheFactory, authServiceProvider) {
            //TODO: you can define your token cache. default is in js object.
            //tokenCacheFactory inlcude : jsObject, localStorage, sessionStorage, cookie
            authServiceProvider.setCacheFactory(tokenCacheFactory.localStorage("my-customer-stroage-token-key"));
        }
    ])
    .directive("serverErrorPanel", [function() {
        return {
            restrict: "EA",
            templateUrl: "server-error-panel.html",
            replace: true,
            controller: ["$scope", "$timeout", function($scope, $timeout) {
                var disappear = function() {
                    $timeout(function() {
                        $scope.msg = "";
                    }, 3000);
                };

                $scope.$on("green-auth-event:response-error", function(data, rejection) {
                    $scope.isSuccess = false;
                    $scope.msg = rejection.status + " " + rejection.data;
                    // disappear();

                });

                $scope.$on("green-auth-event:response-success", function(data, response) {
                    console.log(arguments, "success");
                    $scope.isSuccess = true;
                    $scope.msg = "Get " + response.config.url + " success!(" + angular.toJson(response.data) + ")";
                    // disappear();
                });
            }]

        };
    }])

.controller("demoController", ["$http", "authService", "$scope",
    function($http, authService, $scope) {

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

        };

    }
]);
