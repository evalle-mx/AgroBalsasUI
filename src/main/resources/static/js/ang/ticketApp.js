'use strict';

/* Modulo principal (ticketApp) */

var ticketApp = angular.module('ticketApp', [ 'ngRoute', 'mainControllers',
                                        'ticketControllers', 'commonFilters', 'commonServices'
                                             ]);
/* Configuración de RUTAS ticketApp*/
ticketApp.config(['$routeProvider', '$httpProvider',
                    function($routeProvider, $httpProvider) {
                      $routeProvider.
                        when('/indice', {
                          templateUrl: 'views/ticket/indice.html',
                    	  controller :function ($scope, $route, $rootScope, $routeParams, $compile, $location ){
                    		$scope.mainMsg = '';
                    		$scope.modalMsg = '';
                    	  }
                        }).
                        when('/tickets', {
                          templateUrl: 'views/ticket/ticketLs.html',
                    	  controller :function ($scope, $route, $rootScope, $routeParams, $compile, $location,
                    			  ticketResponse, catalogoResponse ){
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
                          redirectTo: '/indice'
                        });
                    }]);

/*  ********************************************************** */

/* Modulo principal (ticketUserApp) */

var ticketUserApp = angular.module('ticketUserApp', [ 'ngRoute', 'mainControllers',
                                        'ticketControllers', 'commonFilters', 'commonServices'
                                             ]);
/* Configuración de RUTAS ticketApp*/
ticketUserApp.config(['$routeProvider', '$httpProvider',
                    function($routeProvider, $httpProvider) {
                      $routeProvider.
                        when('/indice', {
                          templateUrl: 'views/ticket/indiceusr.html',
                    	  controller :function ($scope, $route, $rootScope, $routeParams, $compile, $location ){
                    		$scope.mainMsg = '';
                    		$scope.modalMsg = '';
                    	  }
                        }).
                        when('/addticket', {
                            templateUrl: 'views/ticket/addTicket.html',
                      	  controller :function ($scope, $route, $rootScope, $routeParams, $compile, $location ){
                      		$scope.mainMsg = '';
                      		$scope.modalMsg = '';
                      		console.log('<app.addticket> $rootScope: ', $rootScope );
                      	  }
                        }).
                        when('/tickets', {
                          templateUrl: 'views/ticket/ticketUsrLs.html',
                    	  controller :function ($scope, $route, $rootScope, $routeParams, $compile, $location,
                    			  ticketResponse ){
                    		$scope.mainMsg = '';
                    		$scope.modalMsg = '';
                    		
                    		$scope.estatusNuevo = '1';
                    		
                    		$scope.tickets = [];
                    		if(ticketResponse.code==undefined && Array.isArray(ticketResponse)){
                    			$scope.tickets = ticketResponse;
                    		}
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
                                    RestRs.getJsonResp('TICKET.G', '{"idUsuario":"' 
                                    		+ $rootScope.session.idUsuario
                                    		+ '"}')
                                	.success(successFn)
                                	.error(failFn)
                                	;
                        	        return deferred.promise;
                            	}
                          }
                        }).
                        otherwise({ /* default */
                          redirectTo: '/indice'
                        });
                    }]);

/* Directivas */
ticketApp
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