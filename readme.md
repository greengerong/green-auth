green-auth [![Build Status](https://travis-ci.org/greengerong/green-auth.png)](https://travis-ci.org/greengerong/green-auth)
===========================
Auth for angular and broadcast response status from rootscope. 

***
Run Test: grunt

Run demo server: grunt server

All of this, please make sure you install node and grunt-cli(npm install -g 
grunt-cli) and run npm intsall, bower install on project directory.

You can download from dist or bower install:

	bower install green-auth --save

note: If you want to keep the token when user refresh the page, you put one of storage :

        angular.module("green.auth.demo", ["green.auth", "ngCookies"])
  		.config(["tokenCacheFactory", "authServiceProvider",
    		function(tokenCacheFactory, authServiceProvider) {
		      //TODO: you can define your token cache. default is in js object.
		      //tokenCacheFactory inlcude : jsObject, localStorage, sessionStorage, cookie
		      authServiceProvider.setCacheFactory(tokenCacheFactory.cookie("my-customer-stroage-token-key"));
    		}
  		]);



If you want to use cookie cache factory, make sure include angular-cookies and module depend on ngCookie module.
        

