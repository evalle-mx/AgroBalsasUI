package com.agrob.ticket.web.ctrl;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.agrob.ticket.util.AppUtily;
import com.agrob.ticket.web.vo.UsuarioVo;

@Controller
@SessionAttributes("usuario")
public class CommonController {

	private String outPage = AppUtily.DEF_OUTPAGE;
	Logger log4j = Logger.getLogger( this.getClass());
	
	/**
	 * Validacion de usuario en sesion y devuelve bandera
	 * @param model
	 * @return
	 * @throws Exception
	 */
	protected boolean validUser(ModelMap model) throws Exception{
		boolean valido = false;
		UsuarioVo usuario = (UsuarioVo) model.get("usuario");
		log4j.debug("Usuario Session: " + usuario );
		if(usuario!=null && usuario.getValido()!=null && usuario.getValido()){
			log4j.debug("<validUser> usuario valido: " + usuario.getNombre() );
			valido=true;
		}
		
		return valido;
	}
	
	/**
	 * Procesa la sesion y la ruta solicitada 
	 * @param model
	 * @param jspRoute
	 * @return
	 * @throws Exception
	 */
	protected String vRedirect(ModelMap model, String jspRoute) throws Exception {
		if(validUser(model)){
			log4j.debug("<validRedirect> validado");
			return jspRoute;	//Nombre del JSP en WEB-INF/jsp  [ <jspRoute>.jsp]
		}else{
			return outPage;//"login";
		}
	}
	
	
}
