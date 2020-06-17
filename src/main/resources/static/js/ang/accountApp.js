'use strict';

/* Modulo principal (App) */

var accountApp = angular.module('accountApp', [ 'ngRoute', 'mainControllers',
                                        'accountControllers', 'commonFilters', 'commonServices'
                                             ]);

/* Configuración de RUTAS */
accountApp
  .config(['$routeProvider', '$httpProvider',
      function($routeProvider, $httpProvider) {
          $routeProvider

          .when('/welcome', {
              templateUrl: 'views/account/welcome.html',
              controller :function ($scope, $route, $rootScope, $routeParams, $compile, $location, SessionStorage){
            	  document.title = 'Bienvenido al sistema';
                 $scope.mainMsg = '';
                 $scope.modalMsg = '';
                 $scope.nombreUser = $('#usrNombre').val();
              }
         })
         .when('/home', {
             templateUrl: 'views/account/home.html',
             controller :function ($scope, $route, $rootScope, $routeParams, $compile, $location, SessionStorage,
              	usuarioResponse 
             	){
           	  document.title = 'Mi cuenta';
                $scope.mainMsg = '';
                $scope.modalMsg = '';
                $scope.usuario = {};
                
                console.log('usuarioResponse: ', usuarioResponse);
                if(usuarioResponse.code==undefined && usuarioResponse.idUsuario!=undefined){
                	$scope.usuario =usuarioResponse;
                }
                
             }
	          ,resolve :{
	        	  usuarioResponse:function ($q, $route, $rootScope, SessionStorage, RestRs) {
         	        var deferred = $q.defer();
                   var successFn = function (result) {
                   	console.log(' <successFn,usuarioResponse> result :',result);
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
                      deferred.reject("Failed usuarioResponse");
                   };
                   var idUsuario = SessionStorage.retrieve('idUsuario');
          		   console.log('idUsuario: ', idUsuario );
                   RestRs.getJsonResp('USUARIO.R', '{"idUsuario":"' 
                   		+ idUsuario
                   		+ '"}')
               	.success(successFn)
               	.error(failFn)
               	;
       	        return deferred.promise;
           	}
	          }
        })
       .otherwise({
       		redirectTo: '/welcome'
       	});
  }]);

/* Directivas */
accountApp
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