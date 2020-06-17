<%@ include file="common/header.jspf" %>
<%@ include file="common/navigation.jspf" %>
<link rel="stylesheet" href="phoneAng/css/app.css">
<body ng-app="phonecatApp">
	
	
	</style>
	<h2>Bienvenido Al listado de Telefonos</h2>
	
	
	<div class="container" ng-view></div>
<%@ include file="common/scriptLibraries.jspf" %>

<!-- Scripts propietarios -->
<script src="js/common.js"></script>
<!-- <script src="phoneAng/js/app.js"></script><! -- UI-Local -->
<script src="phoneAng/js/restapp.js"></script><!-- Rest-App -->
<script>activeMenu('lkPhones');</script>

<%@ include file="common/footer.jspf"%>