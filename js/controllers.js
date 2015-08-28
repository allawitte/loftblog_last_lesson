'use strict';

/* Controllers */
var phonecatApp = angular.module('phonecatApp', ['ngRoute', 'ngResource']);
phonecatApp.config([
  '$routeProvider', '$locationProvider',
  function($routeProvide, $locationProvider){
    $routeProvide
        .when('/',{
          templateUrl:'template/home.html',
          controller:'PhoneListCtrl'
        })
        .when('/about',{
          templateUrl:'template/about.html',
          controller:'AboutCtrl'
        })
        .when('/contact',{
          templateUrl:'template/contact.html',
          controller:'ContactCtrl'
        })
        .when('/phones/:phoneId', {
          templateUrl:'template/phone-details.html',
          controller:'PhoneDetailsCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
  }
]);
 //Filter

phonecatApp.filter('checkmark', function(){
  return function(input) {
     return input ? '\u2713' : '\u2718';
  } 
});

/* factory */
/*
phonecatApp.factory('Phone', [
 '$resource', function($resource){
  return $resource('phones/:phoneId.:format', {
    phoneId : 'phones',
    format : 'json',
    apiKey: 'someAPIkey'
  });
}] );
*/
/* Factory */
phonecatApp.factory('Phone', [
  '$resource', function($resource) {
    return $resource('phones/:phoneId.:format', {
      phoneId: 'phones',
      format: 'json',
      apiKey: 'someKeyThis'
      /* http://localhost:8888/phones/phones.json?apiKey=someKeyThis */
    }, {
      // action: {method: <?>, params: <?>, isArray: <?>, ...}
      update: {method: 'PUT', params: {phoneId: '@phone'}, isArray: true}
    });
    //Phone.update(params, successcb, errorcb);
  }
]);


phonecatApp.controller('PhoneListCtrl',[
  '$scope','$http', '$location', 'Phone',
  function($scope, $http, $location, Phone) {

    Phone.query({phoneId: 'phones'}, function(data) {
      $scope.phones = data;
    });

    //Phone.query(params, successcb, errorcb)

    //Phone.get(params, successcb, errorcb)

    //Phone.save(params, payloadData, successcb, errorcb)

    //Phone.delete(params, successcb, errorcb)

  }
]);


/*
phonecatApp.controller('PhoneListCtrl',[
  '$scope','$http', '$location','Phone', 
    function($scope, $http, $location, Phone) {
       
       Phone.query({phoneId: 'phones'}, function(data) {
      $scope.phones = data;
   });
    
  }
]);
*/

//About controller
phonecatApp.controller('AboutCtrl',['$scope','$http', '$location', function($scope, $http, $location) {
  }]);
//Contact controller
phonecatApp.controller('ContactCtrl',['$scope','$http', '$location', function($scope, $http, $location) {
  }]);
//Phone-details controller
phonecatApp.controller('PhoneDetailsCtrl',['$scope','$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
  $scope.phoneId = $routeParams.phoneId;
  var url = 'phones/'+$routeParams.phoneId+'.json';

  $http.get(url).success(function(data){
    $scope.phone = data;
    $scope.mainImageUrl = data.images[0];

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  });
  

    
  }]);

