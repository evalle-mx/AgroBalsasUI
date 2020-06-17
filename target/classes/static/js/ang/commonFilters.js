'use strict';

/* Filters */

angular.module('commonFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
})
/* obtiene valor de catalogo para un id */
.filter('obtieneDesc', function() {
	return function(idIn, catalogo){
		if(idIn==undefined || idIn ==null){
			idIn=-1;
			return '';
		}else{
			var resp = '--'; /*Default*/
			if(catalogo != undefined){
				jQuery.each(catalogo, function(i, item) {
					if(item.llave==idIn){
						resp = item.valor;
						return false;
					}
		        });
			}else{
				console.log('El catalogo es null');
			}
		}
		return resp;
	};
})
/* Generico para cuando Tecnico es null*/
.filter('emptyTecn', function() {
	/* Etiqueta por defecto en caso de vacio o nulo */
	return function(input) {
	    return input ? input : '<Por Asignar>';
	  };
})
;