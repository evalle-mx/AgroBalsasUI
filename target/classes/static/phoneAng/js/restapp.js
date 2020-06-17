'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'phoneAng/views/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'phoneAng/views/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);



/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers
.controller('PhoneListCtrl', ['$scope', 'RestRs',
                          	function($scope, RestRs) {
                          		var pUriCode='PHONES.G';
                          		var pJson='{"code":"phones"}';
                              	$scope.phones = [];
                              	
                              	var successFn = function(result){
                              		console.log('result: ', result );
                              		$scope.phones = result;
                              		$scope.orderProp = 'age';
                                  	console.log('$scope.phones: ', $scope.phones );
                              	};
                                  var failFn = function (result) {
                                  	alert('Failed Service');
                                  };    	
                              	
                              	RestRs.getJsonResp(pUriCode, pJson).success(successFn).error(failFn);   	
                              	
                           }])
                          .controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'RestRs',
                                 function($scope, $routeParams, RestRs) {
                          		console.log('PhoneDetailCtrl');
                          			var pUriCode='PHONES.G';
                          			var pJson='{"code":"'+$routeParams.phoneId+'"}';
                          			
                          			var successFn = function(result){
                          	    		console.log('result: ', result );
                          	    		
                          	    		$scope.phone = result;
                          	    		$scope.mainImageUrl = $scope.phone.images[0];
                          	       		console.log('$scope.phone: ', $scope.phone );	    		
                          	    	};
                          	        var failFn = function (result) {
                          	        	alert('Failed Service');
                          	        };
                          	        
                          	        RestRs.getJsonResp(pUriCode, pJson).success(successFn).error(failFn);
                          	        
                          	        
                          	        $scope.setImage = function(imageUrl) {
                                      	$scope.mainImageUrl = imageUrl;
                                      }
                          }]);

/* Filters */

angular.module('phonecatFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});


/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices
.factory('FileRs', ['$resource',
              	  function($resource){
              		console.log('FileRs....');
              	    return $resource('phoneAng/json/:phoneId.json', {}, {
              	      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
              	    });
              	  }])
              	  
              	  /* Obtiene la información de un servicio específico definido por su UriCode */
.factory('RestRs', function ($http) {	
              		console.log('RestRs....');
              		return {
              	        getJsonResp: function(pUriCode, pJson) {
              	        	var stJson = angular.fromJson(pJson);
              	        	console.log('<commonResource> stJson: ', stJson );
              	        	console.log('<commonResource> stJson(stringify) ', JSON.stringify(stJson) );
              	        	console.log('<commonResource> UriCode: ', pUriCode );
              	            /*return $http.post('/restapp', { 
              	            	uricode : pUriCode,
              	            	json    : stJson
              	            });*/
              	            return $http.post('/restapp?json='+JSON.stringify(stJson)+'&uricode='+pUriCode);
              	        }
              	    };
              	})

