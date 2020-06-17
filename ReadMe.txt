## https://dzone.com/articles/creating-a-web-application-with-spring-boot


#### PRE-REQUISITOS  #############
### Instalación de Java 1.7
### Instalación Maven 
# $ sudo apt-get remove maven2
# $ sudo apt-get update
# $ sudo apt-get install maven

############################

### Para compilar el proyecto
# $ cd /home/dothr/workspace/AgroBalsasUI/
# $ mvn package

### Para ejecutar el proyecto
# $ java -jar target/AgroBalsasUI-
#  0.X.jar

## 
## Es requerido tener desplegado el proyecto EncuestaApp/PrototipoApp en Tomcat

##
#############################
#### HOW-TO
# nueva Pagina (JSP-index)
1. crear Jsp con formato adecuada
2. Agregar ruta a PageController.java (return <nombreJsp>)




* Hace login validando usuario, muestra bienvenida y resultados con in28minutes
* permite acceder a http://localhost:8080/list-todos aunque no  muestra resultados
* Muestra formulario en Jsp
* Estilos Bootstrap en resultados
* clase y Vo para Rest response (Greeting) [http://localhost:8080/greeting?name=Poeta]

-------------------------------------------------------------------
Versión 0.13:
* Se agregan funcionalidad completa a catálogos
* Se agrega funcionalidad completa a Sucursal
* Se agrega funcionalidad Basica a Tecnicos
* Se agrega funcionalidad Basica a Tipo-Ticket

Version 0.12:
* Se agrega controlador comun para generalizar la validación de sesión y redirigir con menos codigo en PageController
* Nuevas paginas de Administración y MiCuenta
* Se agrega funcionalidad a la pestaña de catalogos y carga inicial en App


Version 0.11:
* Se agrego StartUP y cfg.SeveralConfig para configuración inicial
* Se configuran las paginas para manejar librerias en común
* Se tiene versión funcional del sistema para Pruebas funcionales


Version 0.10:
* Funcionalidad propietaria TicketApp
* http://localhost:8090/restapp?json={"code":"phones"}&uricode=PHONES.G
* Se duplica ejemplo de Phones-angular para funcionar local o en cliente Rest (en resources/phoneAng)
* Se prueba y copia funcionalidad de Phones como modelo a seguir en Usuarios (rutas no funcionan)
* Se configura funcionalidad ANgular en la vista: Filtros, ordenamiento, modales y funcionalidad con App


Version 0.9:
* Se agregan tres nuevos jsp (tickets/users/phones*)
* Se agrega funcionalidad Angular propietaria de prueba (Phones)*
* Se modifican los fragmentos jsp para segmento header+scripts+footer


Version 0.8:
* Cambia Servidor Rest a http://localhost:8080/TicketingApp
* Se valida el usuario usando servicio LOGIN.E [/admin/login/exists] en Servidor
* Se agrega webjar de AngularJs (1.4.10) y funcionalidad Elemental en tickets.jsp


Version 0.7:
* Se cambia puerto a http://localhost:8090/
* Se agrega funcionalidad de Cliente Rest http://localhost:8090/pingapp que consume el servicio Rest en ...App

  http://localhost:8080/EncuestaApp/module/encuesta/ping  (Se despliega el App.war Servidor en Tomcat)
  
*Se agrega nueva pagina para angular (tickets.jsp)
* Se agrega archivo js comun
* Se agrega uso de servicio Rest (replica de AppUI): http://localhost:8090/restapp?json=<<JSREQ>>&uricode=<<URICODE>>
http://localhost:8090/restapp?json={}&uricode=PING.C
  



Version 0.8 (Nov-2019) Funcional:
* Se agrega seccion nueva para IpBlocker (funciona con tickets) 
