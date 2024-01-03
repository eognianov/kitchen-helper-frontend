<template>
	<div class="container d-flex justify-content-center loginform" style="margin-top:1rem;">
		<div class="row align-items-center justify-content-center">

			<div
					class="col-md-12 col-lg-8 py-5 mx-2 rightcolumn d-flex flex-column align-items-center align-self-center shadow-lg">
				<div class="col-md-12">
					<form @submit.prevent="signUp">
						<h3>Create an account</h3>
						<p>Unlock culinary creativity with Kitchen Helper, your go-to destination for delicious recipes that inspire and simplify your cooking journey.</p>


						<div class="form-group mt-5">
							<input type="text" id="username" class="form-control" placeholder="Username"
										 v-model="username">
						</div>

						<div class="form-group">
							<input type="email" id="email" class="form-control" placeholder="Email address"
										 v-model="email">
						</div>

						<div class="form-group">
							<input type="password" id="password" class="form-control" placeholder="Password"
										 v-model="password">
						</div>

						<div class="form-group">
							<input type="password" id="password2" class="form-control" placeholder="Repeat Password"
										 v-model="password2">
						</div>
						<p class="error" :class="{show: errorFound}">{{ errorMessage }}</p>
						<button id="btn" class="btn btn-lg btn-block form-btn font-weight-bold">Sign Up</button>
					</form>
					<div class="text-center pt-4 font-weight-bold">
						<router-link to="/login">Login</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {ref} from 'vue'
import {useAuthStore} from "../../stores/authStore";
import {useRouter} from 'vue-router';

const auth = useAuthStore()
const router = useRouter()

let username = ref('')
let email = ref('')
let password = ref('')
let password2 = ref('')
let errorFound = ref(false)
let errorMessage = ref('')

async function signUp() {
	errorFound.value = false
	errorMessage.value = ''

	if (username.value === '' || email.value === '' || password.value === '' || password2.value === '') {
		errorFound.value = true
		errorMessage.value = 'Please fill all fields.'
		return;
	}

	if (username.value.length < 3 || username.value.length > 30) {
		errorFound.value = true
		errorMessage.value = 'Username must be between 3 and 30 characters long.'
		return;
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const isValidEmail = emailRegex.test(email.value);

	if (!isValidEmail) {
		errorFound.value = true
		errorMessage.value = 'Please enter valid email.'
		return;
	}

	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&?]).{8,}$/;
	const isValidPassword = passwordRegex.test(password.value);

	if (!isValidPassword) {
		errorFound.value = true
		errorMessage.value = 'The password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special symbol (!@#$%^&?).'
		return;
	}
	if (password.value !== password2.value) {
		errorFound.value = true
		errorMessage.value = "Passwords didn't match."
		return;
	}
	try {
		await auth.register(username.value, email.value, password.value)
		router.push({name: "check-email"});
	} catch (error) {
		errorFound.value = true
		errorMessage.value = error.message
	}
}


</script>

<style scoped>
a {
	color: var(--main-color);
}

.loginform .form-group {
	margin-top: 1.2rem;
}

.container-fluid {
	overflow: hidden;
}

.form-btn {
	font-size: 1rem;
	font-weight: normal;
	margin-top: 1rem;
	width: 100%;
	background-color: var(--main-color);
	color: var(--white);
}

.form-btn:hover {
	background-color: var(--main-hover);
	border: 1px solid var(--main-color);
	color: var(--main-text);
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
	max-width: 360px;
	color: var(--main-alert);
	font-size: .8rem;
}

.show {
	display: block;
	margin-top: 1rem;
	margin-bottom: 0;
}
form p {
	max-width: 500px;
	font-size: .85rem;
}
</style>