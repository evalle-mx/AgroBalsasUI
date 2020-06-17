'use strict';

/* Controllers */
var usuarioControllers = angular.module('usuarioControllers', []);

usuarioControllers
.controller('userListCtrl', ['$scope', '$filter', 'RestRs',
	function($scope, $filter, RestRs) {
		console.log('userListCtrl...');
		
		$scope.bErrorMsg=false;
		$scope.usuarios = [];
		$scope.searched = false;
		$scope.userTmp = {};
		$scope.userCopy = {};
		$scope.idUsuario = $('#usrId').val();
		$scope.orderProp = 'nombre';
		$scope.search={idSucursal:'-1', idRol:'-1'};
		$scope.confDel = false;
		$scope.disableBtns = false;
		
		$scope.cRol = [];
		$scope.cSucursal = [];
		var uriRoot = 'USUARIO';
		
		console.log('$scope.catalogos: ', $scope.catalogos);
		/* Carga los catálogos los arreglos para selects en la vista */
		console.log('$scope.catalogos: ', $scope.catalogos);
		if($scope.catalogos!=undefined){
			console.log('se busca catalogo de area');
			$.each($scope.catalogos, function(i, item) {
				console.log('item.nombre: ', item.nombre );
				if(item.nombre=='Rol'){
					$scope.cRol = item.lista;
					console.log('Se cargo Catálogo de cRol: ', $scope.cRol );
				}
				else if(item.nombre=='Sucursal'){
					$scope.cSucursal = item.lista;
					console.log('Se cargo Catálogo de Sucursal: ', $scope.cSucursal );
				}
			});
		}
		
		/* FUNCIONALIDAD */
		/**
		 * Carga de Usuarios bajo demanda (por parámetros) 
		 */
		$scope.loadUsuarios = function(){
			console.log('Cargando información');
			var pUriCode= uriRoot+'.G';
			console.log('BUscando usuarios para idUsuario: ', $scope.idUsuario );
			var jsReq={idUsuario:$scope.idUsuario};
			if($scope.search.idSucursal!='-1'){
				jsReq.idSucursal = $scope.search.idSucursal;
			}
			if($scope.search.idRol!='-1'){
				jsReq.idRol= $scope.search.idRol;
			}
	    	
	    	var successFn = function(result){
	    		console.log('result: ', result );
	    		$scope.usuarios = result;
	        	console.log('$scope.usuarios: ', $scope.usuarios );
	        	$scope.searched = true;
	        	//$scope.search={idSucursal:'-1', idRol:'-1'};
	    	};
	        var failFn = function (result) {
	        	alert('Failed Service');
	        };
	    	RestRs.getJsonResp(pUriCode, jsReq).success(successFn).error(failFn);
		};
		
		/* *** Modal **** */
		$scope.setAdd = function(){
			console.log('<setAdd> ');
						
			$scope.modalMsg = '';
			$scope.userTmp = {idRol:'-1', idSucursal:'-1'};
			$scope.userCopy = {};
			$scope.confDel = false;
			$scope.disableBtns = false;
			
			$scope.userTmp.edit=false;
			$('#mdUsuario').modal('show');
		};
		
		$scope.setEdit = function(usuario){
			console.log('<setEdit> usuario: ', usuario);
			$scope.userTmp = angular.copy(usuario);
			$scope.userCopy = usuario;
			$scope.modalMsg = '';
			$scope.confDel = false;
			$scope.disableBtns = false;

			$scope.userTmp.edit=true;
			$('#mdUsuario').modal('show');
		};

		$scope.confirmDel = function(){
			console.log('confirmDel()');
			$scope.confDel = true;
		};
		
		
		
		/* persistencia */
		$scope.validaParams = function(){
			var completo = true;
			$scope.bErrorMsg=false;
			//Validar
			if(!$scope.userTmp.nombre){
				console.log('Nombre es requerido');
				completo = false;
			}
			if(!$scope.userTmp.apellidos){
				console.log('apellidos es requerido');
				completo = false;
			}if(!$scope.userTmp.username){
				console.log('username es requerido');
				completo = false;
			}if(!$scope.userTmp.email){
				console.log('email es requerido');
				completo = false;
			}if(!$scope.userTmp.puesto){
				console.log('puesto es requerido');
				completo = false;
			}if(!$scope.userTmp.idRol){
				console.log('idRol es requerido');
				completo = false;
			}if(!$scope.userTmp.idSucursal){
				console.log('idSucursal es requerido');
				completo = false;
			}
			return completo;
		}
		
		$scope.creaUsuario = function(){
			console.log('<creaUsuario> ');
			console.log('$scope.userTmp: ', $scope.userTmp );
			
			var successFn = function(result){
				console.log('result: ', result );
	    		if ( typeFatal(result) ) {
	    			$scope.setcomModal('F', 'Error fatal', 
	    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
	    		}
	    		else if(!Array.isArray(result)){
	    			if(result.code!=undefined && result.code=='S001'){//Formato de Respuesta CREATE esperado
//	    				var idUsuario = result.idUsuario;
	    				var nuevo = angular.copy($scope.userTmp);
	    				nuevo.idUsuario = result.idUsuario;
	    				$scope.usuarios.push(nuevo);
	    				$scope.userTmp = {};
	    				$scope.setcomModal('S', 'Nuevo Usuario agregado', result.message!=undefined?result.message:'Se insertó correctamente');
	    			}
	    			else{
	    				$scope.bErrorMsg=true;
	    				$scope.modalMsg = 'Error al insertar los datos';
	    				$scope.setcomModal('E', 'Error', result.message!=undefined?result.message:'Error al insertar los datos');
	    			}
	    		}
	    		else{ //Respuesta inesperada o incorrecta
	    			$scope.bErrorMsg=true;
	    			$scope.modalMsg = 'Respuesta inesperada o incorrecta';
	    			$scope.setcomModal('F', 'Error Fatal', 'Respuesta de sistema inesperada o incorrecta');
	    		}
			};
			var failFn = function (result) {	//TODO Probar con commonFailFn
	        	$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
	        };
	        
			//Proceso
	        var completo = $scope.validaParams();
	        var jsReq = $scope.userTmp;
			if(completo){
		        RestRs.getJsonResp(uriRoot+'.C', jsReq).success(successFn).error(failFn);
			}
			else{
				$scope.modalMsg = 'Complete todos los datos requeridos';
				$scope.bErrorMsg=true;
				$scope.disableBtns = false;
				return;
			}
		};
		
		/**
		 * Actualizar registro
		 */
		$scope.updUsuario = function(){
			console.log('<updUsuario> ');
			console.log('$scope.userTmp: ', $scope.userTmp );
			var successFn = function(result){
				console.log('result: ', result );
	    		if ( typeFatal(result) ) {
	    			$scope.setcomModal('F', 'Error fatal', 
	    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
	    		}
	    		else if(!Array.isArray(result)){
	    			if(result.code!=undefined && result.code=='S002'){//Formato de Respuesta UPDATE esperado
	    				$scope.userCopy.idUsuario = $scope.userTmp.idUsuario;
	    				$scope.userCopy.nombre = $scope.userTmp.nombre;
	    				$scope.userCopy.apellidos = $scope.userTmp.apellidos;
	    				$scope.userCopy.email = $scope.userTmp.email;
	    				$scope.userCopy.puesto = $scope.userTmp.puesto;
	    				$scope.userCopy.idRol = $scope.userTmp.idRol;
	    				$scope.userCopy.lbSucursal=$filter('obtieneDesc')(jsReq.idSucursal, $scope.cRol);
	    				$scope.userCopy.idSucursal = $scope.userTmp.idSucursal;
	    				$scope.userCopy.lbSucursal=$filter('obtieneDesc')(jsReq.idSucursal, $scope.cSucursal);
	    				$scope.userCopy.contacto = $scope.userTmp.contacto;
	    				
	    				$scope.setcomModal('S', 'Actualizado', result.message!=undefined?result.message:'Se actualizó correctamente');
	    				$scope.userTmp = {};
	    			}
	    			else{
	    				$scope.bErrorMsg=true;
	    				$scope.modalMsg = 'Error al actualizar los datos';
	    				$scope.setcomModal('E', 'Actualizado', result.message!=undefined?result.message:'Error al actualizar los datos');
	    			}
	    		}
	    		else{ 
	    			$scope.bErrorMsg=true;
	    			$scope.modalMsg = 'Respuesta inesperada o incorrecta';
	    			$scope.setcomModal('F', 'Error Fatal', 'Respuesta de sistema inesperada o incorrecta');
	    		}
			};
			var failFn = function (result) {
//	        	alert('Failed Service');
	        	$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
	        };
			
	      //Proceso
	        var completo = $scope.validaParams();
	        var jsReq = $scope.userTmp;
			if(completo){
		        RestRs.getJsonResp(uriRoot+'.U', jsReq).success(successFn).error(failFn);
			}
			else{
				$scope.modalMsg = 'Complete todos los datos requeridos';
				$scope.bErrorMsg=true;
				$scope.disableBtns = false;
				return;
			}
		};
		/**
		 * Elimina el registro de la base, y si es exitoso, manda a eliminar el objeto en angular
		 */
		$scope.delUsuario = function(){
			console.log('delUsuario()');
			console.log('$scope.userTmp: ', $scope.userTmp );
			var jsReq={idUsuario:$scope.userTmp.idUsuario};
			
			var successFn = function(result){
				console.log('result: ', result );
				if ( typeFatal(result) ) {
	    			$scope.setcomModal('F', 'Error fatal', 
	    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
	    		}else if(!Array.isArray(result)){
	    			if(result.code!=undefined && result.code=='S004'){//Formato de Respuesta esperado
	    				$scope.setcomModal('S', 'Eliminado', result.message!=undefined?result.message:'Se eliminó correctamente');
	    				$scope.findAndRemove($scope.usuarios, 'idUsuario', result.idUsuario);
	    			}
	    			else{
	    				$scope.bErrorMsg=true;
	    				$scope.modalMsg = 'Error al Eliminar los datos';
	    				$scope.setcomModal('E', 'Eliminar', result.message!=undefined?result.message:'Error al Eliminar los datos');
	    			}
	    		}else{
    				$scope.bErrorMsg=true;
    				$scope.modalMsg = 'Error al Eliminar los datos';
    				$scope.setcomModal('E', 'Eliminar', result.message!=undefined?result.message:'Error al eliminar los datos');
    			}
			};
			var failFn = function (result) {
	        	$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
	        };
	        RestRs.getJsonResp(uriRoot+'.D', jsReq).success(successFn).error(failFn);
		};
		
		/**
		 * ENvia el valor de activado por separado 
		 */
		$scope.activation = function(valor){
			console.log('Activar/Desactivar usuario ');
			$scope.bErrorMsg=false;
			if($scope.userTmp.idUsuario){
		    	var pUriCode=uriRoot+'.A';
		    	
				var successFn = function(result){
		    		console.log('result: ', result );
		    		if(!Array.isArray(result)){
		    			if(result.code!=undefined){//Formato de Respuesta esperado
		    				if(result.type=='I'){// Resp Correcta
		    					$scope.modalMsg = result.message!=undefined?result.message:'Se modificó correctamente ';
		    					$scope.loadUsuarios();
		    					$scope.setcomModal('S', 'Activación', result.message!=undefined?result.message:'Se modificó correctamente');
		    				}else{ //Resp Incorrecta
		    					$scope.modalMsg = 'Error al Modificar ' + (result.message!=undefined?': '+result.message:'');
		    					$scope.bErrorMsg=true;
		    				}
		    			}
		    			else{//Respuesta inesperada
		    				alert('Fallo');
		    				$scope.bErrorMsg=true;
		    			}
		    		}
		    		else{ //Respuesta inesperada o incorrecta
		    			alert('Fallo');
		    			$scope.bErrorMsg=true;
		    		}
		    	};
				var failFn = commonFailFn;
				var jsReq = $scope.userTmp;
				jsReq.activate = valor;
				RestRs.getJsonResp(pUriCode, jsReq).success(successFn).error(failFn);
			}
			else{
				$scope.modalMsg = 'Usuario no valido';
				$scope.bErrorMsg=true;
			}
		};
		
		//On load:
		//$scope.loadUsuarios();
    	
 }])
;