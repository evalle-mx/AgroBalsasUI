package com.agrob.ticket.web.vo;

import javax.validation.constraints.Size;

public class UsuarioVo extends CommonVo{

	private String idUsuario;
	private String idRol;
	private String idSucursal;
	
	private String userName;
	
	@Size(min=8, message="Ingrese al menos 10 Characteres...")
	private String clave;
//	private Boolean valido;	
	
	private String nombre;
	private String apellidos;
	private String email;
	private String puesto;
	private String sucursal;
	private String fechaAlta;	
	
	public UsuarioVo() {}	
	
	public UsuarioVo(String idUsuario, String nombre) {
		this.idUsuario=idUsuario;
		this.nombre=nombre;
	}
	
	public UsuarioVo(String idUsuario, String userName, String clave, String nombre, String rol) {
		this.idUsuario=idUsuario;
		this.userName=userName;
		this.clave=clave;
		this.nombre=nombre;
		this.idRol=rol;
	}
	
	public String getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(String idUsuario) {
		this.idUsuario = idUsuario;
	}
	public String getIdRol() {
		return idRol;
	}
	public void setIdRol(String idRol) {
		this.idRol = idRol;
	}
	public String getIdSucursal() {
		return idSucursal;
	}
	public void setIdSucursal(String idSucursal) {
		this.idSucursal = idSucursal;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getClave() {
		return clave;
	}
	public void setClave(String clave) {
		this.clave = clave;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellidos() {
		return apellidos;
	}
	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPuesto() {
		return puesto;
	}
	public void setPuesto(String puesto) {
		this.puesto = puesto;
	}
	public String getSucursal() {
		return sucursal;
	}
	public void setSucursal(String sucursal) {
		this.sucursal = sucursal;
	}
	public String getFechaAlta() {
		return fechaAlta;
	}
	public void setFechaAlta(String fechaAlta) {
		this.fechaAlta = fechaAlta;
	}
}
