package com.agrob.ticket.web.ctrl;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

@Controller("error")
public class ErrorController {

	private static Logger logger = Logger.getLogger(ErrorController.class);
	
	@ExceptionHandler(Exception.class)
	public ModelAndView handleException
		(HttpServletRequest request, Exception ex){
		
		ModelAndView mv = new ModelAndView();

		logger.error("<handleException> e: " + ex.getMessage(), ex );
		System.out.println("error: " + ex.getMessage());
		ex.printStackTrace();
		mv.addObject("exception", ex.getLocalizedMessage());
		mv.addObject("url", request.getRequestURL());
		
		mv.setViewName("error");
		return mv;
	}
}
