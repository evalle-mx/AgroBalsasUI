'use strict';

/* Modulo principal (App) */

var usuarioApp = angular.module('usuarioApp', [ 'ngRoute',
                                        'usuarioControllers', 'commonFilters', 'commonServices', 'mainControllers'
                                             ]);

usuarioApp.config(['$routeProvider',
                    function($routeProvider) {
                      $routeProvider.
                        when('/usuario', {
                          templateUrl: 'views/user/usuario-list.html',
                          controller :function ($scope, $route, $rootScope, $routeParams, $compile, $location,
                               	catalogoResponse
                              	){
                            	  document.title = 'Administración de Usuarios';
                                 $scope.mainMsg = '';
                                 $scope.modalMsg = '';
                                 
                                 $scope.catalogos = catalogoResponse;
                              },
                               resolve :{
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
                             		   var jsReq = {lsNombre:[]};
//                             		   jsReq.lsNombre.push('Area');
                             		   jsReq.lsNombre.push('Rol');
                             		   jsReq.lsNombre.push('Sucursal');
//                             		   jsReq.lsNombre.push('TipoEstatus');
//                             		   jsReq.lsNombre.push('TipoTicket');
//                             		   jsReq.lsNombre.push('TecnicoAtencion');
//                             		   jsReq.lsNombre.push('TipoSoporte');
                             		   RestRs.getJsonResp('CATALOG.FG', jsReq)
                             				   .success(successFn)
                             				   .error(failFn)
                             				   ;
                             		   return deferred.promise;
                             	   }
                               }
                        }).
                       /*when('/tickets/:phoneId', {
                          templateUrl: 'phoneAng/views/phone-detail.html',
                          controller: 'PhoneDetailCtrl'
                        }).*/
                        otherwise({
                          redirectTo: '/usuario'
                        });
                    }]);



/* Directivas */
usuarioApp
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