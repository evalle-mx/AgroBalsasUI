'use strict';

/* Modulo principal (ipBlockApp) */

var ipBlockApp = angular.module('ipBlockApp', [ 'ngRoute', 'mainControllers',
                                        'ipBlockControllers', 'commonFilters', 'commonServices'
                                             ]);
/* Configuración de RUTAS ipBlockApp*/
ipBlockApp.config(['$routeProvider', '$httpProvider',
                    function($routeProvider, $httpProvider) {
                      $routeProvider.
                        when('/indice', {
                          templateUrl: 'views/ipblock/ipBlockHome.html',
                    	  controller :function ($scope, $route, $rootScope, $routeParams, $compile, $location ){
                    		$scope.mainMsg = '';
                    		$scope.modalMsg = '';
                    		console.log('<ipBlockApp.indice>')
                    	  }
                        }).
                        when('/tickets', {
                          templateUrl: 'views/ipblock/lsPackets.html',
                    	  controller :function ($scope, $route, $rootScope, $routeParams, $compile, $location,
                    			  ticketResponse, catalogoResponse ){
                      		console.log('<ipBlockApp.tickets>')
                    		$scope.mainMsg = '';
                    		$scope.modalMsg = '';
                    		
                    		$scope.estatusNuevo = '1';
                    		
                    		$scope.tickets = [];
                    		if(ticketResponse.code==undefined && Array.isArray(ticketResponse)){
                    			$scope.tickets = ticketResponse;
                    		}
                    		$scope.catalogos = catalogoResponse;
                    	  }
                          ,resolve :{
                        	  ticketResponse:function ($q, $route, $rootScope, RestRs) {
                        	        var deferred = $q.defer();
                                    var successFn = function (result) {
                                    	console.log(' <successFn,ticketResponse> result :',result);
                                        if ( typeFatal(result) ) {
                                            deferred.reject(result);
                                        }
                                        else {
                                        	//no es fatal, se determina si es respuesta esperada o error
                                        	if(result.type!=undefined && result.type=='E'){//error
                                        		deferred.reject(result);
                                        	}else{
                                        		deferred.resolve(result);
                                        	}
                                        }
                                    };
                                    var failFn = function (result) {
                                       deferred.reject("Failed ticketResponse");
                                    };
                                    RestRs.getJsonResp('TICKET.G', '{"idAdmin":"' 
                                    		+ $rootScope.session.idUsuario
                                    		+ '"}')
                                	.success(successFn)
                                	.error(failFn)
                                	;
                        	        return deferred.promise;
                            	},
                            	catalogoResponse:function ($q, $route, $rootScope, RestRs) {
                         		   var deferred = $q.defer();
                         		   var successFn = function (result) {
                         			   console.log(' <successFn,catalogoResponse> result :',result);
                         			   if ( typeFatal(result) ) {
                         				   deferred.reject(result);
                         			   }
                         			   else {
                         				   //no es fatal, se determina si es respuesta esperada o error
                         				   if(result.type!=undefined && result.type=='E'){//error
                         					   deferred.reject(result);
                         				   }else{
                         					   deferred.resolve(result);
                         				   }
                         			   }
                         		   };
                         		   var failFn = function (result) {
                         			   deferred.reject("Failed ticketResponse");
                         		   };
                         		   var jsReq = {descripcion:'1', lsNombre:[]};
//                         		   jsReq.lsNombre.push('Area');
//                         		   jsReq.lsNombre.push('Rol');
                         		   jsReq.lsNombre.push('TipoEstatus');
                         		   jsReq.lsNombre.push('TipoTicket');
                         		   jsReq.lsNombre.push('TecnicoAtencion');
//                         		   jsReq.lsNombre.push('TipoSoporte');
                         		   RestRs.getJsonResp('CATALOG.FG', jsReq)
                         				   .success(successFn)
                         				   .error(failFn)
                         				   ;
                         		   return deferred.promise;
                         	   }
                          }
                        }).
                        otherwise({ /* Default */
                          redirectTo: '/tickets'
                        });
                    }]);

/*  ********************************************************** */


/* Directivas */
ipBlockApp
.directive('commonModal', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/section/common-modal.htm'
  };
}).factory('SessionStorage', function() {
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
;