'use strict';
///////////////********************************************************************************//
(function () {                                                                                //
    angular.module('eCommApp', [                                                             //
        'ui.router',
        'ngStorage',
        'ngFileUpload'

                       // Routing                                            //
//****************************** ui router*************************************************//
///////////////////////**********Bootstrap************************************************//

    ])
    .run(['$window', '$timeout', '$location','$localStorage', '$rootScope', '$state', '$http',function ($localStorage,$window, $timeout, $location, $rootScope, $state, $http) {

           
		$http.defaults.headers.common.Authorization = ' Bearer ' + window.sessionStorage.accessToken;
			
			 //editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
        $rootScope.isLogged = false;
        $rootScope.loginVar = false;
        $rootScope.logout = function(){
		    $localStorage.sessionStorage.accessToken = "";
		    $rootScope.isLogged=false;
		    $localStorage.location= '#/';
			    return function (req, res, next) {
			      req.logout();
			      delete req.session;
			      next();
			    };
            }
            $rootScope.$on('$locationChangeStart',function(event,toState){
            	console.log($localStorage.sessionStorage.accessToken)
			    var reload = function(){
			      $http({

			        method: 'POST',
			        url: 'http://localhost:3000/api/v1/users/checkLogin',
			      }).then(function successCallback(response) {
			          console.log(response.data)
			          if(response.data.login===true){
			            $rootScope.isLogged=true;
			          }else{
			            $rootScope.isLogged=false;
			            $localStorage.location= '#/'
			          }
			        }, function errorCallback(response) {
			            // called asynchronously if an error occurs
			            // or server returns response with an error status.
			          alert("some error occurred. Check the console.");
			          console.log(response);
			        });
			      }
			    reload();
			});
			// $window.fbAsyncInit = function() {
   //      	    FB.init({ 
   //      	      appId: '{2515337455156754}',
   //      	      autoLogAppEvents : true,
   //                xfbml: true,
   //                cookie:true,
   //                version: 'v3.2'
   //      	    });
   //      	    FB.AppEvents.logPageView();   
   //      	};
   //      	(function(d, s, id) {
   //            var js, fjs = d.getElementsByTagName(s)[0];
   //          if (d.getElementById(id)) return;
   //          js = d.createElement(s); js.id = id;
   //          js.src = "https://connect.facebook.net/en_US/sdk.js";
   //          fjs.parentNode.insertBefore(js, fjs);
   //  }(document, 'script', 'facebook-jssdk'));
    }]);
        
})();
