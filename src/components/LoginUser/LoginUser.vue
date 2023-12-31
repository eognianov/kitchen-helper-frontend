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
							<p class="error" :class="{show: errorFound}">{{ errorMessage }}</p>
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
import {ref} from "vue";
import {useRouter} from 'vue-router';
import {useAuthStore} from "@/stores/authStore";

const auth = useAuthStore()

const router = useRouter();

let username = ref("");
let password = ref("");
let errorFound = ref(false)
let errorMessage = ref('')

async function login() {
	if (username.value === '' || password.value === '') {
		errorFound.value = true;
		errorMessage.value = 'Please provide username and password';
		return;
	}
	try {
		await auth.login(username.value, password.value)
	} catch (error) {
		errorFound.value = true;
		errorMessage.value = error.message
	}
	if (auth.logged) {
		router.push({name: "index"});
	}
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
.error {
	display: none;
	color: var(--main-alert);
	font-size: .8rem;
}
.show {
	display: block;
}
</style>