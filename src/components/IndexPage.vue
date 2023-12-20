<template>
	<featured-recipes></featured-recipes>
	<top-recipes></top-recipes>
	<list-recipes></list-recipes>
</template>

<script>
import FeaturedRecipes from "./Recipes/FeaturedRecipes.vue";
import TopRecipes from "./Recipes/TopRecipes.vue";
import ListRecipes from "./Recipes/ListRecipes.vue";

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