'use strict'

//Constante
var idTipoEstatusCreate = 1;


function activeMenu(idMenu){
	//console.log('activeMenu: ', idMenu);
	$('#'+idMenu).addClass('active');
}


/**
 * FUNCION QUE DETERMINA INICIALMENTE SI EL SERVICIO ES FATAL Y ENVIAR UN TRUE
 * @param transResponse
 * @returns {Boolean}
 */
function typeFatal(restResponse){
	console.log('<typeFatal>');
	console.log('<typeFatal> restResponse : ', restResponse );
	var resp = undefined;
	if(Array.isArray(restResponse)){
		if(restResponse.length>0){
			resp = restResponse[0];
		}else{
			resp = '';
		}
	}else {
//		
		resp = restResponse; 
	}
	console.log('resp: ', resp );
	if(resp!=undefined && resp.type=='F'){
		return true;
	}
	return false;
}