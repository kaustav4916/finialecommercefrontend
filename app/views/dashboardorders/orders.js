
'use strict';

/************************************||
                                     **
controller of OrderCtrl              **
                                     **
***************************************/
angular.module('eCommApp')
    .controller('OrderCtrl', ['$state','$scope' ,'$http','$timeout',function ($state,$scope,$http,$timeout) {
        console.log('OrderCtrl--------------calling11111111111111');

        $scope.catalogTable = [];
        $scope.product = {};
        function getDetailsOfUsers()

            {
                $http.post('http://localhost:3000/api/v1/users/catalog')
                    .then(function successCallback(success){
                        console.log("Get Product details: ", success.data.data);
                        $scope.catalogTable = success.data.data;
                    }, function errorCallback(response) {
                      alert("some error occured")
                });
            }
	    $scope.editProduct = function(data){

	        var data = {
	                 
	            'product_id' :  $scope.product.product_id,
	        	'product_desc' :  $scope.product.product_desc,
	        	'product_minnimum_order' :  $scope.product.product_minnimum_order,
	        	'product_price' : $scope.product.product_price ,
	        	'product_Quantity_Available' : $scope.product.product_Quantity_Available,
	        	'product_imageUrl' : $scope.product.product_imageUrl
	        }

	        console.log(data)
		        $http.post('http://localhost:3000/api/v1/users/updateproduct', data)
		        	.then(function successCallback(success){
		        		console.log("data edited ",success)
		        	},function errorCallback(response){
		        		alert("some error occured")
		        })
	    }
	    $scope.addProduct = function(data){

	        var data = {

	        	'product_id' :  $scope.product.product_id,
	        	'product_desc' :  $scope.product.product_desc,
	        	'product_minnimum_order' :  $scope.product.product_minnimum_order,
	        	'product_price' : $scope.product.product_price ,
	        	'product_Quantity_Available' : $scope.product.product_Quantity_Available,
	        	'product_imageUrl' : $scope.product.product_imageUrl
	        }
	        console.log(data);
		        $http.post('http://localhost:3000/api/v1/users/addproduct',data)
		        	.then(function successCallback(success){
		        		console.log("data addProduct",success)
		        	},function errorCallback(response){
		        		alert("some error occured")
		        })
	    }

	    $scope.deleteProduct = function(data){

	        var data = {
	        	'product_id' : $scope.product.product_id
	        }
	        console.log(data);
		        $http.post('http://localhost:3000/api/v1/users/deleteproduct',data)
		        	.then(function successCallback(success){
		        		console.log("data deleteproduct",success)
		        	},function errorCallback(response){
		        		alert("some error occured")
		        })
	    }
	    setTimeout(function(){
	      window.location='#/orders'
	    }, 1000)
}]);
