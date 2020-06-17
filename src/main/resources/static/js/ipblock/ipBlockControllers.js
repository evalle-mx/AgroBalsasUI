'use strict';

/* Controllers */
var ipBlockControllers = angular.module('ipBlockControllers', []);

ipBlockControllers

.controller('ipBlockCtrl', ['$scope', '$routeParams', '$rootScope', 'RestRs',
       function($scope, $routeParams, $rootScope, RestRs) {
			activeMenu('lkticket');
			console.log('<ipBlockCtrl>');
			var uriRoot='TICKET';
			var myIdUsuario = $('#usrId').val();
			
			$rootScope.session = {idUsuario:myIdUsuario};			
			console.log('myIdUsuario: ', myIdUsuario );
			
			$scope.successAdd = false;
			$scope.errorAdd = false;
			$scope.showForm = true;
			$scope.tmpTicket = {idUsuario:myIdUsuario};
			
			$scope.searchTick = {idTipoTicket:'-1', idEstatus:'-1', idTecnico:'-1'};
			
			/**
			 * Prepara el modal para agregar nuevo Ticket
			 */
			$scope.setAdd = function(){
				console.log('reiniciando formulario');
				$scope.tmpTicket = {idUsuario:myIdUsuario};
				$scope.successAdd = false;
				$scope.errorAdd = false;
				$scope.showForm = true;
			};
			
			/* proceso para agregar ticket */
			$scope.saveTicket = function(){
				console.log('Agregar ticket: ', $scope.tmpTicket );
				var pUriCode=uriRoot+'.C';
//				$scope.mdClass = '';
				//$scope.modalMsg = '';
				$scope.mainMsg = '';
				var completo = true;
				//Validar
				if($scope.tmpTicket.idUsuario==undefined || $scope.tmpTicket.idUsuario==''){
					completo = false;				
				}
				if($scope.tmpTicket.idTipoTicket==undefined || $scope.tmpTicket.idTipoTicket==''){
					completo = false;
				}
				if($scope.tmpTicket.descripcion==undefined || $scope.tmpTicket.descripcion==''){
					completo = false;
				}
//				if($scope.tmpTicket.comentario==undefined || $scope.tmpTicket.comentario==''){
//					completo = false;
//				}
				
				//Proceso
				if(completo){
					console.log('Tiene los datos requeridos para Create');
					var successFn = function(result){
			    		console.log('result: ', result );
			    		if(!Array.isArray(result)){
			    			if(result.code!=undefined){// Formato de respuesta esperado
			    				if(result.idTicket!=undefined){//Resṕuesta correcta
				    				$scope.mainMsg = 'Se Creó correctamente el Ticket!';
//				    				$scope.mdClass = 'tk-success';
				    				$scope.successAdd = true;
				    				$scope.showForm = false;
				    			}
			    				else{
			    					$scope.errorAdd = true;
			    					$scope.mainMsg = 'Error al agregar ' + (result.message!=undefined?': '+result.message:'');
//				    				$scope.mdClass = 'tk-error';
			    				}
			    			}
			    		}
			    		else{ //Respuesta inesperada o incorrecta
			    			alert('Fallo el servicio');
			    			//TODO mostrar Modal de Error común
			    		}
			    	};;
					var failFn = function (result) {
			        	alert('failFn Service');
			        	//TODO mostrar el error en Modal General
			        };;
					var jsReq = {idUsuario:$scope.tmpTicket.idUsuario, idTipoTicket:$scope.tmpTicket.idTipoTicket};
					if($scope.tmpTicket.idTipoEstatus!=undefined && $scope.tmpTicket.idTipoEstatus!=''){
						jsReq.idTipoEstatus = $scope.tmpTicket.idTipoEstatus;
					}
					if($scope.tmpTicket.descripcion!=undefined && $scope.tmpTicket.descripcion!=''){
						jsReq.descripcion = $scope.tmpTicket.descripcion;
					}
					if($scope.tmpTicket.idTecnicoAtencion!=undefined && $scope.tmpTicket.idTecnicoAtencion!=''){
						jsReq.idTecnicoAtencion = $scope.tmpTicket.idTecnicoAtencion;
					}
					if($scope.tmpTicket.calificacion!=undefined && $scope.tmpTicket.calificacion!=''){
						jsReq.calificacion = $scope.tmpTicket.calificacion;
					}
					if($scope.tmpTicket.comentario!=undefined && $scope.tmpTicket.comentario!=''){
						jsReq.comentario = $scope.tmpTicket.comentario;
					}
					jsReq.idTipoEstatus = idTipoEstatusCreate;
					console.log('jsReq: ', jsReq );
					RestRs.getJsonResp(pUriCode, jsReq).success(successFn).error(failFn);	
				}else{
					$scope.errorAdd = true;
					$scope.mainMsg = 'Existen datos requeridos faltantes';
//					$scope.mdClass = 'tk-error';
				}
			};
			
			
			/* Busqueda por parámetros */
			$scope.loadTickets = function(){
				console.log('Cargando información');
				var pUriCode='TICKET.G';
				console.log('Buscando tickets por parametros: ', $scope.searchTick);
				var jsReq={idUsuario:$scope.idUsuario};
				if($scope.searchTick.idUsuario!=undefined){
					jsReq.idUsuario = $scope.searchTick.idUsuario;
				}
				if($scope.searchTick.idTipoTicket!=undefined){
					jsReq.idTipoTicket = $scope.searchTick.idTipoTicket;
				}
				if($scope.searchTick.idTipoEstatus!=undefined){
					jsReq.idTipoEstatus = $scope.searchTick.idTipoEstatus;
				}
				if($scope.searchTick.idTecnicoAtencion!=undefined){
					jsReq.idTecnicoAtencion = $scope.searchTick.idTecnicoAtencion;
				}
		    	
		    	var successFn = function(result){
		    		console.log('result: ', result );
		    		if(typeFatal(result) || (result.type!=undefined && result.type=='E') ){
		    			//Error fatal
		    			alert('Error al solicitar los Tickets');
		    		}else{
		    			$scope.tickets = result;
			        	console.log('$scope.tickets: ', $scope.tickets );
						if($scope.tickets.length>0){
							$scope.numId($scope.tickets, 'idTicket');
						}
		    		}
		    	};
		        var failFn = function (result) {
		        	alert('Fallo en el Servicio REST');
		        };
		    	RestRs.getJsonResp(pUriCode, jsReq).success(successFn).error(failFn);
			};
			
}])                        		
.controller('listPackCtrl', ['$scope', '$route', '$filter','RestRs',
	function($scope, $route, $filter, RestRs) {

		var uriRoot='TICKET';
		$scope.modalMsg = '';
		$scope.mdClass= '';		
		$scope.showConfDiv = false;
		$scope.orderProp = 'id';
		$scope.idUsuario = $('#usrId').val();
	    $scope.tmpTicket = {};
	    $scope.copyTicket = {};
	    $scope.searchTick = { idTipoTicket:'-1', 
	        		idTipoEstatus:'-1', idTecnicoAtencion:'-1' };
	    
	    console.log('$scope.tickets: ', $scope.tickets);
		if($scope.tickets.length>0){
			$scope.tickets.forEach(function(item, index) {
				item.id = parseInt(item.idTicket);
				item.fAlta = new Date(item.fechaAlta);
					//$filter('date')(new Date(item.fechaAlta),'yyyy-MM-dd HH:mm:ss');
				//2018-05-18 18:30:01
			});
		}
		
		$scope.cTipoTicket = [];
		$scope.cEstatus = [];
		$scope.cArea = [];
		$scope.cTecnico = [];//*/ TODO llamarlo al seleccionar cArea
				
		/* Carga los catálogos los arreglos para selects en la vista */
		console.log('$scope.catalogos: ', $scope.catalogos);
		if($scope.catalogos!=undefined){
			console.log('se busca catalogo de area');
			$.each($scope.catalogos, function(i, item) {
				console.log('item.nombre: ', item.nombre );
				if(item.nombre=='TipoTicket'){
					$scope.cTipoTicket = item.lista;
					console.log('Se cargo Catálogo de Tipo Ticket: ', $scope.cTipoTicket );
				}
				else if(item.nombre=='Area'){
					$scope.cArea = item.lista;
					console.log('Se cargo Catálogo de Área: ', $scope.cArea );
				}
				else if(item.nombre=='TipoEstatus'){
					$scope.cEstatus = item.lista;
					console.log('Se cargo Catálogo de TipoEstatus: ', $scope.cEstatus );
				}
				else if(item.nombre=='TecnicoAtencion'){ //TODO hacerlo por demanda al cambiar area/tiposoporte
					$scope.cTecnico = item.lista;
					console.log('Se cargo Catálogo de TecnicoAtencion: ', $scope.cTecnico );
				}
			});
		}
		
		/* FUNCIONALIDAD */
        var commonFailFn = function (result) {
//        	alert('commonFailFn Service');
        	$scope.setcomModal('F', 'Error Fatal', 'Error al enviar mensaje AJAX, Verifique con su Administrador');
        };
        var successDelFn = function(result){
    		console.log('result: ', result );
    		if(!Array.isArray(result)){
    			if(result.code!=undefined ){// Formato de respuesta esperado
    				if(result.type!=undefined && result.type=='I'){//Resṕuesta correcta
	    				//alert('Se Eliminó correctamente el Ticket!');
	    				//$route.reload();
	    				$scope.modalMsg = 'Se Eliminó correctamente el Ticket!';
	    				$scope.mdClass = 'tk-success';
	    				$scope.showConfDiv = false;
	    				//$('#mdTicket').modal('hide');
	    			}
    				else{
    					$scope.modalMsg = 'Error al agregar ' + (result.message!=undefined?': '+result.message:'');
    					$scope.mdClass = 'tk-error';
    				}
    			}
    		}
    		else{ //Respuesta inesperada o incorrecta
    			alert('Fallo el servicio');
    			//TODO mostrar Modal de Error común
    		}
    	};
        
        
        
        /* Busqueda por parámetros */
		$scope.loadTickets = function(){
			console.log('Cargando información');
			var pUriCode='TICKET.G';
			console.log('Buscando tickets por parametros: ', $scope.searchTick);
			//TODO modal de ESPERE
			var jsReq={idAdmin:$scope.idUsuario};
//			if($scope.searchTick.idUsuario!=undefined){
//				jsReq.idUsuario = $scope.searchTick.idUsuario;
//			}
			if($scope.searchTick.idTipoTicket!=undefined && $scope.searchTick.idTipoTicket!='-1'){
				jsReq.idTipoTicket = $scope.searchTick.idTipoTicket;
			}
			if($scope.searchTick.idTipoEstatus!=undefined && $scope.searchTick.idTipoEstatus!='-1'){
				jsReq.idTipoEstatus = $scope.searchTick.idTipoEstatus;
			}
			if($scope.searchTick.idTecnicoAtencion!=undefined && $scope.searchTick.idTecnicoAtencion!='-1'){
				jsReq.idTecnicoAtencion = $scope.searchTick.idTecnicoAtencion;
			}
	    	
	    	var successFn = function(result){
	    		console.log('result: ', result );
	    		if(typeFatal(result) || (result.type!=undefined && result.type=='E') ){
	    			//Error fatal
	    			alert('Error al solicitar los Tickets');
	    		}else{
	    			$scope.tickets = result;
		        	console.log('$scope.tickets: ', $scope.tickets );
					if($scope.tickets.length>0){
						$scope.numId($scope.tickets, 'idTicket');
					}
	    		}
	    	};
	        var failFn = function (result) {
	        	alert('Fallo en el Servicio REST');
	        };
	    	RestRs.getJsonResp(pUriCode, jsReq).success(successFn).error(failFn);
		};
		/* generar Modal de TIcket */
		$scope.setMdTicket = function(ticket){
			console.log('<setMdTicket>');
			$scope.showConfDiv = false;
			$scope.mdClass = '';
			$scope.modalMsg = '';
			if(ticket==undefined || ticket == null){
				$scope.tmpTicket = {idUsuario: $scope.idUsuario, idTipoTicket: '-1', idTipoEstatus:'1'};
			}
			else{
				$scope.tmpTicket = angular.copy(ticket);
				$scope.copyTicket = ticket;
				$scope.tmpTicket.idUsuario = $scope.idUsuario;
			}			
			console.log('Crear/Editar Ticket');
		
			$('#mdTicket').modal('show');
		};
		
		/* proceso para agregar ticket */
		$scope.saveTicket = function(){
			console.log('Agregar ticket: ', $scope.tmpTicket );
			var pUriCode=uriRoot+'.C';
			$scope.mdClass = '';
			$scope.modalMsg = '';
			$scope.mainMsg = '';
			var completo = true;
			//Validar
			if($scope.tmpTicket.idUsuario==undefined || $scope.tmpTicket.idUsuario==''){
				completo = false;				
			}
			if($scope.tmpTicket.idTipoTicket==undefined || $scope.tmpTicket.idTipoTicket==''){
				completo = false;
			}
			if($scope.tmpTicket.descripcion==undefined || $scope.tmpTicket.descripcion==''){
				completo = false;
			}
//			if($scope.tmpTicket.comentario==undefined || $scope.tmpTicket.comentario==''){
//				completo = false;
//			}
			
			//Proceso
			if(completo){
				console.log('Tiene los datos requeridos para Create');
				var successFn = function(result){
		    		console.log('result: ', result );
		    		if ( typeFatal(result) ) {
		    			$scope.setcomModal('F', 'Error fatal', 
		    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
		    		}
		    		else if(!Array.isArray(result)){
		    			if(result.code!=undefined && result.code=='S001'){//Formato de Respuesta CREATE esperado
//		    				var idUsuario = result.idUsuario;
//		    				var nuevo = angular.copy($scope.tmpTicket);
//		    				nuevo.idTicket = result.idTicket;
//		    				$scope.tickets.push(nuevo);
		    				$scope.tmpTicket = {};
		    				$scope.setcomModal('S', 'Nuevo Usuario agregado', result.message!=undefined?result.message:'Se insertó correctamente');

		    				$route.reload();
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
				
				var jsReq = {idUsuario:$scope.tmpTicket.idUsuario, idTipoTicket:$scope.tmpTicket.idTipoTicket};
				if($scope.tmpTicket.idTipoEstatus!=undefined && $scope.tmpTicket.idTipoEstatus!=''){
					jsReq.idTipoEstatus = $scope.tmpTicket.idTipoEstatus;
				}
				if($scope.tmpTicket.descripcion!=undefined && $scope.tmpTicket.descripcion!=''){
					jsReq.descripcion = $scope.tmpTicket.descripcion;
				}
				if($scope.tmpTicket.idTecnicoAtencion!=undefined && $scope.tmpTicket.idTecnicoAtencion!=''){
					jsReq.idTecnicoAtencion = $scope.tmpTicket.idTecnicoAtencion;
				}
				if($scope.tmpTicket.calificacion!=undefined && $scope.tmpTicket.calificacion!=''){
					jsReq.calificacion = $scope.tmpTicket.calificacion;
				}
				if($scope.tmpTicket.comentario!=undefined && $scope.tmpTicket.comentario!=''){
					jsReq.comentario = $scope.tmpTicket.comentario;
				}
				jsReq.idTipoEstatus = idTipoEstatusCreate;
				console.log('jsReq: ', jsReq );
				RestRs.getJsonResp(pUriCode, jsReq).success(successFn).error(failFn);	
			}else{
				$scope.errorAdd = true;
				$scope.modalMsg = 'Existen datos requeridos faltantes';
				$scope.mdClass = 'tk-error';
			}
		};
		
		/* función para actualizar ticket */
		$scope.updateTicket = function(){
			console.log('Actualizar ticket: ', $scope.tmpTicket );
			var pUriCode='TICKET.U';
			$scope.mdClass = '';
			$scope.modalMsg = '';
			var completo = true;
			//Validar
			if($scope.tmpTicket.idTicket==undefined || $scope.tmpTicket.idTicket==''){
				console.log('idTicket es null');
				completo = false;				
			}
			if($scope.tmpTicket.idTipoTicket==undefined || $scope.tmpTicket.idTipoTicket==''){
				console.log('idTipoTicket es null');
				completo = false;
			}
			if($scope.tmpTicket.descripcion==undefined || $scope.tmpTicket.descripcion==''){
				console.log('descripcion es null');
				completo = false;
			}
			
			//Proceso
			if(completo){
				console.log('Tiene los datos requeridos para Actualizar');
				var successFn = function(result){
					console.log('result: ', result );
		    		if ( typeFatal(result) ) {
		    			$scope.setcomModal('F', 'Error fatal', 
		    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
		    		}
		    		else if(!Array.isArray(result)){
		    			if(result.code!=undefined && result.code=='S002'){//Formato de Respuesta UPDATE esperado
		    				$scope.copyTicket = $scope.tmpTicket;
		    				$scope.setcomModal('S', 'Actualizado', result.message!=undefined?result.message:'Se actualizó correctamente');
		    				$scope.tmpTicket = {};
		    			}
		    		}
	    			else{
	    				$scope.bErrorMsg=true;
	    				$scope.modalMsg = 'Error al actualizar los datos';
	    				$scope.setcomModal('E', 'Actualizado', result.message!=undefined?result.message:'Error al actualizar los datos');
	    			}
				};
				var failFn = commonFailFn;
				var jsReq = {idTicket:$scope.tmpTicket.idTicket, idUsuario:$scope.tmpTicket.idUsuario, idTipoTicket:$scope.tmpTicket.idTipoTicket};
				if($scope.tmpTicket.idTipoEstatus!=undefined && $scope.tmpTicket.idTipoEstatus!=''){
					jsReq.idTipoEstatus = $scope.tmpTicket.idTipoEstatus;
				}
				if($scope.tmpTicket.descripcion!=undefined && $scope.tmpTicket.descripcion!=''){
					jsReq.descripcion = $scope.tmpTicket.descripcion;
				}
				if($scope.tmpTicket.idTecnicoAtencion!=undefined && $scope.tmpTicket.idTecnicoAtencion!=''){
					jsReq.idTecnicoAtencion = $scope.tmpTicket.idTecnicoAtencion;
				}
				if($scope.tmpTicket.calificacion!=undefined && $scope.tmpTicket.calificacion!=''){
					jsReq.calificacion = $scope.tmpTicket.calificacion;
				}
				if($scope.tmpTicket.comentario!=undefined && $scope.tmpTicket.comentario!=''){
					jsReq.comentario = $scope.tmpTicket.comentario;
				}

				RestRs.getJsonResp(pUriCode, jsReq).success(successFn).error(failFn);	
			}else{
				$scope.modalMsg = 'Existen datos requeridos faltantes';
				$scope.mdClass = 'tk-error';
			}
		};
		/* funcion para mostrar elemento de confirmación */
		$scope.confirmDelete = function(){
			$scope.showConfDiv = true;
		};
		
		/* funcion para eliminar ticket (Después de confirmacion) */
		$scope.deleteTicket = function(){
			console.log('Eliminar ticket: ', $scope.tmpTicket );
			var pUriCode='TICKET.D';
			$scope.mdClass = '';
			$scope.modalMsg = '';
			var completo = true;
			//Validar
			if($scope.tmpTicket.idTicket!=undefined || $scope.tmpTicket.idTicket!=''){
				console.log('Tiene los datos requeridos para Eliminar');
				
				var successFn = function(result){
					console.log('result: ', result );
					if ( typeFatal(result) ) {
		    			$scope.setcomModal('F', 'Error fatal', 
		    					result.message!=undefined?': '+result.message:'Respuesta de sistema inesperada o incorrecta');
		    		}else if(!Array.isArray(result)){
		    			if(result.code!=undefined && result.code=='S004'){//Formato de Respuesta esperado
		    				$scope.setcomModal('S', 'Eliminado', result.message!=undefined?result.message:'Se eliminó correctamente');
		    				$scope.findAndRemove($scope.tickets, 'idTicket', result.idTicket);
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
				var failFn = commonFailFn;
				var jsReq = {idTicket:$scope.tmpTicket.idTicket, idUsuario:$scope.tmpTicket.idUsuario};
				
				RestRs.getJsonResp(pUriCode, jsReq).success(successFn).error(failFn);
			}
		};
    	
 }]);