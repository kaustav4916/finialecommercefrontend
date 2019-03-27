'use strict';

/************************************||
                                     **
controller of checkoutCtrl              **
                                     **
***************************************/
angular.module('eCommApp')
    .controller('checkoutCtrl', ['$state','$scope' ,'$http',function ($state,$scope,$http) {
        console.log('checkoutCtrl--------------calling11111111111111');
    $scope.person = {};
    $scope.personPayment ={};

    $scope.checkout = function(){

    	var data = {

    		'name'   : $scope.person.name ,
    		'email'  : $scope.person.email,
    		'mobile' : $scope.person.mobile,
    		'city'   : $scope.person.city,
    		'address': $scope.person.address,
    		'state'  : $scope.person.state,
    		'country': $scope.person.country,    		
    		'zip'    : $scope.person.zip 

    	}
        console.log('data',data)
    	
        function personDetailsAddress(personDetails)
        {
            $http.post('http://localhost:3000/api/v1/users/delivery',data)
            .then(function successCallback(sucess){
                console.log("Person Details Upadated  Sucessfull",success.data.data);
                $scope.person = sucess.data.data ;          
            },function errCallBack(response){
                alert("Some error occured");
            })
        }
    }

    $scope.Payment = function (){

        var personPaymentDetails = {

            'cardname' : $scope.personPayment.cardname,
            'creditcardnumber' : $scope.personPayment.creditcardnumber,
            'expMonth' : $scope.personPayment.expMonth,
            'expYear'  : $scope.personPayment.expYear,
            'cvv'      : $scope.personPayment.cvv
        }
        
        function personPayment ()
        {
           $http.post('')
           .then(function successCallback(success){
             console.log("Payment Sucessfull" ,success.data.data);
             $scope.personPayment = success.data.data;
           },function errCallBack(response){
              alert("Payment Failed");
           })
        }
    }  
        
}]);
