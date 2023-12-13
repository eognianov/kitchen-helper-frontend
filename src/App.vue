<template>
	<nav-bar></nav-bar>
	<featured-recipes></featured-recipes>
	<top-recipes></top-recipes>
	<list-recipes></list-recipes>
	<footer-nav></footer-nav>
</template>

<script>
import NavBar from './components/NavBar.vue';
import FeaturedRecipes from './components/FeaturedRecipes.vue';
import TopRecipes from './components/TopRecipes.vue';
import ListRecipes from './components/ListRecipes.vue';
import FooterNav from './components/FooterNav.vue';

export default {
	components: {
		'nav-bar': NavBar,
		'featured-recipes': FeaturedRecipes,
		'top-recipes':TopRecipes,
		'list-recipes':ListRecipes,
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