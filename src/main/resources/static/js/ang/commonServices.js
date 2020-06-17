'use strict';

/* Services */

var commonServices = angular.module('commonServices', ['ngResource']);

commonServices
	.factory('SessionStorage', function() {
		return {		
			store : function(storageKey, token) {
				return localStorage.setItem(storageKey, token);
			},
			retrieve : function(storageKey) {
				return localStorage.getItem(storageKey);
			},
			clear : function(storageKey) {
				return localStorage.removeItem(storageKey);
			}
		};
	})
	/*.factory('Phone', ['$resource',
                                   function($resource){
                                     return $resource('phoneAng/json/:phoneId.json', {}, {
                                       query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
                                     });
                                   }])*/
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
;