green-auth [![Build Status](https://travis-ci.org/greengerong/green-auth.png)](https://travis-ci.org/greengerong/green-auth)
===========================
Auth for angular and emit response status to rootscope. 

***
Run Test: grunt

Run server: grunt server

All of this, please make sure you install node and grunt-cli(npm install -g 
grunt-cli) and run npm intsall on project directory.

note: If you want to keep the token when user refresh the page, you can put the token to cookie, and set token when angular run phase:(Please make sure include angular-cookie in your page.)

        appModule.run(["authService", "$cookieStore", function(authService, $cookieStore){
            authService.setToken(JSON.stringify($cookieStore("token")))
        }]);
        