<%@ include file="common/header.jspf" %>
<%@ include file="common/navigation.jspf" %>
<body ng-app="usuarioApp" ng-controller="mainCtrl">
	<h2>Bienvenido Al listado de USUARIOS</h2>
	
	<div class="container" ng-view></div>


<%@ include file="common/scriptLibraries.jspf" %>
<!-- Scripts propietarios -->
<script src="js/common.js"></script>
<script src="js/ang/commonServices.js"></script>
<script src="js/ang/commonFilters.js"></script>

<script src="js/ang/usuarioApp.js"></script>
<script src="js/ang/usuarioControllers.js"></script>
<!-- <script src="js/ang/ticketServices.js"></script>
<script src="js/ang/ticketFilters.js"></script>-->

<script>activeMenu('lkUsers');</script>

<%@ include file="common/footer.jspf"%>