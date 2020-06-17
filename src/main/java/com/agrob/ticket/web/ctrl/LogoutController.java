package com.agrob.ticket.web.ctrl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LogoutController {
	
	private static Logger logger = Logger.getLogger(LogoutController.class);
	

//	@RequestMapping(value = "/logout", method = RequestMethod.GET)
//	public String logout(HttpServletRequest request,
//			HttpServletResponse response) {
//		logger.debug("<logout> Saliendo de la aplicación... ");
////		Authentication authentication = SecurityContextHolder.getContext()
////				.getAuthentication();
////		if (authentication != null) {
////			new SecurityContextLogoutHandler().logout(request, response,
////					authentication);
////		}
//
//		//return "redirect:/";
//		request.getSession().invalidate();
//		return "redirect:/login";
//	}
}
