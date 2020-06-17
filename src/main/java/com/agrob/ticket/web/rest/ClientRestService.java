package com.agrob.ticket.web.rest;

import javax.annotation.PostConstruct;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status.Family;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

@PropertySource("classpath:application.properties")
@Service
public class ClientRestService {

	private static Logger log4j = Logger.getLogger(ClientRestService.class);
	private WebTarget target;
	private Response response;
	
	@Value("${uri.service.app}") String URI_SERVICE_APP;
	final static String CHARSET=";charset=UTF-8";
	final static String ERROR_LABEL_SERVICE = "Error en el servicio ";
	
	/**
	 * Constructor que inicia cliente y recurso Web en base a la URL en constantes
	 */
	 @PostConstruct
	 public void initIt()  {
		log4j.debug("==> Rest.getJsonFromService...inicializa -> "+URI_SERVICE_APP);
		target =ClientBuilder.newClient().target(URI_SERVICE_APP);//.concat("/rest"));
		log4j.debug("==> Rest.getJsonFromService...target="+target);
	 }
	 
	 /**
		 * Metodo comun a todos los Clientes Rest para consumir recursos del servicio en App (AppTCE)
		 * supone que los parametros json y uri son validos y no nulos
		 * @param outJson
		 * @param uriService
		 * @return
		 * @throws SystemTCEException
		 */
		public String getJsonFromService(String outJson, String uriService, String uriCode) throws Exception {
			log4j.debug("\n\n==> Rest.getJsonFromService()" + (uriCode!=null?uriCode:"") + "..." + "\n ==> Json: " + outJson
					 + "\n ==> URI: " + uriService +"\n\n");
			 response = target.path(uriService).
		        		request(MediaType.APPLICATION_JSON+CHARSET).
		        		post(Entity.entity(outJson, MediaType.APPLICATION_JSON+CHARSET),Response.class);
			//Se analiza la respuesta
			if (response.getStatusInfo().getFamily() == Family.SUCCESSFUL) {
				String jsonRespuesta =  response.readEntity(String.class);
				log4j.debug("\n<== response: \n" + jsonRespuesta );
				return jsonRespuesta;	
			} else {
				 int cve = response.getStatus();
				 log4j.error("Rest.ERROR --> estatus: " + cve +
						   	" respuesta= "+response.readEntity(String.class));
				 //throw new SystemTCEException(String.valueOf(cve), Constantes.ERROR_LABEL_SERVICE.concat(uriService));
				 throw new NullPointerException(ERROR_LABEL_SERVICE.concat(uriService));
			}
		}
		
		/**
		 * Metodo comun a todos los Clientes Rest para consumir recursos del servicio en App (AppTCE)
		 * supone que los parametros json y uri son validos y no nulos
		 * @param outJson
		 * @param uriService
		 * @return
		 * @throws SystemTCEException
		 */
		public String getJsonFromService(String outJson, String uriService) throws Exception {
			log4j.debug("\n\n==> Rest.getJsonFromService()\n ==> Json: " + outJson
					 + "\n ==> URI: " + uriService +"\n\n");
			 response = target.path(uriService).
		        		request(MediaType.APPLICATION_JSON+CHARSET).
		        		post(Entity.entity(outJson, MediaType.APPLICATION_JSON+CHARSET),Response.class);
			//Se analiza la respuesta
			if (response.getStatusInfo().getFamily() == Family.SUCCESSFUL) {
				String jsonRespuesta =  response.readEntity(String.class);
				log4j.debug("\n<== response: \n" + jsonRespuesta );
				return jsonRespuesta;	
			} else {
				 int cve = response.getStatus();
				 log4j.error("Rest.ERROR --> estatus: " + cve +
						   	" respuesta= "+response.readEntity(String.class));
				 //throw new SystemTCEException(String.valueOf(cve), Constantes.ERROR_LABEL_SERVICE.concat(uriService));
				 throw new NullPointerException(ERROR_LABEL_SERVICE.concat(uriService));
			}
		}
	
}
