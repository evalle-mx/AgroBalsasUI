package com.agrob.ticket.web.ctrl;

import java.net.ConnectException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.agrob.ticket.web.service.LoginService;
import com.agrob.ticket.web.vo.UsuarioVo;

@Controller
//@SessionAttributes("name")
@SessionAttributes("usuario")
public class LoginController {
	
	private static Logger logger = Logger.getLogger(LoginController.class);
	
	@Autowired
	LoginService service;
	
	@RequestMapping(value="/login", method = RequestMethod.GET)
	public String showLoginPage(ModelMap model){
		logger.debug("<showLoginPage> GET");
//		Object objUser = model.get("usuario");
//		if(objUser !=null && objUser instanceof User ){
//			if(((User)objUser).getIdUsuario()!=null ){
//				return "welcome";
//			}
//		}
		return "login";
	}
	
	@RequestMapping(value="/login", method = RequestMethod.POST)
	public String showWelcomePage(ModelMap model, @RequestParam String userName, @RequestParam String password){
		logger.debug("<showWelcomePage> POST");
		try{
			logger.debug("<showWelcomePage> userName="+userName+", password="+password);
			UsuarioVo usuario = service.usuarioSess(userName, password);
			logger.debug("Usuario: " + usuario );
			if(usuario!=null && usuario.getValido()!=null && usuario.getValido()){
				logger.debug("Usuario.valido: " + usuario.getValido() );
				model.put("usuario", usuario);
				return "myAccount";//"welcome";
			}
			else{
				logger.debug("<showWelcomePage> Usuario inválido");
				model.put("errorMessage", "Credenciales Incorrectas");
			}
		}catch (ConnectException e){
			logger.fatal("<showWelcomePage> Excepcion al Conectarse al App-Server: "+e.getLocalizedMessage(), e);
			e.printStackTrace();
			model.put("errorMessage", "Error de Comunicación");
		}
		catch (Exception e){
			logger.fatal("<showWelcomePage> Excepcion al procesar datos: "+e.getLocalizedMessage(), e);
			e.printStackTrace();
			model.put("errorMessage", "Error de Sistema");
		}
		return "login";
	}
	
	@RequestMapping(value="/home", method = RequestMethod.GET)
	public String homePage(ModelMap model){
		logger.debug("<homePage>");
		UsuarioVo usuario = (UsuarioVo) model.get("usuario");
		logger.debug("Usuario: " + usuario );
		if(usuario!=null && usuario.getValido()!=null && usuario.getValido()){
			logger.debug("<homePage> Usuario valido, muestra welcome.jsp");
			return "welcome";
		}
		else{
			logger.debug("<homePage> Usuario no válido");
			return "login";
		}
	}
	
	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(HttpServletRequest request,
			HttpServletResponse response) {
		logger.debug("<logout> Saliendo de la aplicación... ");
//		Authentication authentication = SecurityContextHolder.getContext()
//				.getAuthentication();
//		if (authentication != null) {
//			new SecurityContextLogoutHandler().logout(request, response,
//					authentication);
//		}

		//return "redirect:/";
		request.getSession().invalidate();
		return "redirect:/login";
	}

}
