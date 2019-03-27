'use strict';

/************************************||
                                     **
controller of homehtml               **
                                     **
***************************************/

angular.module('eCommApp')
  .controller('homeCtrl', ['$rootScope','$state','$scope','$http','$window','$timeout',function ($rootScope, $state,$scope, $http ,$window, $timeout) {
    console.log('homeCtrl--------------calling11111111111111');
  if($rootScope.isLogged == false){
    window.location="#/";
  }
  else
  {
    $rootScope.isLogged == true;
    window.location="#/dashboard";
  }
    //  $scope.token;
  $scope.admin_email;
  $scope.admin_password;
  $scope.onSelect = function(admin_email,admin_password){
    	console.log(admin_email,admin_password)
      console.log("User Name: ", $scope.admin_email, "Password: ",$scope.admin_password);
        var mydata = {
          admin_email : $scope.admin_email,
          admin_password : $scope.admin_password
        }
        $http({
          async: true,
            method: 'POST',
            url: 'http://localhost:3000/api/v1/users/login',
            //window.sessionStorage.token = data.token,
            data : mydata
        }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        if(response.status==200){
          console.log({response});
          $rootScope.isLogged=true;
          //not replacings
          setTimeout(function(){
          window.sessionStorage.accessToken = response.data.token;
        }, 1000)
          //window.sessionStorage.accessToken = response.data.token;
          $("#loginModal").modal("hide");
        //  console.log($("#loginModal"));
        setTimeout(function(){
          window.location='#/dashboard'
        }, 1000)

          // window.sessionStorage.access_token = response.body.token;
        }
        else{
          alert('login password or username incorrect')
        }
        },
        function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("some error occurred. Check the console.");
            console.log(response);
        });
  }
  //////////frontendview catalog////////////////
  //   $scope.$watch('productCatalog', function(value) {
  //   $scope.productCatalog = [];
  // });
  $scope.productCatalog = [];
    $scope.productCatalogView = {};
  function catalogview(){
    $http.post('http://localhost:3000/api/v1/users/catalogview')
      .then(function successCallback(success){
        console.log('Get Product Catalog:',success.data.data);
        $scope.productCatalog = success.data.data;
    },function errorCallback(response){
      alert("Some error occurred")
    });
  }
  console.log(catalogview());
  /////////////////cart logic//////////////////
  $scope.cart = [];
  
    var findItemById = function(products, id) {
      return _.find(products, function(product) {
        return product.id === id;
      });
    };  

    $scope.getCost = function(product) {
      return product.qty * product.price;
    };

    $scope.addItem = function(productToAdd) {
      var found = findItemById($scope.cart, productToAdd.id);
      if (found) {
        found.qty += productToAdd.qty;
      }
      else {
        $scope.cart.push(angular.copy(productToAdd));}
    }; 

    $scope.getTotal = function() {
      var total =  _.reduce($scope.cart, function(sum, product) {
        return sum + $scope.getCost(product);
      }, 0);
      console.log('total: ' + total);
      return total;
    };   

    $scope.clearCart = function() {
      $scope.cart.length = 0;
    }; 

    $scope.removeproduct = function(product) {
      var index = $scope.cart.indexOf(product);
      $scope.cart.splice(index, 1);
    };

    /////////////////end of cart logic//////////

    ////////////////googleapi//////////////////
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
    //////////////////////////////////////////

  $scope.onSignIn = function(googleUser){

    var profile = googleUser.getBasicProfile();
    console.log('profilre',profile);
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    var name = profile.getName();
    console.log('Name: ' + name);
    var getImageUrl = profile.getImageUrl();
    console.log('getImageUrl',getImageUrl);
     //console.log('Image URL: ' + profile.getImageUrl());
    var email = profile.getEmail();
    console.log('Email: ' + email); // This is null if the 'email' scope is not present.

    }    
}]);
