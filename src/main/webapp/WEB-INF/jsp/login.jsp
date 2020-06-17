<!DOCTYPE html>
<html lang="es">

<head>
  <title>Agrobalsas Ticketing</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="webjars/font-awesome/4.7.0/css/font-awesome.min.css">
  
  <link rel="stylesheet" type="text/css" href="css/login/util.css">
  <link rel="stylesheet" type="text/css" href="css/login/main.css">
</head>

<body>


	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
				<form class="login100-form validate-form flex-sb flex-w" method="post">
					<span class="login100-form-title p-b-32">
						Login
					</span>

					<span class="txt1 p-b-11">
						Usuario
					</span>
					<div class="wrap-input100 validate-input m-b-36"
						 data-validate = "El usuario es Requerido">
						<input class="input100" type="text" name="userName" value="admin" >
						<span class="focus-input100"></span>
					</div>
					
					<span class="txt1 p-b-11">
						Contraseña
					</span>
					<div class="wrap-input100 validate-input m-b-12" data-validate = "La contraseña es Requerida">
						<span class="btn-show-pass">
							<i class="fa fa-eye"></i>
						</span>
						<input class="input100" type="password" name="password" value="12345678" >
						<span class="focus-input100"></span>
					</div>
					
					<div class="flex-sb-m w-full p-b-48">
						<!--<div class="contact100-form-checkbox">
							<input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
							<label class="label-checkbox100" for="ckb1">
								Remember me
							</label>
						</div>

						<div>
							<a href="#" class="txt3">
								Forgot Password?
							</a>
						</div>-->
					</div>

					<div class="container-login100-form-btn">
						<button class="login100-form-btn">
							Accesar
						</button>
					</div>

				</form>
			</div>
		</div>
	</div>
	

	<div id="dropDownSelect1"></div>
	
	<!--===============================================================================================-->
	<script src="webjars/jquery/2.1.3/jquery.min.js"></script>
	<script src="vendor/popper.min.js"></script>
	<script src="webjars/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	
	<script src="js/login.js"></script>
</body>
</html>