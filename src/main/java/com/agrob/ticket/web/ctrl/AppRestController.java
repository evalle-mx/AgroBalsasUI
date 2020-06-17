package com.agrob.ticket.web.ctrl;

import java.util.concurrent.atomic.AtomicLong;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.agrob.ticket.util.AppUtily;
import com.agrob.ticket.util.UriCache;
import com.agrob.ticket.web.rest.ClientRestService;
import com.agrob.ticket.web.vo.Greeting;

/**
 * Clase Comun encargada de comunicación con Servidor Rest
 * @author dothr
 *
 */
@RestController
public class AppRestController {

	Logger logger = Logger.getLogger( this.getClass() );
	
	@Autowired
	ClientRestService restService;
			
	private static final String template = "Hola, %s!";
    private final AtomicLong counter = new AtomicLong();
    
    private String getUri(String uriCode) {
    	return UriCache.getUri(uriCode);
    }

    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
    	logger.debug("<greeting> " );
    	logger.debug("<greeting> name=" + name);
        return new Greeting(counter.incrementAndGet(),
                            String.format(template, name));
    }
    

    
	/**
	 * Ejecuta un proceso de Ping hacia el Servidor Rest Remoto
	 * @param json
	 * @return
	 */
    @RequestMapping("/pingapp")
    public String pingApp(@RequestParam(value="json", defaultValue="{}") String json) {
    	logger.debug("<pingApp> " );
    	logger.debug("<pingApp> json=" + json);
    	String uriService = "/admin/login/ping";
    	
    	String stJson = "";
    	
    	try{
    		logger.debug("<pingApp> Contactando app-Rest..." );
    		stJson = restService.getJsonFromService(json, uriService);
    		logger.debug("<pingApp> Respuesta: " + stJson );
    	}catch (Exception e){
    		logger.fatal("<pingApp> Excepción al contactar app-Rest: "+e.getLocalizedMessage(), e);
    		e.printStackTrace();
    		stJson = AppUtily.getErrorSys();
    	}    	
        return stJson;
    }
    
    @RequestMapping("/restapp")
    public String restapp(@RequestParam(value="json") String json, @RequestParam(value="uricode") String uriCode) {
    	logger.debug("<restapp> " );
    	System.out.println("<restapp> ");
    	logger.debug("<restapp> json=" + json);
    	logger.debug("<restapp> uriCode=" + uriCode);
    	
    	String rspJson = "", uriService;
    	try{
    		logger.debug("<restapp> Obteniendo uriService de Uricode:" +uriCode);
    		uriService = getUri(uriCode);
    		if(uriService!=null && !uriService.equals("")){
    			logger.debug("<restapp> uriService="+uriService);
        		logger.debug("<restapp> Contactando app-Rest..." );
        		rspJson = restService.getJsonFromService(json, uriService);
    		}
    		else{
    			logger.debug("<restapp> NO existe uriService o no hay autorización");
    			rspJson = AppUtily.getJsonMsg("F00", "F", "No tiene autorización para el servicio ["+ uriCode+"]");//"[error]";
    		}
    	}catch (Exception e){
    		logger.fatal("<restapp> Excepción al contactar app-Rest: "+e.getLocalizedMessage(), e);
    		e.printStackTrace();
    		rspJson = AppUtily.getErrorSys();	//"[error]";
    	}
		logger.debug("<restapp> Respuesta: " + rspJson );
        return rspJson;
    }
}
