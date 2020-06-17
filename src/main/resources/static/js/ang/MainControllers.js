'use strict';

/* Controllers */
var mainControllers = angular.module('mainControllers', []);

mainControllers
.controller('mainCtrl', ['$scope', '$route', '$rootScope', 'SessionStorage', 'RestRs', function($scope, $route, $rootScope, SessionStorage, RestRs) {
	console.log('mainCtrl...');
    
	//"mdTitle"
	$scope.comMd = {mdTitle:'', mdMessage:'',bSuccess:false,bInfo:false,bWarning:false,bError:false};
	
	
	var commonFailFn = function () {
		$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
    };
	
	/**
	 * Muestra el modal genéral con el resultado de una operación y el tipo de respuesta
	 * $scope.setcomModal('T', 'Título', 'Mensaje a mostrar');
	 */
	$scope.setcomModal = function(tipo, titulo, mensaje){
		console.log('Generando modal común de mensaje');		
		$scope.comMd = {title:'Importante', message:'',bSuccess:false,bInfo:false,bWarning:false,bError:false};
		
		console.log('tipo: ', tipo );	console.log('titulo: ', titulo );	console.log('mensaje: ', mensaje );
		
		if(mensaje!=undefined){
			$scope.comMd.message = mensaje;
		}
		if(titulo!=undefined){
			$scope.comMd.title = titulo;
		}
		$('.modal').modal('hide');
		//******** */
		if(tipo=='E' || tipo=='F' ){ //error
			$scope.comMd.bError = true;
		}else if(tipo=='W'){ //advertencia
			$scope.comMd.bWarning = true;
		}else if(tipo=='S'){ //exito
			$scope.comMd.bSuccess = true;
		}else { //Informacion
			$scope.comMd.bInfo = true;
		}
		$('#mdCommon').modal('show');
	};

	/**
	 * Remueve un elemento de cualquier arreglo por medio de 'reflexion' 
	 * findAndRemove( [], 'property', value );
	 */
	$scope.findAndRemove = function(array, property, value) {
		console.log('<findAndRemove>');
		/*console.log('array: ', array ); console.log('property: ', property ); console.log('value: ', value );*/
		array.forEach(function(result, index) {
		    if(result[property] === value) {
		      //Remueve del arreglo
		      array.splice(index, 1);
		    }    
		  });
	};
	
	/**
	 * Se encarga de generar un campo Id númerico para ordenar, a partir del 'property' definido
	 */
	$scope.numId = function(array, property){
		console.log('<numId>');
		array.forEach(function(item, index) {
			item.id = parseInt(item[property]);
		});
	}
             
	$scope.setSession = function(){
		console.log('Creando session en $rootScope.');
		var myIdUsuario = $('#usrId').val();
		var nombreUser = $('#usrNombre').val();
//		alert('usuario a sesion: '+myIdUsuario+', nombre: ' + nombreUser );
		$rootScope.session = {idUsuario:myIdUsuario, nombre:nombreUser };		
		SessionStorage.store('idUsuario',myIdUsuario);
	};
	
	
	$scope.searchUsuarios = function(idRol, idSucursal){
		console.log('Generando lista de Usuarios');
		var pUriCode= 'USUARIO.G';
		var usuariosEnc = [];
		console.log('BUscando usuarios para idUsuario: ', '0' );
		var jsReq={idUsuario:$scope.idUsuario};
		if(idSucursal!=undefined && idSucursal!='-1'){
			jsReq.idSucursal = idSucursal;
		}
		if(idRol!=undefined && idRol!='-1'){
			jsReq.idRol= idRol;
		}
    	
    	var successFn = function(result){
    		console.log('result: ', result );
    		usuariosEnc = result;
        	console.log('usuariosEnc: ', usuariosEnc );
        	$scope.searched = true;
        	//$scope.search={idSucursal:'-1', idRol:'-1'};
        	return usuariosEnc;
    	};
        var failFn = function (result) {
        	alert('Failed Service');
        	return usuariosEnc;
        };
    	RestRs.getJsonResp(pUriCode, jsReq).success(successFn).error(failFn);
	};
         
	//Inicializar
	console.log('$rootScope: ', $rootScope );
	console.log('$rootScope.session: ', $rootScope.session );
	if($rootScope.session == undefined || $rootScope.session == null){
		$scope.setSession();
	}
}]);
