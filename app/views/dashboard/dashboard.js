'use strict';

/**************************************
controller of dashboard
***************************************/

angular.module('eCommApp')
  .controller('dashboardCtrl', ['$state','$http','$scope','$timeout','Upload',function ($state,$http,$scope,$timeout,Upload) {
    console.log('dashboardCtrl--------------calling11111111111111');
    $scope.catalogTable=[];
      function getDetailsOfUsers()
        {
          $http.post('http://localhost:3000/api/v1/users/catalog')
            .then(function successCallback(success){
              console.log("Get Product details post call: ", success.data.data);
              $scope.catalogTable = success.data.data;
        },function errorCallback(response) {
            alert("some error occured")
          });
        }
      
      console.log(getDetailsOfUsers());
    $scope.imagesSelected = [];
        
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.log = '';
    console.log('hiiii+',$scope.log);

    $scope.upload = function (files) {

      var obj = {
        'product_id': $scope.product_id        
      }

      //console.log("hooooo",obj);
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: 'http://localhost:3000/api/v1/users/uploadProductImage',
                    method : 'POST',
                    // fields: {
                    //     'username': $scope.username
                    // },;
                    // data  : { product_id : 1,
                    // file: file }
                    data : {
                      product_id : obj ,
                      file : file
                    }
                    
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                   // $scope.log = 'progress: ' + progressPercentage + '% ' +
                              //  evt.config.file.name + '\n' + $scope.log;
                }).success(function (data, status, headers, config) {
                    $timeout(function() {
                       // $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;

                    });
                });
            }
        }
      }
      console.log('hiiii+',$scope.log,$scope.upload); 
        
}]);
