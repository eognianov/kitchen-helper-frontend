<template>
	<featured-recipes></featured-recipes>
	<top-recipes></top-recipes>
	<list-recipes></list-recipes>
</template>

<script>
import FeaturedRecipes from "./FeaturedRecepies/FeaturedRecipes.vue";
import TopRecipes from "./TopRecipes/TopRecipes.vue";
import ListRecipes from "./ListRecipes/ListRecipes.vue";

export default {
	components: {
		'featured-recipes': FeaturedRecipes,
		'top-recipes': TopRecipes,
		'list-recipes': ListRecipes,
	},
	name: "IndexPage.vue"
}
</script>

<style scoped>

</style>