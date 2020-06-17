package com.agrob.ticket.web.ctrl;

/**
 * Controlador dedicado a mapeo de Paginas JSP en base a la url
 */
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@SessionAttributes("usuario")
public class PageController extends CommonController{
	
	private static Logger log4j = Logger.getLogger(PageController.class);
	
	/**
	 * Cuando se accesa a la página de lista de tickets, se realiza el proceso a redirect
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/list-tickets", method = RequestMethod.GET)	//nombre_enlace, metodo de req
	public String listTickets(ModelMap model) throws Exception{
		log4j.debug("<listTickets>");
		return vRedirect(model, "tickets");
	}
	
	@RequestMapping(value="/ipblocker", method = RequestMethod.GET)	//nombre_enlace, metodo de req
	public String ipblocker(ModelMap model) throws Exception{
		log4j.debug("<ipblocker>");
		System.out.println("<ipblocker>");
		return vRedirect(model, "ipblocker");
	}
	
	@RequestMapping(value="/list-users", method = RequestMethod.GET)
	public String listUsers(ModelMap model) throws Exception {
		log4j.debug("<listUsers>");
//		UsuarioVo usuario = (UsuarioVo) model.get("usuario");
//		log4j.debug("Usuario Session: " + usuario );
//		if(usuario!=null && usuario.getValido()!=null && usuario.getValido()){
//			log4j.debug("<listUsers> usuario valido: " + usuario.getNombre() );
//			return "users";	//Nombre del JSP
//		}
//		else{
//			log4j.debug("<listUsers> Usuario no válido");
//			return "login";
//		}
		return vRedirect(model, "users");
	}
	
	@RequestMapping(value="/phones", method = RequestMethod.GET)
	public String phones(ModelMap model) throws Exception {
		log4j.debug("<phones>");
//		UsuarioVo usuario = (UsuarioVo) model.get("usuario");
//		log4j.debug("<phones> Usuario: " + usuario );
//		if(usuario!=null && usuario.getValido()!=null && usuario.getValido()){
//			log4j.debug("<phones> usuario valido: " + usuario.getNombre() );
//			return "phones";	//Nombre del JSP
//		}
//		else{
//			log4j.debug("<phones> Usuario no válido");
//			return "login";
//		}
		return vRedirect(model, "phones");
	}
	
	@RequestMapping(value="/management", method = RequestMethod.GET)
	public String management(ModelMap model) throws Exception {
		log4j.debug("<management>");
		return vRedirect(model, "management");
	}
	
	@RequestMapping(value="/myAccount", method = RequestMethod.GET)
	public String myAccount(ModelMap model) throws Exception {
		log4j.debug("<myAccount>");
		return vRedirect(model, "myAccount");
	}

}
