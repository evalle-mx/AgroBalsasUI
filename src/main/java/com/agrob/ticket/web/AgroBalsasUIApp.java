package com.agrob.ticket.web;

import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
//import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@ComponentScan("com.agrob.ticket.web")
//@PropertySource(value = { "classpath:application.properties" })
@EnableAutoConfiguration
public class AgroBalsasUIApp {
	
	private static Logger logger = Logger.getLogger(AgroBalsasUIApp.class);
	
	public static void main(String[] args) {
		logger.debug("Starting AgroBalsasUI ....");
		SpringApplication.run(AgroBalsasUIApp.class, args);
		logger.debug("App Initialized");
		System.out.println("AgroBalsasUIApp Initialized!!!  ");
	}
}
