<%@ include file="common/header.jspf"%>
<nav role="navigation" class="navbar navbar-default">
	<div class="">
		<a href="/login" class="navbar-brand">Login</a>
	</div>
	<div class="navbar-collapse">
		<!-- <ul class="nav navbar-nav">
			<li class="active"><a href="/">Home</a></li>
		</ul>
		<ul class="nav navbar-nav navbar-right">
			<li><a href="/">Login</a></li>
		</ul> -->
	</div>
</nav>
<body>
<div class="container">
Ocurrio una excepcion! Favor de contactar a Soporte:<br>
<b>E:</b>
<pre>
${exception}
</pre>
<b>url</b>
<pre>
${url}
</pre>
</div>
<%@ include file="common/scriptLibraries.jspf" %>
<%@ include file="common/footer.jspf"%>