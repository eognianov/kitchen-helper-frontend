<template>
	<nav-bar></nav-bar>
	<router-view v-if="!isLoading"></router-view>
	<div v-if="isLoading" class="container d-flex justify-content-center mt-15">
		<loading-wheel class="mb-15"></loading-wheel></div>
	<footer-nav></footer-nav>
</template>

<script setup>
import NavBar from './components/Main/NavBar.vue';
import FooterNav from './components/Main/FooterNav.vue';
import {useAuthStore} from "@/stores/authStore";
import {useRecipeStore} from "@/stores/recipeStore";
import LoadingWheel from './components/Recipes/LoadingWheel.vue'
import {ref} from "vue";

const recipeStore = useRecipeStore()
const auth = useAuthStore()
const isLoading = ref(false)

async function init() {
	isLoading.value = true
	await auth.init()
	await recipeStore.init(auth.token)
	isLoading.value = false
}

init()
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
	--main-success: #30a306;
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