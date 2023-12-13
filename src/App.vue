<template>
	<nav-bar></nav-bar>
	<router-view></router-view>
	<footer-nav></footer-nav>
</template>

<script>
import NavBar from './components/NavBar/NavBar.vue';
import FooterNav from './components/FooterNav/FooterNav.vue';

export default {
	components: {
		'nav-bar': NavBar,
		'footer-nav':FooterNav,
	}
}

</script>

<style>
body {
	font-family: 'Roboto', sans-serif;
	letter-spacing: .5px;
}

body, html {
	height: 100%;
}

body {
	padding-top: 104px;
}


@media only screen and (max-width: 480px) {
	body {
		padding-top: 74px;
	}
}
</style>