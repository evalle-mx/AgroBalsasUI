package com.agrob.ticket.web.service;

//import java.util.Iterator;

//import netto.mock.ConstantesMck;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agrob.ticket.util.UriCache;
import com.agrob.ticket.web.rest.ClientRestService;
import com.agrob.ticket.web.vo.UsuarioVo;

@Service
public class LoginService {
	
	private static Logger logger = Logger.getLogger(LoginService.class);
	
	@Autowired
	ClientRestService restService;
	
	private String stResponse;
	private JSONObject jsonResponse;
	
//	/**
//	 * Valida usuario con base en usuario y contraseña
//	 * @param userName
//	 * @param password
//	 * @return
//	 */
//	public boolean validateUser(String userName, String password) {
//		logger.debug("<validateUser>");
//		boolean valido = false;
//		Iterator<UsuarioVo> itUser = ConstantesMck.usuarios.iterator();
//		// in28minutes, dummy
////		valido = userName.equalsIgnoreCase("in28minutes")
////				&& password.equalsIgnoreCase("dummy");
//		UsuarioVo usuario;
//		logger.debug("<validateUser> validando usuario: "+userName + ", pwd: "+password );
//		while(itUser.hasNext()){
//			usuario = itUser.next();
////			logger.debug("usuario.getUserName(): "+usuario.getUserName() + ", usuario.getClave(): "+usuario.getClave() );
//			if(userName.equalsIgnoreCase(usuario.getUserName())
//				&&	password.equals(usuario.getClave())){
//				valido = true;
//			}
//		}
//		return valido;
//	}
	
	/**
	 * Regresa usuario completo si existen resultados con usuario&Password
	 * en caso contrario, regresa usuario vacio
	 * @param userName
	 * @param password
	 * @return
	 * @throws Exception 
	 */
	public UsuarioVo usuarioSess(String userName, String password) throws Exception {
		logger.debug("<usuarioSess>");
		logger.debug("<usuarioSess>userName="+userName + ", password="+password);
		UsuarioVo usuario = new UsuarioVo();
		
		logger.debug("<pingApp> Contactando app-Rest..." );
		JSONObject jsReq = new JSONObject();
		jsReq.put("userName", userName);
		jsReq.put("password", password);
		stResponse = restService.getJsonFromService(
				jsReq.toString()//"{\"userName\":\""+userName+"\", \"password\":\""+ password +"}"
				, UriCache.getUri("LOGIN.E"));
		try{
			logger.debug("stResponse: " + stResponse);
			jsonResponse = new JSONObject(stResponse);
			
			if(jsonResponse.has("idUsuario")){//Success
				usuario.setIdUsuario( jsonResponse.getString("idUsuario") );
				usuario.setNombre( jsonResponse.getString("nombre") );
				usuario.setUserName( jsonResponse.getString("userName"));
				usuario.setIdRol( jsonResponse.getString("idRol"));
				usuario.setValido( jsonResponse.getBoolean("valido"));
			}else if(jsonResponse.has("code") && jsonResponse.has("type")){
				usuario.setErrorMsg( jsonResponse.has("message")?
						jsonResponse.getString("message"):"Error de Sistema, informe al Administrador");
				usuario.setIdUsuario("-1");
			}
			else{
				usuario.setErrorMsg("Error de Sistema, informe al Administrador");
				usuario.setIdUsuario("-1");
			}
			
		}catch (Exception e){
			logger.fatal("<usuarioSess> Excepcion al obtener respuesta de Servidor "+e.getMessage(), e);
			usuario.setErrorMsg("Error de Sistema, informe al Administrador");
			usuario.setIdUsuario("-1");
		}
		
//		Iterator<UsuarioVo> itUser = ConstantesMck.usuarios.iterator();
//		while(itUser.hasNext()){
//			userTmp = itUser.next();
//			if(userName.equalsIgnoreCase(userTmp.getUserName())
//				&&	password.equals(userTmp.getClave())){
//				usuario= userTmp;
//				usuario.setValido(true);
//			}
//		}
		return usuario;
	}

}
