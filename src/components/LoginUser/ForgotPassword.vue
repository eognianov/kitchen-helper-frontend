<template>

	<div class="container h-100 d-flex justify-content-center loginform">
		<div class="row h-100 align-items-center justify-content-center">

			<div
					class="col-md-12 col-lg-8 py-5 mx-2 rightcolumn d-flex flex-column align-items-center align-self-center shadow-lg">
				<div class="col-md-12">

					<h3>Forgot Password</h3>
					<p>Enter your email address below to get a password reset link.</p>


					<div class="form-group mt-5">
						<input type="email" id="email" class="form-control" placeholder="Email address">
					</div>


					<input type="button" id="btn" class="btn btn-lg btn-block form-btn font-weight-bold" value="Send">

					<div class="text-center pt-4 font-weight-bold">
						<router-link to="/login">Login</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.loginform{
	padding: 4rem;
}
.form-btn {
	font-size: 1rem;
	width: 100%;
	margin-top: 1rem;
	background-color: var(--main-color);
	color: var(--white);
}

.form-btn:hover {
	background-color: var(--main-hover);
	border: 1px solid var(--main-color);
	color: var(--main-text);
}
.loginform {
	color: var(--main-text);
}
.loginform a {
	color: var(--main-color);
}
</style>