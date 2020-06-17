package com.agrob.ticket.web.ctrl;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

import org.apache.log4j.Logger;

@Controller
public class WelcomeController {

	private static Logger logger = Logger.getLogger(WelcomeController.class);
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String rootRequest(ModelMap model) {
		logger.debug("<rootRequest> LOG4J: evaluando si existe sesion... ");
//		model.put("name", getLoggedinUserName());
//		return "welcome";
		return "redirect:/login";
	}

	/*private String getLoggedinUserName() {
		Object principal = SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		
		if (principal instanceof UserDetails) {
			return ((UserDetails) principal).getUsername();
		}
		
		return principal.toString();
	}//*/

}
