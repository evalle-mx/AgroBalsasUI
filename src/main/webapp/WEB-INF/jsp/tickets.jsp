<%@ include file="common/header.jspf"%>
<%@ include file="common/navigation.jspf"%>

<c:if test="${usuario.idRol=='1' }">
 <body ng-app="ticketApp" class="ng-cloak" ng-controller="mainCtrl">
 	<!-- <b>Administrador [1]</b> -->
</c:if>

<c:if test="${usuario.idRol=='4' }">
 <body ng-app="ticketUserApp" class="ng-cloak" ng-controller="mainCtrl">
 	<!-- <b>Usuario [4]</b>-->
</c:if>	


	<div class="container" ng-view></div>

<%@ include file="common/scriptLibraries.jspf" %>
<!-- Scripts propietarios -->
<script src="js/common.js"></script>
<script src="js/ang/commonServices.js"></script>
<script src="js/ang/commonFilters.js"></script>

<script src="js/ang/ticketApp.js"></script>
<script src="js/ang/ticketControllers.js"></script>

<%@ include file="common/footer.jspf"%>
