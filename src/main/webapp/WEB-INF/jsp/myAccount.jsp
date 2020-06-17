<%@ include file="common/header.jspf"%>
<%@ include file="common/navigation.jspf"%>
<body ng-app="accountApp" ng-controller="mainCtrl">

	<div class="container" ng-view></div>

<%@ include file="common/scriptLibraries.jspf" %>
<!-- Scripts propietarios -->
<script src="js/common.js"></script>
<script src="js/ang/commonServices.js"></script>
<script src="js/ang/commonFilters.js"></script>

<script src="js/ang/accountApp.js"></script>
<script src="js/ang/accountControllers.js"></script><!-- -->


<%@ include file="common/footer.jspf"%>