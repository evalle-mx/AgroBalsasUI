package com.agrob.ticket.util;

//import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

public class UriCache {
		
	private static final ConcurrentHashMap<String, String> hmUriCodes = new ConcurrentHashMap<String, String>();
	
	public static String getUri(String uriCode){
		return hmUriCodes.get(uriCode);
	}
	
	public static void setUri(String uriCode, String uriService){
		hmUriCodes.put(uriCode, uriService);
	}
	
	public static int getSize(){
		return hmUriCodes.size();
	}

}
