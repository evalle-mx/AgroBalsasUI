'use strict';

/* Modulo principal (App) */

var adminApp = angular.module('adminApp', [ 'ngRoute', 'commonFilters', 'commonServices', 'mainControllers',
                                        'adminControllers'
                                             ]);

/* Configuración de RUTAS */
adminApp
  .config(['$routeProvider', '$httpProvider',
      function($routeProvider, $httpProvider) {
          $routeProvider
          .when('/menu', {
               templateUrl: 'views/admin/index.html',
               controller :function ($scope, $route, $rootScope, $routeParams, $compile, $location
                	//ticketResponse 
               	){
                  $scope.mainMsg = '';
                  $scope.modalMsg = '';
                  document.title = 'Menú de Administración';
                  
               }
          })
          .when('/catalog', {
               templateUrl: 'views/admin/catalog.html',
               controller :function ($scope, $route, $rootScope, $routeParams, $compile, $location,
                	catalogoResponse 
               	){
            	   document.title = 'Catálogos de sistema';
            	   $scope.mainMsg = '';
            	   $scope.modalMsg = '';
            	   console.log('<app.catalog> catalogoResponse: ', catalogoResponse );
            	   $scope.catResp = [];
            	   if(Array.isArray(catalogoResponse)){
            		   console.log('Cargando $scope.catResp ')
                	   $scope.catResp = catalogoResponse;   
            	   }
            	   else{
            		   alert('Respuesta invalida, regresando a Menú');
            		   $location.path('/menu');
            	   }
            	   
            	   console.log('<app.catalog> $scope.catResp: ', $scope.catResp);
                  
               },resolve :{
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
            		   jsReq.lsNombre.push('Area');
            		   jsReq.lsNombre.push('Rol');
            		   jsReq.lsNombre.push('TipoEstatus');
            		   jsReq.lsNombre.push('TipoSoporte');
            		   RestRs.getJsonResp('CATALOG.FG', jsReq)
            				   .success(successFn)
            				   .error(failFn)
            				   ;
            		   return deferred.promise;
            	   }
               }
          })
          .when('/branch', { /* Sucursales */
              templateUrl: 'views/admin/branch.html',
              controller :function ($scope, $route, $rootScope, $routeParams, $compile, $location,
               	branchResponse 
              	){
            	  document.title = 'Sucursales';
                 $scope.mainMsg = '';
                 $scope.modalMsg = '';
                 $scope.sucursales = [];
                 if(Array.isArray(branchResponse)){
          		   console.log('Cargando $scope.sucursales ')
              	   $scope.sucursales = branchResponse;   
	          	 }
	          	 else{
	          		 alert('Respuesta invalida, regresando a Menú');
	          		 console.log('branchResponse: ', branchResponse );
	          		 $location.path('/menu');
	          	 }
                 
              },resolve :{
            	  branchResponse:function ($q, $route, $rootScope, RestRs) {
        		   var deferred = $q.defer();
        		   var successFn = function (result) {
        			   console.log(' <successFn,branchResponse> result :',result);
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
        			   deferred.reject("Failed branchResponse");
        		   };
        		   
        		   var jsReq = {};
        		   
        		   RestRs.getJsonResp('BRANCH.G', jsReq)
        				   .success(successFn)
        				   .error(failFn)
        				   ;
        		   return deferred.promise;
        	   }
           }
         })
         .when('/technitian', {
             templateUrl: 'views/admin/technitian.html',
             controller :function ($scope, $route, $rootScope, $routeParams, $compile, $location, SessionStorage,
              	technicianResponse, usersResponse, catalogoResponse
             	){
           	  document.title = 'Técnicos de Atención';
                $scope.mainMsg = '';
                $scope.modalMsg = '';
                
                $scope.tecnicos = [];
                $scope.catalogos = {};
        		$scope.usuarioDisp = 0;
//        		$scope.sucursales = [];
                
                if(Array.isArray(technicianResponse)){
             	   $scope.tecnicos = technicianResponse;
             	   console.log('Cargando $scope.tecnicos ', $scope.tecnicos );
	          	 }
	          	 else{
	          		 alert('Respuesta inválida, regresando a Menú');//TODO reemplazar por MOdal General
	          		 console.log('technicianResponse: ', technicianResponse );
	          		 $location.path('/menu');
	          	 }
                
//                if(Array.isArray(branchResponse)){
//                	$scope.sucursales = branchResponse;
//                }
                if(Array.isArray(usersResponse)){
                	$scope.usuarioDisp = usersResponse.length;
                }
                $scope.catalogos = catalogoResponse;
             },
             resolve :{
            	technicianResponse:function ($q, $route, $rootScope, RestRs) {
       		   var deferred = $q.defer();
       		   var successFn = function (result) {
       			   console.log(' <successFn,technicianResponse> result :',result);
       			   if ( typeFatal(result) ) {
       				   deferred.reject(result);
       			   }
       			   else {
       				   //no es fatal, se determina si es respuesta esperada o error
       				   if(result.type!=undefined && result.type=='E'){//error
       					   alert('technicianResponse es error');
       					   deferred.reject(result);
       				   }else{
       					   deferred.resolve(result);
       				   }
       			   }
       		   };
       		   var failFn = function (result) {
       			   deferred.reject("Failed technicianResponse");
       		   };
       		   
       		   RestRs.getJsonResp('TECHNICIAN.G', {}).success(successFn).error(failFn);
       		   return deferred.promise;
             },
      	 usersResponse:function ($q, $route, $rootScope, SessionStorage, RestRs) {
  		   var deferred = $q.defer();
  		   var successFn = function (result) {
  			   console.log(' <successFn,usersResponse> result :',result);
  			   if ( typeFatal(result) ) {
  				   deferred.reject(result);
  			   }
  			   else {
  				   //no es fatal, se determina si es respuesta esperada o error
  				   if(result.type!=undefined && result.type=='E'){//error
  					 alert('usersResponse es error');
  					   deferred.reject(result);
  				   }else{
  					   deferred.resolve(result);
  				   }
  			   }
  		   };
  		   var failFn = function (result) {
  			   deferred.reject("Failed usersResponse");
  		   };
  		 console.log('$rootScope.session: ', $rootScope.session );
  		 
//  		 console.log('SessionStorage: ', SessionStorage);
  		   var idUsuario = SessionStorage.retrieve('idUsuario');
  		   console.log('idUsuario: ', idUsuario );
  		   
  		   var jsReq = {idUsuario:idUsuario};
  		   //TODO modificar servicio para obtener lista reducida o contador de usuarios
  		   RestRs.getJsonResp('USUARIO.G', jsReq).success(successFn).error(failFn);
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
      					 alert('catalogoResponse es error');
      					   deferred.reject(result);
      				   }else{
      					   deferred.resolve(result);
      				   }
      			   }
      		   };
      		   var failFn = function (result) {
      			   deferred.reject("Failed catalogoResponse");
      		   };
      		   var jsReq = {descripcion:'1', lsNombre:[]};
      		   jsReq.lsNombre.push('Area');
      		   jsReq.lsNombre.push('TipoSoporte');
      		   jsReq.lsNombre.push('Rol');
      		   jsReq.lsNombre.push('Sucursal');
      		   RestRs.getJsonResp('CATALOG.FG', jsReq)
      				   .success(successFn)
      				   .error(failFn)
      				   ;
      		   return deferred.promise;
      	   }
          }
        })
        .when('/tickettype', {
            templateUrl: 'views/admin/tickettype.html',
            controller :function ($scope, $route, $rootScope, $routeParams, $compile, $location,
             	tickettypeResponse, catalogoResponse
            	){
          	  document.title = 'Tipo de Ticket';
               $scope.mainMsg = '';
               $scope.modalMsg = '';
               
               $scope.tipoTickets = [];
               
               if(Array.isArray(tickettypeResponse)){
            	   $scope.tipoTickets = tickettypeResponse;
            	   console.log('Cargando $scope.tipoTickets ', $scope.tipoTickets)
	          	 }
	          	 else{
	          		 alert('Respuesta invalida, regresando a Menú');
	          		 console.log('tickettypeResponse: ', tickettypeResponse );
	          		 $location.path('/menu');
	          	 }

               $scope.catalogos = catalogoResponse;
            },
             resolve :{
            	 tickettypeResponse:function ($q, $route, $rootScope, RestRs) {
       		   var deferred = $q.defer();
       		   var successFn = function (result) {
       			   console.log(' <successFn,tickettypeResponse> result :',result);
       			   if ( typeFatal(result) ) {
       				   alert('Error: ' + (result.message!=undefined?result.message:''));
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
       			   deferred.reject("Failed tickettypeResponse");
       		   };
       		   
       		   RestRs.getJsonResp('TICKETTYPE.G', {}).success(successFn).error(failFn);
       		   return deferred.promise;
             },catalogoResponse:function ($q, $route, $rootScope, RestRs) {
        		   var deferred = $q.defer();
          		   var successFn = function (result) {
          			   console.log(' <successFn,catalogoResponse> result :',result);
          			   if ( typeFatal(result) ) {
          				   deferred.reject(result);
          			   }
          			   else {
          				   //no es fatal, se determina si es respuesta esperada o error
          				   if(result.type!=undefined && result.type=='E'){//error
          					 alert('catalogoResponse es error');
          					   deferred.reject(result);
          				   }else{
          					   deferred.resolve(result);
          				   }
          			   }
          		   };
          		   var failFn = function (result) {
          			   deferred.reject("Failed catalogoResponse");
          		   };
          		   var jsReq = {descripcion:'1', lsNombre:[]};
//          		   jsReq.lsNombre.push('Area');
          		   jsReq.lsNombre.push('TipoSoporte');
//          		   jsReq.lsNombre.push('Rol');
//          		   jsReq.lsNombre.push('Sucursal');
          		   RestRs.getJsonResp('CATALOG.FG', jsReq)
          				   .success(successFn)
          				   .error(failFn)
          				   ;
          		   return deferred.promise;
          	   }
          }
       })
       .otherwise({
       		redirectTo: '/menu'
       	});
  }]);


/* Directivas */
adminApp
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