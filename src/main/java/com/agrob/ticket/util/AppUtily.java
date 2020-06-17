package com.agrob.ticket.util;

import org.json.JSONObject;

public class AppUtily {

	public static final String DEF_OUTPAGE = "login";
	
	public static String getErrorSys(){
		return getJsonMsg("000", "F", "Error de Sistema");
	}
	
	public static String getJsonMsg(String code, String type, String msg){
		JSONObject json = new JSONObject();
		json.put("code", code);
		json.put("type", type);
		json.put("message", msg);
		
		return json.toString();
	}
}
