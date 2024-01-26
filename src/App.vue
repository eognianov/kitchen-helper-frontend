<template>
	<nav-bar></nav-bar>
	<router-view></router-view>
	<footer-nav></footer-nav>
</template>

<script setup>
import NavBar from './components/Main/NavBar.vue';
import FooterNav from './components/Main/FooterNav.vue';
import {useAuthStore} from "@/stores/authStore";

const auth = useAuthStore()

auth.init()

</script>

<style>
:root {
	--white: #FFFFFF;
	--main-color: #FBB040;
	--secondary-color: #bfd73f;
	--main-text: #333333;
	--secondary-text: #727272;
	--light-text: #DDD;
	--backgrond: #727272;
	--light-background: #DEDEDE;
	--very-light-background: #F0F0F0;
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