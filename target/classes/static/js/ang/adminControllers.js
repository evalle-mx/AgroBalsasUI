'use strict';

/* Controllers */
var adminControllers = angular.module('adminControllers', []);

adminControllers
.controller('menuAdminCtrl', ['$scope', '$route', '$filter', 'SessionStorage', 'RestRs',
	function($scope, $route, $rootScope, $filter, SessionStorage, RestRs) {
		activeMenu('lkAdmin');
		console.log('menuAdminCtrl...');
		//document.title = 'Administración elementals';
		
}])
.controller('catalogoCtrl', ['$scope', '$route', '$filter', 'RestRs',
	function($scope, $route, $filter, RestRs) {
		console.log('catalogoCtrl...');
		document.title = 'Administración de Catálogos en Sistema';
		/* >>>> Operación de los tabuladores */ 
		var tabClasses;
		function initTabs() {
		    tabClasses = ["","","",""];
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
		$scope.setActiveTab(2);
		/* <<<<<<<<<<<<<< */
		
		/* Carga inicial */
		console.log('$scope.catResp: ', $scope.catResp );
		$scope.cArea = [];
		$scope.cRol = [];
		$scope.cEstatus = [];
		$scope.cTSoporte = [];
		$scope.orderCatalogo = 'id';
		
		if($scope.catResp!=undefined && $scope.catResp.length>0){
			$.each($scope.catResp, function(i, item) {
				if(item.nombre!=undefined && item.nombre=='Area'){
					$scope.cArea = item.lista;
					$scope.numId($scope.cArea, 'llave');
				}
				else if(item.nombre!=undefined && item.nombre=='Rol'){
					$scope.cRol = item.lista;
					$scope.numId($scope.cRol, 'llave');
				}
				else if(item.nombre!=undefined && item.nombre=='TipoEstatus'){
					$scope.cEstatus = item.lista;
					$scope.numId($scope.cEstatus, 'llave');
				}
				else if(item.nombre!=undefined && item.nombre=='TipoSoporte'){
					$scope.cTSoporte = item.lista;
					$scope.numId($scope.cTSoporte, 'llave');
				}
			 });
		}		
		console.log('$scope.cArea: ', $scope.cArea );
		
		/* Funciones */
		$scope.regTmp = {};
		$scope.confDel = false;
		$scope.disableBtns = false;
		
		$scope.setAdd = function(tipo){
			console.log('<setEdit> tipo: ', tipo);
			$scope.modalMsg = '';
			$scope.regTmp = {};
			$scope.confDel = false;
			$scope.disableBtns = false;
			var pUriCode =null;
			var lbCat = null;
			if(tipo==1){//area
				pUriCode ='AREA.C';
				lbCat='Área';
			}else if(tipo==2){//rol
				pUriCode ='ROL.C';
				lbCat='Rol';
			}else if(tipo==3){//tipoEstatus
				pUriCode ='ESTATUS.C';
				lbCat='Estatus';
			}else if(tipo==4){//tipoSoporte
				pUriCode ='TIPOSOPORTE.C';
				lbCat='Tipo soporte';
			}else {
				return;
			}
			$scope.regTmp.uriCode = pUriCode;
			$scope.regTmp.lbCat = lbCat;
			$scope.regTmp.tipo = tipo;
			$scope.regTmp.edit=false;
			$('#mdCat').modal('show');
		};
		
		$scope.setEdit = function(registro, tipo){
			console.log('<setEdit> registro: ', registro);
			console.log('<setEdit> tipo: ', tipo);
			$scope.modalMsg = '';
			$scope.confDel = false;
			$scope.disableBtns = false;
			var pUriCode =null;
			var lbCat = null;
			if(tipo==1){//area
				pUriCode ='AREA.U';
				lbCat='Área';
			}else if(tipo==2){//rol
				pUriCode ='ROL.U';
				lbCat='Rol';
			}else if(tipo==3){//tipoEstatus
				pUriCode ='ESTATUS.U';
				lbCat='Estatus';
			}else if(tipo==4){//tipoSoporte
				pUriCode ='TIPOSOPORTE.U';
				lbCat='Tipo soporte';
			}else {
				return;
			}
			$scope.regTmp = registro;
			$scope.regTmp.uriCode = pUriCode;
			$scope.regTmp.lbCat = lbCat;
			$scope.regTmp.tipo = tipo;
			$scope.regTmp.edit=true;
			$('#mdCat').modal('show');
		};
		
		$scope.addCat = function(){
			console.log('addCat()');
			$scope.disableBtns = true;
			console.log('$scope.regTmp: ', $scope.regTmp );
			var tipo = $scope.regTmp.tipo;
			
			if($scope.regTmp.valor){
				var jsReq={etiqueta:$scope.regTmp.valor};
				var pUriCode = $scope.regTmp.uriCode;
				if($scope.regTmp.descripcion){
					jsReq.descripcion = $scope.regTmp.descripcion;
				}
				var successFn = function(result){
		    		console.log('result: ', result );
		    		if ( typeFatal(result) ) {
		    			//alert('error Fatal!!!! ' + (result.message!=undefined?': '+result.message:'')); //TODO USAR MODAL FATAL
		    			$scope.setcomModal('F', 'Error fatal', 
		    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
		    		}
		    		else if(!Array.isArray(result)){
		    			if(result.code!=undefined && result.code=='S001'){//Formato de Respuesta esperado
		    				var nuevo = {};
		    				if(tipo==1){
		    					nuevo.llave = result.idArea;
		    					nuevo.valor= jsReq.etiqueta;
		    					nuevo.descripcion = $scope.regTmp.descripcion;
		    					$scope.cArea.push( nuevo);
		    				}
		    				if(tipo==2){
		    					nuevo.llave = result.idRol;
		    					nuevo.valor= jsReq.etiqueta;
		    					nuevo.descripcion = $scope.regTmp.descripcion;
		    					$scope.cRol.push( nuevo);
		    				}
		    				if(tipo==3){
		    					nuevo.llave = result.idTipoEstatus;
		    					nuevo.valor= jsReq.etiqueta;
		    					nuevo.descripcion = $scope.regTmp.descripcion;
		    					$scope.cEstatus.push( nuevo);
		    				}
		    				if(tipo==4){
		    					nuevo.llave = result.idTipoSoporte;
		    					nuevo.valor= jsReq.etiqueta;
		    					nuevo.descripcion = $scope.regTmp.descripcion;
		    					$scope.cTSoporte.push( nuevo);
		    				}
		    				$scope.regTmp = {};
		    				$scope.setcomModal('S', 'Nueva valor insertado', result.message!=undefined?result.message:'Se insertó correctamente');
		    			}
		    			else{
		    				$scope.bErrorMsg=true;
		    				$scope.modalMsg = 'Error al insertar los datos';
		    				$scope.setcomModal('E', 'Error', result.message!=undefined?result.message:'Error al insertar los datos');
		    			}
		    		}
		    		else{ //Respuesta inesperada o incorrecta
//		    			alert('Fallo');
		    			$scope.bErrorMsg=true;
		    			$scope.modalMsg = 'Respuesta inesperada o incorrecta';
		    			$scope.setcomModal('F', 'Error Fatal', 'Respuesta de sistema inesperada o incorrecta');
		    		}
		    	};
		        var failFn = function (result) {
//		        	alert('Failed Service');
		        	$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
		        };
		    	RestRs.getJsonResp(pUriCode, jsReq).success(successFn).error(failFn);
			}
			else {
    			$scope.bErrorMsg=true;
				$scope.modalMsg = 'La etiqueta es requerida';
				$scope.disableBtns = false;
				return;
			}
		};
		
		$scope.updCat = function(){
			console.log('updCat()');
			$scope.disableBtns = true;
			console.log('$scope.regTmp: ', $scope.regTmp );
			var tipo = $scope.regTmp.tipo;
			var completa = false;
			if($scope.regTmp.valor){
				var jsReq={etiqueta:$scope.regTmp.valor};
				if($scope.regTmp.descripcion){
					jsReq.descripcion = $scope.regTmp.descripcion;
					completa = true;
				}
				if(tipo==1 && $scope.regTmp.llave){//area
					jsReq.idArea=$scope.regTmp.llave;
					completa = true;
				}
				else if(tipo==2 && $scope.regTmp.llave){//rol
					jsReq.idRol=$scope.regTmp.llave;
					completa = true;
				}
				else if(tipo==3 && $scope.regTmp.llave){//tipoEstatus
					jsReq.idTipoEstatus=$scope.regTmp.llave;
					completa = true;
				}
				else if(tipo==4 && $scope.regTmp.llave){//TipoSoporte
					jsReq.idTipoSoporte=$scope.regTmp.llave;
					completa = true;
				}
				
				if(completa){
					var pUriCode = $scope.regTmp.uriCode;
					
					var successFn = function(result){
			    		console.log('result: ', result );
			    		if ( typeFatal(result) ) {
//			    			alert('error!!!!'); //TODO USAR MODAL FATAL
			    			$scope.setcomModal('F', 'Error fatal', 
			    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
			    		}
			    		else if(!Array.isArray(result)){
			    			if(result.code!=undefined && result.code=='S002'){//Formato de Respuesta esperado
//			    				alert('Correct');
			    				$scope.regTmp = {};
			    				$scope.setcomModal('S', 'Actualizado', result.message!=undefined?result.message:'Se actualizó correctamente');
			    			}
			    			else{
			    				$scope.bErrorMsg=true;
			    				$scope.modalMsg = 'Error al actualizar los datos';
			    				$scope.setcomModal('E', 'Actualizado', result.message!=undefined?result.message:'Error al actualizar los datos');
			    			}
			    		}
			    		else{ //Respuesta inesperada o incorrecta
//			    			alert('Fallo');
			    			$scope.bErrorMsg=true;
			    			$scope.modalMsg = 'Respuesta inesperada o incorrecta';
			    			$scope.setcomModal('F', 'Error Fatal', 'Respuesta de sistema inesperada o incorrecta');
			    		}
			    	};
			        var failFn = function (result) {
//			        	alert('Failed Service');
			        	$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
			        };
			    	RestRs.getJsonResp(pUriCode, jsReq).success(successFn).error(failFn);
				}
				else{
					$scope.bErrorMsg=true;
					$scope.modalMsg = 'Hay datos faltantes';
					return;
				}
				
			}
			else {
    			$scope.bErrorMsg=true;
				$scope.modalMsg = 'La etiqueta es requerida';
				return;
			}
		};
		
		$scope.confirmCat = function(){
			console.log('confirmCat()');
			console.log('$scope.regTmp: ', $scope.regTmp );
			$scope.confDel = true;
		};
		
		$scope.deleteCat = function(){
			console.log('deleteCat()');
			$scope.disableBtns = true;
			$scope.confDel = false;
			console.log('$scope.regTmp: ', $scope.regTmp );
			var tipo = $scope.regTmp.tipo;
			var jsReq={};
			var completa = false;
			if(tipo==1 && $scope.regTmp.llave){//area
				jsReq.idArea=$scope.regTmp.llave;
				completa = true;
			}
			else if(tipo==2 && $scope.regTmp.llave){//rol
				jsReq.idRol=$scope.regTmp.llave;
				completa = true;
			}
			else if(tipo==3 && $scope.regTmp.llave){//tipoEstatus
				jsReq.idTipoEstatus=$scope.regTmp.llave;
				completa = true;
			}
			else if(tipo==4 && $scope.regTmp.llave){//TipoSoporte
				jsReq.idTipoSoporte=$scope.regTmp.llave;
				completa = true;
			}
			
			if(completa){
				var pUriCode = $scope.regTmp.uriCode.replace('.U', '.D');
				
				var successFn = function(result){
		    		console.log('result: ', result );
		    		if ( typeFatal(result) ) {
		    			$scope.setcomModal('F', 'Error fatal', 
		    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
		    		}
		    		else if(!Array.isArray(result)){
		    			if(result.code!=undefined && result.code=='S004'){//Formato de Respuesta esperado
//		    				alert('Correctamente eliminado');
		    				var llave = $scope.regTmp.llave;
		    				$scope.setcomModal('S', 'Eliminado', result.message!=undefined?result.message:'Se eliminó correctamente');
		    				//TODO remover del arreglo correspondiente
		    				if(tipo==1){
		    					$scope.findAndRemove($scope.cArea, 'llave', llave);
		    				}
		    				if(tipo==2){
		    					$scope.findAndRemove($scope.cRol, 'llave', llave);
		    				}
		    				if(tipo==3){
		    					$scope.findAndRemove($scope.cEstatus, 'llave', llave);
		    				}
		    				if(tipo==4){
		    					$scope.findAndRemove($scope.cTSoporte, 'llave', llave);
		    				}
		    				$scope.regTmp = {};
		    			}
		    			else{
		    				$scope.bErrorMsg=true;
		    				$scope.modalMsg = 'Error al Eliminar los datos';
		    				$scope.setcomModal('E', 'Eliminar', result.message!=undefined?result.message:'Error al Eliminar los datos');
		    			}
		    		}
		    		else{
	    				$scope.bErrorMsg=true;
	    				$scope.modalMsg = 'Error al Eliminar los datos';
	    				$scope.setcomModal('E', 'Eliminar', result.message!=undefined?result.message:'Error al eliminar los datos');
	    			}
				};
		        var failFn = function (result) {
//		        	alert('Failed Service');
		        	$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
		        };
		    	RestRs.getJsonResp(pUriCode, jsReq).success(successFn).error(failFn);
			}
			else{
				$scope.bErrorMsg=true;
				$scope.modalMsg = 'Hay datos faltantes';
				return;
			}
		};
}])
.controller('sucursalCtrl', ['$scope', '$route', '$filter', 'RestRs',
	function($scope, $route, $filter, RestRs) {
		console.log('sucursalCtrl...');
		document.title = 'Administración de Sucursales';
		
		console.log('$scope.sucursales: ', $scope.sucursales);
		if($scope.sucursales!=undefined && $scope.sucursales.length>0){
			$scope.numId($scope.sucursales, 'idSucursal');
		}
		/* control */
		$scope.ordenSucursal = 'id';
				
		/* Variables */
		$scope.branchTmp = {};
		$scope.branchCopy = {};
		$scope.confDel = false;
		$scope.disableBtns = false;
		var uriRoot = 'BRANCH';
		
		$scope.setAdd = function(){
			console.log('<setAdd> ');
						
			$scope.modalMsg = '';
			$scope.branchTmp = {};
			$scope.branchCopy = {};
			$scope.confDel = false;
			$scope.disableBtns = false;
			
			$scope.branchTmp.edit=false;
			$('#mdBranch').modal('show');
		};
		
		$scope.setEdit = function(sucursal){
			console.log('<setEdit> sucursal: ', sucursal);
			$scope.branchTmp = angular.copy(sucursal);
			$scope.branchCopy = sucursal;
			$scope.modalMsg = '';
			$scope.confDel = false;
			$scope.disableBtns = false;

			$scope.branchTmp.edit=true;
			$('#mdBranch').modal('show');
		};
		
		/* persistencia */
		$scope.createBranch = function(){
			console.log('<createBranch> ');
			console.log('$scope.branchTmp: ', $scope.branchTmp );
			if($scope.branchTmp.nombre){
				var jsReq={nombre:$scope.branchTmp.nombre};
				if($scope.branchTmp.ubicacion){
					jsReq.ubicacion = $scope.branchTmp.ubicacion;
				}
				
				var successFn = function(result){
					console.log('result: ', result );
		    		if ( typeFatal(result) ) {
		    			//alert('error Fatal!!!! ' + (result.message!=undefined?': '+result.message:'')); //TODO USAR MODAL FATAL
		    			$scope.setcomModal('F', 'Error fatal', 
		    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
		    		}
		    		else if(!Array.isArray(result)){
		    			if(result.code!=undefined && result.code=='S001'){//Formato de Respuesta CREATE esperado
		    				var nuevo = {};
		    				$scope.sucursales.push({idSucursal:result.idSucursal, id:parseInt(result.idSucursal),
		    					nombre:$scope.branchTmp.nombre, ubicacion:$scope.branchTmp.ubicacion });
		    				$scope.branchTmp = {};
		    				$scope.setcomModal('S', 'Nueva valor insertado', result.message!=undefined?result.message:'Se insertó correctamente');
		    			}
		    			else{
		    				$scope.bErrorMsg=true;
		    				$scope.modalMsg = 'Error al insertar los datos';
		    				$scope.setcomModal('E', 'Error', result.message!=undefined?result.message:'Error al insertar los datos');
		    			}
		    		}
		    		else{ //Respuesta inesperada o incorrecta
//		    			alert('Fallo');
		    			$scope.bErrorMsg=true;
		    			$scope.modalMsg = 'Respuesta inesperada o incorrecta';
		    			$scope.setcomModal('F', 'Error Fatal', 'Respuesta de sistema inesperada o incorrecta');
		    		}
				};
				var failFn = function (result) {
//		        	alert('Failed Service');
		        	$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
		        };
		        RestRs.getJsonResp(uriRoot+'.C', jsReq).success(successFn).error(failFn);
			}
			else {
				$scope.bErrorMsg=true;
				$scope.modalMsg = 'El nombre es requerido';
				$scope.disableBtns = false;
				return;
			}
		};
		
		$scope.updBranch = function(){
			console.log('<updBranch> ');
			console.log('$scope.branchTmp: ', $scope.branchTmp );
			if($scope.branchTmp.nombre){
				var jsReq={idSucursal:$scope.branchTmp.idSucursal, nombre:$scope.branchTmp.nombre};
				if($scope.branchTmp.ubicacion){
					jsReq.ubicacion = $scope.branchTmp.ubicacion;
				}
				
				var successFn = function(result){
					console.log('result: ', result );
		    		if ( typeFatal(result) ) {
		    			//alert('error Fatal!!!! ' + (result.message!=undefined?': '+result.message:''));
		    			$scope.setcomModal('F', 'Error fatal', 
		    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
		    		}
		    		else if(!Array.isArray(result)){
		    			if(result.code!=undefined && result.code=='S002'){//Formato de Respuesta UPDATE esperado
		    				$scope.branchCopy.nombre = $scope.branchTmp.nombre;
		    				if($scope.branchTmp.ubicacion){
		    					$scope.branchCopy.ubicacion = $scope.branchTmp.ubicacion;
		    				}
		    				$scope.setcomModal('S', 'Actualizado', result.message!=undefined?result.message:'Se actualizó correctamente');
		    				$scope.branchTmp = {};
		    			}
		    			else{
		    				$scope.bErrorMsg=true;
		    				$scope.modalMsg = 'Error al actualizar los datos';
		    				$scope.setcomModal('E', 'Actualizado', result.message!=undefined?result.message:'Error al actualizar los datos');
		    			}
		    		}
		    		else{ //Respuesta inesperada o incorrecta
//		    			alert('Fallo');
		    			$scope.bErrorMsg=true;
		    			$scope.modalMsg = 'Respuesta inesperada o incorrecta';
		    			$scope.setcomModal('F', 'Error Fatal', 'Respuesta de sistema inesperada o incorrecta');
		    		}
				};
				var failFn = function (result) {
//		        	alert('Failed Service');
		        	$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
		        };
		        RestRs.getJsonResp(uriRoot+'.U', jsReq).success(successFn).error(failFn);
			}
			else {
				$scope.bErrorMsg=true;
				$scope.modalMsg = 'Existen datos faltantes';
				$scope.disableBtns = false;
				return;
			}
		};
		
		$scope.confirmDel = function(){
			console.log('confirmDel()');
			$scope.confDel = true;
		};
		
		$scope.delBranch = function(){
			console.log('delBranch()');
			console.log('$scope.branchTmp: ', $scope.branchTmp );
			var jsReq={idSucursal:$scope.branchTmp.idSucursal};
			
			var successFn = function(result){
				console.log('result: ', result );
				if ( typeFatal(result) ) {
	    			$scope.setcomModal('F', 'Error fatal', 
	    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
	    		}else if(!Array.isArray(result)){
	    			if(result.code!=undefined && result.code=='S004'){//Formato de Respuesta esperado
//	    				alert('Correctamente eliminado');
	    				$scope.setcomModal('S', 'Eliminado', result.message!=undefined?result.message:'Se eliminó correctamente');
	    				$scope.findAndRemove($scope.sucursales, 'idSucursal', result.idSucursal);
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
//	        	alert('Failed Service');
	        	$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
	        };
	        RestRs.getJsonResp(uriRoot+'.D', jsReq).success(successFn).error(failFn);
			
		}
}])
/* ************************************************************************************ */
.controller('tecnicoCtrl', ['$scope', '$route', '$filter', 'RestRs',
	function($scope, $route, $filter, RestRs) {
		console.log('tecnicoCtrl...');
		document.title = 'Listado de Técnicos de Atención';
		
		$scope.cArea = [];
		$scope.cRol = [];
		$scope.cSucursal = [];
		$scope.zeroSucursal = false;
		$scope.zeroUsuario = false;
		$scope.orderTecn='id';
		$scope.usuarios = [];
		$scope.mdTitle = 'Técnico';
		var uriRoot = 'TECHNICIAN';
		
		$scope.fIdSucursal = '-1';
		$scope.fIdRol = '-1';
		$scope.selUsuario = '0';
		$scope.tecnicoTmp = {};
		$scope.confDel = false;
		$scope.disableBtns = false;
		
		console.log('$scope.tecnicos: ', $scope.tecnicos);
		if($scope.tecnicos!=undefined && $scope.tecnicos.length>=0){
			$scope.numId($scope.tecnicos, 'idTecnicoAtencion');
		}
		if($scope.usuarioDisp==undefined || $scope.usuarioDisp==0){
			alert('No hay usuarios inscritos para asignar como Técnicos');
			$scope.zeroUsuario = true;
		}
		
		/* Carga los catálogos los arreglos para selects en la vista */
		console.log('$scope.catalogos: ', $scope.catalogos);
		if($scope.catalogos!=undefined){
			console.log('se busca catalogo de area');
			$.each($scope.catalogos, function(i, item) {
				console.log('item.nombre: ', item.nombre );
				if(item.nombre=='Area'){
					$scope.cArea = item.lista;
					console.log('Se cargo Catálogo de Área: ', $scope.cArea );
				}
				if(item.nombre=='Sucursal'){
					$scope.cSucursal = item.lista;
					console.log('Se cargo Catálogo de Sucursal: ', $scope.cSucursal );
					if($scope.cSucursal.length<1){
						$scope.zeroSucursal = true;
					}
				}
				if(item.nombre=='Rol'){
					$scope.cRol = item.lista;
					console.log('Se cargo Catálogo de Rol: ', $scope.cRol );
				}
			});
		}
		
		/* FUNCIONALIDAD */
		$scope.resetForm = function(){
			$scope.toggleSearch();
			$scope.fIdSucursal = '-1';
			$scope.fIdRol = '-1';
			$scope.selUsuario = '0';
			$scope.usuarios = [];
			$scope.tecnicoTmp = {};
			$scope.modalMsg = '';
			$scope.confDel = false;
			$scope.disableBtns = false;
		};
		
		$scope.setAdd = function(){
			console.log('<setAdd> ');
			$scope.resetForm();
			$('#mdAdd').modal('show');
		};
		
		
		/**
		 * Se encarga de buscar y cargar usuarios según criterios de busqueda (No funciono en MainController, desfasaba respuesta)
		 */
		$scope.search = function(){
			console.log('$scope.fIdSucursal: ', $scope.fIdSucursal );
			console.log('$scope.fIdRol: ', $scope.fIdRol);
			$scope.modalMsg = '';
			if(($scope.fIdRol=='-1' ||$scope.fIdRol==undefined ) &&
					($scope.fIdSucursal=='-1' ||$scope.fIdSucursal==undefined ) ){
				//Al menos debe definir un parámetro
				$scope.modalMsg = 'Es requerido definir al menos un parámetro';
			}else{
				var pUriCode= 'USUARIO.G';
				var idUsuario = '0';
				var jsReq={idUsuario:idUsuario};
				
				if($scope.fIdRol!='-1'){
					jsReq.idRol = $scope.fIdRol;
				}
				if($scope.fIdSucursal!='-1'){
					jsReq.idSucursal = $scope.fIdSucursal;
				}
				console.log('BUscando usuarios para idUsuario: ', idUsuario );
						    	
		    	var successFn = function(result){
		    		console.log('result: ', result );
		    		$scope.usuarios = result;
		        	console.log('usuarios: ', $scope.usuarios );
		        	if($scope.usuarios.length==0){
		        		$scope.modalMsg = 'No hay resultados, intente con otros parámetros';
		        	}
		    	};
		        var failFn = function (result) {
		        	alert('Failed Service');
		        	$scope.usuarios = [];
		        };
		        $('#lsUsuario').collapse('show');
		    	RestRs.getJsonResp(pUriCode, jsReq).success(successFn).error(failFn);
			}
		};
		
		$scope.setUsuario = function(usuario){
			console.log('<setUsuario> usuario: ', usuario );
			//Toggle sobre lista de Usuarios
			$scope.tecnicoTmp = {idUsuario:usuario.idUsuario, idArea:'-1', 
					idSucursal:usuario.idSucursal, 
					nombrecompleto:(usuario.nombre+' '+usuario.apellidos)};
			$('#lsUsuario').collapse('toggle'); //Ocultar listado/Busqueda
			$('#tecnSel').collapse('show');
		};
		
		$scope.toggleSearch = function(){
			$('#lsUsuario').collapse('show');
			$('#tecnSel').collapse('toggle');
		};
		
		$scope.createTecn= function(){
			console.log('<createTecn> $scope.tecnicoTmp: ', $scope.tecnicoTmp );
			if(!$scope.tecnicoTmp.idArea || $scope.tecnicoTmp.idArea==-1){
				$scope.modalMsg = 'Es requerido seleccionar el área';
			}
			else{
				if(!$scope.tecnicoTmp.idSucursal || $scope.tecnicoTmp.idSucursal==-1){
					$scope.modalMsg = 'Es requerido seleccionar sucursal';
				}
				else{
					//Creando nuevo Tecnico
					var jsReq = {idUsuario:$scope.tecnicoTmp.idUsuario, 
			        		idArea:$scope.tecnicoTmp.idArea, 
			        		idSucursal:$scope.tecnicoTmp.idSucursal, 
			        		nombrecompleto:$scope.tecnicoTmp.nombrecompleto};
					
					var successFn = function(result){
						console.log('result: ', result );
						if ( typeFatal(result) ) {
			    			$scope.setcomModal('F', 'Error fatal', 
			    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
			    		}
						else if(!Array.isArray(result)){
							if(result.code!=undefined && result.code=='S001'){//Formato de Respuesta CREATE esperado
								jsReq.idTecnicoAtencion=result.idTecnicoAtencion;	
								jsReq.id=parseInt(result.idTecnicoAtencion);
								jsReq.lbArea=$filter('obtieneDesc')(jsReq.idArea, $scope.cArea);
								jsReq.lbSucursal=$filter('obtieneDesc')(jsReq.idSucursal, $scope.cSucursal);
								
								$scope.tecnicos.push(angular.copy(jsReq));
								$scope.resetForm();
								$scope.modalMsg = 'Se Generó correctamente';
			    				$scope.setcomModal('S', 'Nuevo Técnico', result.message!=undefined?result.message:'Se generó correctamente');
							}
							else{
			    				$scope.bErrorMsg=true;
			    				$scope.modalMsg = 'Error al insertar los datos';
			    				$scope.setcomModal('E', 'Error', result.message!=undefined?result.message:'Error al insertar los datos');
			    			}
						}
						else{ //Respuesta inesperada o incorrecta
//			    			alert('Fallo');
			    			$scope.bErrorMsg=true;
			    			$scope.modalMsg = 'Respuesta inesperada o incorrecta';
			    			$scope.setcomModal('F', 'Error Fatal', 'Respuesta de sistema inesperada o incorrecta');
			    		}
						
					};
					var failFn = function (result) {
			        	$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
			        };
					
			        RestRs.getJsonResp(uriRoot+'.C', jsReq).success(successFn).error(failFn);					
				}
			}
		};
		
		$scope.setEdit = function(tecnico){
			console.log('<setEdit>');
			$scope.resetForm();
			$scope.tecnicoTmp = tecnico;
			$('#mdUpd').modal('show');
		};		
		
		$scope.confirmDel = function(){
			console.log('confirmDel()');
			$scope.confDel = true;
		};
		
		$scope.tecnicoCopy = undefined;
		$scope.updateTecn = function(){
			console.log('<updateTecn> ');
			console.log(' $scope.tecnicoTmp: ', $scope.tecnicoTmp);
			if(!$scope.tecnicoTmp.idArea || $scope.tecnicoTmp.idArea==-1){
				$scope.modalMsg = 'Es requerido seleccionar el área';
			}
			else{
				if(!$scope.tecnicoTmp.idSucursal || $scope.tecnicoTmp.idSucursal==-1){
					$scope.modalMsg = 'Es requerido seleccionar sucursal';
				}
				else{
					//Actualizando Tecnico
					$scope.tecnicoCopy = $scope.tecnicoTmp;
					var jsReq = angular.copy($scope.tecnicoTmp);
					var successFn = function(result){
						console.log('result: ', result );
						if ( typeFatal(result) ) {
			    			//alert('error Fatal!!!! ' + (result.message!=undefined?': '+result.message:''));
			    			$scope.setcomModal('F', 'Error fatal', 
			    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
			    		}
			    		else if(!Array.isArray(result)){
			    			if(result.code!=undefined && result.code=='S002'){//Formato de Respuesta UPDATE esperado
			    				$scope.tecnicoCopy.idTecnicoAtencion = $scope.tecnicoTmp.idTecnicoAtencion;
			    				$scope.tecnicoCopy.idUsuario=$scope.tecnicoTmp.idUsuario;
			    				$scope.tecnicoCopy.idArea=$scope.tecnicoTmp.idArea;
			    				$scope.tecnicoCopy.idSucursal=$scope.tecnicoTmp.idSucursal;
			    				$scope.tecnicoCopy.nombrecompleto=$scope.tecnicoTmp.nombrecompleto;
			    				$scope.tecnicoCopy.lbArea=$filter('obtieneDesc')($scope.tecnicoTmp.idArea, $scope.cArea);
			    				$scope.tecnicoCopy.lbSucursal=$filter('obtieneDesc')($scope.tecnicoTmp.idSucursal, $scope.cSucursal);
			    				$scope.setcomModal('S', 'Actualizado', result.message!=undefined?result.message:'Se actualizó correctamente');
			    				$scope.tecnicoTmp = {};
			    			}
			    			else{
			    				$scope.bErrorMsg=true;
			    				$scope.modalMsg = 'Error al actualizar los datos';
			    				$scope.setcomModal('E', 'Actualizado', result.message!=undefined?result.message:'Error al actualizar los datos');
			    			}
			    		}
			    		else{ //Respuesta inesperada o incorrecta
			    			$scope.bErrorMsg=true;
			    			$scope.modalMsg = 'Respuesta inesperada o incorrecta';
			    			$scope.setcomModal('F', 'Error Fatal', 'Respuesta de sistema inesperada o incorrecta');
			    		}
					};
					var failFn = function (result) {
			        	$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
			        };
			        RestRs.getJsonResp(uriRoot+'.U', jsReq).success(successFn).error(failFn);
				}
			}
		};
		
		$scope.deleteTecn = function(){
			console.log('<deleteTecn>');
			console.log(' $scope.tecnicoTmp: ', $scope.tecnicoTmp);
			var jsReq={idTecnicoAtencion:$scope.tecnicoTmp.idTecnicoAtencion};
			var successFn = function(result){
				console.log('result: ', result );
				if ( typeFatal(result) ) {
	    			$scope.setcomModal('F', 'Error fatal', 
	    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
	    		}
				else if(!Array.isArray(result)){
	    			if(result.code!=undefined && result.code=='S004'){//Formato de Respuesta esperado
	    				$scope.setcomModal('S', 'Eliminado', result.message!=undefined?result.message:'Se eliminó correctamente');
	    				$scope.findAndRemove($scope.tecnicos, 'idTecnicoAtencion', result.idTecnicoAtencion);
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
}])
/* ***************************************************************************** */
.controller('tipoTicketCtrl', ['$scope', '$route', '$filter', 'RestRs',
	function($scope, $route, $filter, RestRs) {
		console.log('tipoTicketCtrl...');
		document.title = 'Administración de Tipo de solicitud';
		
		$scope.zeroTipoSoporte = false;
		$scope.orderTipSop='id';
		$scope.mdTitle='';
		$scope.tipoTickTmp = {};
		$scope.tipoTickCopy = {};
		$scope.confDel = false;
		$scope.disableBtns = false;
		var uriRoot = 'TICKETTYPE';
		
		if($scope.tipoTickets.length>0){
			console.log('numerando $scope.tipoTickets: ', $scope.tipoTickets );
			$scope.numId($scope.tipoTickets, 'idTipoTicket');
		}
		
		$scope.cTipoSoporte = [];
		/* Carga los catálogos los arreglos para selects en la vista */
		console.log('$scope.catalogos: ', $scope.catalogos);
		if($scope.catalogos!=undefined){
			console.log('se busca catalogo de area');
			$.each($scope.catalogos, function(i, item) {
				console.log('item.nombre: ', item.nombre );
				if(item.nombre=='TipoSoporte'){
					$scope.cTipoSoporte = item.lista;
					console.log('Se cargo Catálogo de TipoSoporte: ', $scope.cTipoSoporte );
					if($scope.cTipoSoporte.length==0){
						$scope.zeroTipoSoporte = true;
					}
				}
			});
		}
		
		/* Funcionalidad */
		$scope.setAdd = function(){
			console.log('<setAdd> ');
						
			$scope.modalMsg = '';
			$scope.tipoTickTmp = {idTipoSoporte:'-1'};
			$scope.tipoTickCopy = {};
			$scope.confDel = false;
			$scope.disableBtns = false;
			
			$scope.tipoTickTmp.edit=false;
			$('#mdTicketTiype').modal('show');
		};
		
		$scope.confirmDel = function(){
			console.log('confirmDel()');
			$scope.confDel = true;
		};
		$scope.setEdit = function(tipoTicket){
			console.log('<setEdit> tipoTicket: ', tipoTicket);
			$scope.tipoTickTmp = angular.copy(tipoTicket);
			$scope.tipoTickCopy = tipoTicket;
			$scope.modalMsg = '';
			$scope.confDel = false;
			$scope.disableBtns = false;

			$scope.tipoTickTmp.edit=true;
			$('#mdTicketTiype').modal('show');
		};
		/* persistencia */
		$scope.creaTipoTicket = function(){
			console.log('<creaTipoTicket> ');
			console.log('$scope.tipoTickTmp: ', $scope.tipoTickTmp );
			if($scope.tipoTickTmp.idTipoSoporte && $scope.tipoTickTmp.idTipoSoporte!='-1'){
				if($scope.tipoTickTmp.etiqueta && $scope.tipoTickTmp.etiqueta!=''){

					var jsReq={idTipoSoporte:$scope.tipoTickTmp.idTipoSoporte, etiqueta:$scope.tipoTickTmp.etiqueta};
					if($scope.tipoTickTmp.descripcion){
						jsReq.descripcion = $scope.tipoTickTmp.descripcion;
					}
					
					var successFn = function(result){
						console.log('result: ', result );
			    		if ( typeFatal(result) ) {
			    			$scope.setcomModal('F', 'Error fatal', 
			    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
			    		}
			    		else if(!Array.isArray(result)){
			    			if(result.code!=undefined && result.code=='S001'){//Formato de Respuesta CREATE esperado
			    				var idTipoTicket = result.idTipoTicket;
			    				$scope.tipoTickets.push(
			    						{idTipoTicket:idTipoTicket, idTipoSoporte:$scope.tipoTickTmp.idTipoSoporte, etiqueta:$scope.tipoTickTmp.etiqueta, descripcion:$scope.tipoTickTmp.descripcion });
			    				$scope.tipoTickTmp = {};
			    				$scope.setcomModal('S', 'Nuevo Tipo Ticket Creado', result.message!=undefined?result.message:'Se insertó correctamente');
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
					var failFn = function (result) {
			        	$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
			        };
			        RestRs.getJsonResp(uriRoot+'.C', jsReq).success(successFn).error(failFn);
				}
				else {
					$scope.bErrorMsg=true;
					$scope.modalMsg = 'El concepto es requerido';
					$scope.disableBtns = false;
					return;
				}
			}
			else {
				$scope.bErrorMsg=true;
				$scope.modalMsg = 'El Tipo de Soporte es requerido';
				$scope.disableBtns = false;
				return;
			}
		};
		
		/**
		 * Actualizar registro
		 */
		$scope.updTipoTicket = function(){
			console.log('<updTipoTicket> ');
			console.log('$scope.tipoTickTmp: ', $scope.tipoTickTmp );
			if($scope.tipoTickTmp.idTipoSoporte && $scope.tipoTickTmp.idTipoSoporte!='-1'){
				if($scope.tipoTickTmp.etiqueta && $scope.tipoTickTmp.etiqueta!=''){
					var jsReq={idTipoTicket:$scope.tipoTickTmp.idTipoTicket,
							idTipoSoporte:$scope.tipoTickTmp.idTipoSoporte, etiqueta:$scope.tipoTickTmp.etiqueta};
					if($scope.tipoTickTmp.descripcion!=undefined){
						jsReq.descripcion = $scope.tipoTickTmp.descripcion;
					}
					
					var successFn = function(result){
						console.log('result: ', result );
			    		if ( typeFatal(result) ) {
			    			$scope.setcomModal('F', 'Error fatal', 
			    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
			    		}
			    		else if(!Array.isArray(result)){
			    			if(result.code!=undefined && result.code=='S002'){//Formato de Respuesta UPDATE esperado
			    				$scope.tipoTickCopy.idTipoSoporte = $scope.tipoTickTmp.idTipoSoporte;
			    				$scope.tipoTickCopy.etiqueta=$scope.tipoTickTmp.etiqueta;
			    				$scope.tipoTickCopy.descripcion=$scope.tipoTickTmp.descripcion;
			    				
			    				$scope.setcomModal('S', 'Actualizado', result.message!=undefined?result.message:'Se actualizó correctamente');
			    				$scope.tipoTickTmp = {};
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
//			        	alert('Failed Service');
			        	$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
			        };
			        RestRs.getJsonResp(uriRoot+'.U', jsReq).success(successFn).error(failFn);
				}
				else {
					$scope.bErrorMsg=true;
					$scope.modalMsg = 'El Concepto es requerido';
					$scope.disableBtns = false;
					return;
				}
				
			}
			else {
				$scope.bErrorMsg=true;
				$scope.modalMsg = 'El Tipo de Soporte es requerido';
				$scope.disableBtns = false;
				return;
			}
		};
		
		/**
		 * Elimina el registro de la base, y si es exitoso, manda a eliminar el objeto en angular
		 */
		$scope.delTipoTicket = function(){
			console.log('delTipoTicket()');
			console.log('$scope.tipoTickTmp: ', $scope.tipoTickTmp );
			var jsReq={idTipoTicket:$scope.tipoTickTmp.idTipoTicket};
			
			var successFn = function(result){
				console.log('result: ', result );
				if ( typeFatal(result) ) {
	    			$scope.setcomModal('F', 'Error fatal', 
	    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
	    		}else if(!Array.isArray(result)){
	    			if(result.code!=undefined && result.code=='S004'){//Formato de Respuesta esperado
	    				$scope.setcomModal('S', 'Eliminado', result.message!=undefined?result.message:'Se eliminó correctamente');
	    				$scope.findAndRemove($scope.tipoTickets, 'idTipoTicket', result.idTipoTicket);
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
//	        	alert('Failed Service');
	        	$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
	        };
	        RestRs.getJsonResp(uriRoot+'.D', jsReq).success(successFn).error(failFn);
			
		};
		
		
}])
;
