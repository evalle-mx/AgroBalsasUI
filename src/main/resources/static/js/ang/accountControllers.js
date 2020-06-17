'use strict';

/* Controllers */
var accountControllers = angular.module('accountControllers', []);

accountControllers
.controller('homeaccountCtrl', ['$scope', '$route', 'RestRs', 'SessionStorage',
	function($scope, $route, RestRs, SessionStorage) {
		console.log('homeaccountCtrl...');
		//document.title = 'Administración elementals';
		
		/* >>>> Operación de los tabuladores */ 
		var tabClasses;
		function initTabs() {
		    tabClasses = ["",""];
		};
		
		$scope.getTabClass = function (tabNum) {
		    return tabClasses[tabNum];
		};
		$scope.getTabPaneClass = function (tabNum) {
		    return "tab-pane " + tabClasses[tabNum];
		};
		$scope.setActiveTab = function (tabNum) {
		    initTabs();
		    tabClasses[tabNum] = "active";
		};
		  
		/* Initialize */ 
		initTabs();
		$scope.setActiveTab(1);
		/* <<<<<<<<<<<<<< */
		
		$scope.pwd = {};
		
		$scope.validaParams = function(){
			var completo = true;
			$scope.bErrorMsg=false;
			//Validar
			if(!$scope.usuario.nombre){
				console.log('Nombre es requerido');
				completo = false;
			}
			if(!$scope.usuario.apellidos){
				console.log('apellidos es requerido');
				completo = false;
			}if(!$scope.usuario.username){
				console.log('username es requerido');
				completo = false;
			}if(!$scope.usuario.email){
				console.log('email es requerido');
				completo = false;
			}if(!$scope.usuario.username){
				console.log('username es requerido');
				completo = false;
//			}if(!$scope.usuario.puesto){
//				console.log('puesto es requerido');
//				completo = false;
//			}if(!$scope.usuario.idRol){
//				console.log('idRol es requerido');
//				completo = false;
//			}if(!$scope.usuario.idSucursal){
//				console.log('idSucursal es requerido');
//				completo = false;
			}
			return completo;
		}
		
		/**
		 * Envia usuario para actualizar datos
		 */
		$scope.updateInfo = function(){
			console.log('<updateInfo> ');
			console.log('$scope.userTmp: ', $scope.usuario );
			var successFn = function(result){
				console.log('result: ', result );
	    		if ( typeFatal(result) ) {
	    			$scope.setcomModal('F', 'Error fatal', 
	    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
	    		}
	    		else if(!Array.isArray(result)){
	    			if(result.code!=undefined && result.code=='S002'){//Formato de Respuesta UPDATE esperado    				
	    				
	    				$scope.setcomModal('S', 'Actualizado', result.message!=undefined?result.message:'Se actualizó correctamente');
	    				//$scope.userTmp = {};
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
	        var jsReq = $scope.usuario;
			if(completo){
		        RestRs.getJsonResp('USUARIO.U', jsReq).success(successFn).error(failFn);
			}
			else{
				$scope.modalMsg = 'Complete todos los datos requeridos';
				$scope.bErrorMsg=true;
				$scope.disableBtns = false;
				return;
			}
		};
		
		/**
		 * Función para modificar la última contraseña
		 */
		$scope.updatePwd = function(){
			console.log('updatePwd pwd: ', $scope.pwd );
			$scope.bErrUpd=false;
			$scope.errUpd='';
			
			if($scope.pwd.actual){
				if($scope.pwd.nueva){
					if($scope.pwd.nuevabis){
						if($scope.pwd.nueva==$scope.pwd.nuevabis){
							//TODO validación de seguridad
//							alert('Se envia el objeto a actualizar');
							var successFn = function(result){
								console.log('result: ', result );
					    		if ( typeFatal(result) ) {
					    			$scope.setcomModal('F', 'Error fatal', 
					    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
					    		}
					    		else if(!Array.isArray(result)){
					    			if(result.code!=undefined && result.code=='S002'){//Formato de Respuesta UPDATE esperado
					    				$scope.setcomModal('S', 'Actualizado', result.message!=undefined?result.message:'Se actualizó correctamente');
					    				$scope.pwd = {};
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
					        	$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
					        };
					        var idUsuario = SessionStorage.retrieve('idUsuario');
			          		   console.log('idUsuario: ', idUsuario );
					        var jsReq = {idUsuario:idUsuario, password1:$scope.pwd.actual, password2:$scope.pwd.nueva};
					        RestRs.getJsonResp('USUARIO.PW', jsReq).success(successFn).error(failFn);
					        
						}else{
							$scope.bErrUpd=true;
							$scope.errUpd='Las contraseñas no coinciden, verifique';
						}
					}
					else{
						$scope.bErrUpd=true;
						$scope.errUpd='Es requerido repetir la contraseña';
					}
				}
				else{
					$scope.bErrUpd=true;
					$scope.errUpd='Es Requerida la nueva contraseña';
				}
			}else{
				$scope.bErrUpd=true;
				$scope.errUpd='Es requerida Contraseña actual';
			}
		};
		
}])