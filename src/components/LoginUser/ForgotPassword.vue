<template>

	<div v-if="!emailSend" class="container h-100 d-flex justify-content-center loginform">
		<div class="row h-100 align-items-center justify-content-center">

			<div
					class="col-md-12 col-lg-8 py-5 mx-2 right-column d-flex flex-column align-items-center align-self-center shadow-lg">
				<div class="col-md-12">
					<form @submit.prevent="submitForm">
						<h3>Forgot Password</h3>
						<p>Enter your username and email address below to get a password reset link.</p>

						<div class="form-group mt-4">
							<input type="text" class="form-control" placeholder="username" v-model="username">
						</div>
						<div class="form-group mt-3">
							<input type="email" id="email" class="form-control" placeholder="Email address" v-model="email">
						</div>
						<p class="error" :class="{show: errorFound}">{{ errorMessage }}</p>
						<button id="btn" class="btn btn-lg btn-block form-btn font-weight-bold">Send</button>
					</form>
					<div class="text-center pt-4 font-weight-bold">
						<router-link to="/login">Login</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div v-if="emailSend">
		<div class="container d-flex justify-content-center loginform" style="margin-top:1rem;">
			<div class="row align-items-center justify-content-center">
				<div
						class="col-lg-12 col-lg-8 py-5 mx-2 d-flex flex-column align-items-center align-self-center shadow-lg">
					<h3 class="text-center">Reset password confirmation email was send </h3>
					<p class="text-center">Please check yor email for confirmation</p>
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
import axios from "axios";

const username = ref('')
const email = ref('')
const errorFound = ref(false)
const errorMessage = ref('')
const emailSend = ref(false)

async function submitForm() {
	if (username.value === '' || email.value === '') {
		errorFound.value = true;
		errorMessage.value = 'Please provide username and email';
		return;
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const isValidEmail = emailRegex.test(email.value);
	if (username.value.length < 3) {
		errorFound.value = true
		errorMessage.value = 'Please enter valid username'
		return;
	}
	if (!isValidEmail) {
		errorFound.value = true
		errorMessage.value = 'Please enter valid email'
		return;
	}
	try {
		const response = await axios.post(`/users/request-password-reset?username=${username.value}&email=${email.value}`,)
		if (response.status === 200) {
			errorFound.value = false;
			errorMessage.value = ''
			emailSend.value = true
		}
	} catch (error) {
		errorFound.value = true;
		errorMessage.value = error.message
	}
}

</script>

<style scoped>

.loginform {
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