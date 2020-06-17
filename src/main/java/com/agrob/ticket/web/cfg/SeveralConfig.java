package com.agrob.ticket.web.cfg;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.agrob.ticket.web.AppStartUp;

//import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;

/**
 * Clases donde se inicializan objetos BEANS, referenciados para ser ocupados de manera global
 * Assambler
 */
@Configuration
public class SeveralConfig {

//	/**
//	 * Libreria para convertir mensajes json a objetos, y visceversa
//	 * @return
//	 */
//	@Bean
//	public Gson gson(){
//		return new GsonBuilder().disableHtmlEscaping().create();		
//	}
	
	/**
	 * Se ejecuta el bean al subir la aplicacion
	 * @return
	 */
	@Bean
	public AppStartUp appStartUp(){
		return new AppStartUp();		
	}
}
