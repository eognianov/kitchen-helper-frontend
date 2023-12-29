<template>
	<div class="container-fluid loginform">
		<div class="container d-flex justify-content-center" style="margin-top:1.5rem;">
			<div class="row align-items-center justify-content-center">

				<div
						class="col-md-12 col-lg-8 py-5 mx-2 rightcolumn d-flex flex-column align-items-center align-self-center shadow-lg">
					<div class="col-md-12">
						<form @submit.prevent="login">
							<h3>Login to account</h3>
							<p>Access to the most powerfull tool in the entire design and web industry.</p>
							<div class="form-group mt-5">
								<input type="text" id="username" class="form-control" placeholder="Username" v-model="username">
							</div>

							<div class="form-group">
								<input type="password" id="password" class="form-control" placeholder="Password" v-model="password">
							</div>

							<div class="text-right pb-3">
								<router-link to="/reset-password" class="font-weight-bold">
									Forgot Password?
								</router-link>
							</div>
							<button id="btn" class="btn btn-lg btn-block form-btn font-weight-bold">Login</button>
						</form>
						<div class="text-center pt-4 font-weight-bold">
							<router-link to="/signup">Create an account</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import axios from 'axios';
import {useRouter} from 'vue-router';

const router = useRouter();
let username = ""
let password = ""

async function login() {

	const response = await axios.post(`/users/signin`, {
		username: username,
		password: password
	}, {
		headers: {"Content-Type": "multipart/form-data"}
	})
	if (response.status === 200) {
		localStorage.setItem('token', response.data.access_token);
		router.push({name: "index"});
	} else {
		console.log('error')
	}

	// 		.then(response => {
	// 	console.log("Response Data:", response.data);
	// 	if (response.data.access_token) {
	// 		localStorage.setItem('token', response.data.access_token);
	// 	}
	// })
	// .catch(error => {
	// 	console.error("Error:", error);
	// 	if (error.response) {
	// 		console.error("Response Data:", error.response.data);
	// 	}
	// });
}
</script>

<style scoped>
a {
	color: var(--main-color);
}

.container-fluid {
	overflow: hidden;
}

.loginform .form-group {
	margin-top: 1.2rem;
}

.form-btn {
	font-size: 1rem;
	width: 100%;
	background-color: var(--main-color);
	color: var(--white);
}

.form-btn:hover {
	background-color: var(--main-hover);
	border: 1px solid var(--main-color);
	color: var(--main-text);
}

.rightcolumn {
	background-color: var(--white);
}

.chip {
	display: inline-block;
	height: 30px;
	width: 30px;
	font-size: 13px;
	font-weight: 500;
	line-height: 32px;
	border-radius: 50%;
	background-color: var(--very-light-background);
	margin-bottom: 5px;
	margin-right: 5px;
}

.chip > img {
	float: left;
	margin: 0 8px 0 -12px;
	height: 32px;
	width: 32px;
	border-radius: 50%;
}

.chip .close {
	cursor: pointer;
	float: right;
	font-size: 16px;
	line-height: 32px;
	padding-left: 8px;
}

.loginform {
	padding: 4rem;
	color: var(--main-text);
}
</style>