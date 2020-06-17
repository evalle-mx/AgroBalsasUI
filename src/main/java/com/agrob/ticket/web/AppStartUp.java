package com.agrob.ticket.web;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;

import com.agrob.ticket.util.UriCache;

public class AppStartUp {

	Logger log4j = Logger.getLogger( this.getClass());
	
	/**
	 * Se ejecuta el metodo despues de la inyección de dependencias de Spring 
	 */
	@PostConstruct
	public void initIt() {
		log4j.debug("<AppStartUp,initIt> Parametros y configuraciones iniciales");
		
		//TODO inicializarlo desde un archivo plano Json o en un servicio al iniciar sesión
		
		UriCache.setUri("PING.C","/admin/login/ping");
		UriCache.setUri("LOGIN.E","/admin/login/exists");
		UriCache.setUri("USUARIO.G","/admin/user/get");
		UriCache.setUri("USUARIO.R","/admin/user/read");
		UriCache.setUri("USUARIO.C","/admin/user/create");
		UriCache.setUri("USUARIO.U","/admin/user/update");
		UriCache.setUri("USUARIO.A","/admin/user/activate");
		UriCache.setUri("USUARIO.D","/admin/user/delete");	
		UriCache.setUri("USUARIO.PW","/admin/user/pwdchange");
		/* Catalogos */		
		UriCache.setUri("CATALOG.G","/admin/catalog/get");
		UriCache.setUri("CATALOG.FG","/admin/catalog/fullGet");
		UriCache.setUri("AREA.G","/admin/area/get");
		UriCache.setUri("AREA.R","/admin/area/read");
		UriCache.setUri("AREA.C","/admin/area/create");
		UriCache.setUri("AREA.U","/admin/area/update");
		UriCache.setUri("AREA.D","/admin/area/delete");
		UriCache.setUri("ROL.G","/admin/rol/get");
		UriCache.setUri("ROL.R","/admin/rol/read");
		UriCache.setUri("ROL.C","/admin/rol/create");
		UriCache.setUri("ROL.U","/admin/rol/update");
		UriCache.setUri("ROL.D","/admin/rol/delete");
		UriCache.setUri("TIPOSOPORTE.G","/admin/tipoSoporte/get");
		UriCache.setUri("TIPOSOPORTE.R","/admin/tipoSoporte/read");
		UriCache.setUri("TIPOSOPORTE.C","/admin/tipoSoporte/create");
		UriCache.setUri("TIPOSOPORTE.U","/admin/tipoSoporte/update");
		UriCache.setUri("TIPOSOPORTE.D","/admin/tipoSoporte/delete");
		UriCache.setUri("ESTATUS.G","/admin/estatus/get");
		UriCache.setUri("ESTATUS.R","/admin/estatus/read");
		UriCache.setUri("ESTATUS.C","/admin/estatus/create");
		UriCache.setUri("ESTATUS.U","/admin/estatus/update");
		UriCache.setUri("ESTATUS.D","/admin/estatus/delete");

		UriCache.setUri("TICKET.G","/module/tickets/get");
		UriCache.setUri("TICKET.C","/module/tickets/create");
		UriCache.setUri("TICKET.R","/module/tickets/read");
		UriCache.setUri("TICKET.U","/module/tickets/update");
		UriCache.setUri("TICKET.D","/module/tickets/delete");
		UriCache.setUri("BRANCH.G","/module/branch/get");
		UriCache.setUri("BRANCH.R","/module/branch/read");
		UriCache.setUri("BRANCH.C","/module/branch/create");
		UriCache.setUri("BRANCH.U","/module/branch/update");
		UriCache.setUri("BRANCH.D","/module/branch/delete");
		UriCache.setUri("TECHNICIAN.G","/module/technician/get");
		UriCache.setUri("TECHNICIAN.R","/module/technician/read");
		UriCache.setUri("TECHNICIAN.C","/module/technician/create");
		UriCache.setUri("TECHNICIAN.U","/module/technician/update");
		UriCache.setUri("TECHNICIAN.D","/module/technician/delete");
		UriCache.setUri("TICKETTYPE.G","/module/tickettype/get");
		UriCache.setUri("TICKETTYPE.R","/module/tickettype/read");
		UriCache.setUri("TICKETTYPE.C","/module/tickettype/create");
		UriCache.setUri("TICKETTYPE.U","/module/tickettype/update");
		UriCache.setUri("TICKETTYPE.D","/module/tickettype/delete");
		
		
		UriCache.setUri("IPADDRESS.G","/module/ipaddress/get");
		UriCache.setUri("IPADDRESS.U","/module/ipaddress/update");
		
		UriCache.setUri("IPPACKAGE.C","/module/ipPackage/create");
		UriCache.setUri("IPPACKAGE.G","/module/ipPackage/get");
		UriCache.setUri("IPPACKAGE.G","/module/ipPackage/update");
		
//		UriCache.setUri("PHONES.G","/module/test/getPhones");
		
		log4j.debug("<AppStartUp,initIt> Se insertaron "+UriCache.getSize() + " elementos al UriCache");
	}
}
