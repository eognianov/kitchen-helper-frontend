<template>
	<!--	<h1 v-if="user">Hello {{ user.username }}</h1>-->

	<nav-bar :user="user" @logout-user="logoutUser"></nav-bar>
	<router-view></router-view>
	<footer-nav></footer-nav>
</template>

<script setup>
import axios from "axios";
import VueJwtDecode from 'vue-jwt-decode';
import {ref} from 'vue'
import NavBar from './components/Main/NavBar.vue';
import FooterNav from './components/Main/FooterNav.vue';

let token = ref(localStorage.getItem('token'))
let user = ref(null);
// import {useCounterStore} from "@/stores/counter";
//
// const counter = useCounterStore()

async function getUser(token) {
	let decoded = VueJwtDecode.decode(token);
	let response = await axios.get(`users/${decoded.sub}/`)
	if (response.status === 200) {
		user.value = response.data
	}
}

if (token.value) {
	getUser(token.value)
}

function logoutUser() {
	localStorage.removeItem('token');
	user.value = null;
	token.value = null;
}

function loginUser() {
	localStorage.getItem('token');
	getUser(token.value)
}

</script>

<style>
:root {
	--white: #FFFFFF;
	--main-color: #FBB040;
	--main-text: #333333;
	--secondary-text: #727272;
	--light-text: #DDD;
	--backgrond: #727272;
	--light-background: #DEDEDE;
	--very-light-background: #F8F8F8;
	--dark-background: #333333;
	--dark-background-transparent: #33333366;
	--main-hover: #F8F8F8;
	--main-alert: #e13b2b;
}

body {
	font-family: 'Roboto', sans-serif;
	letter-spacing: .5px;
	padding-top: 90px;
}

body, html {
	height: 100%;
}

a {
	text-decoration: none !important;
}

@media only screen and (max-width: 992px) {
	body {
		padding-top: 70px;
	}
}

@media only screen and (max-width: 480px) {
	body {
		padding-top: 50px;
	}
}
</style>