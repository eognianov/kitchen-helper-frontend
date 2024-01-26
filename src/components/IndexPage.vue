<template>
	<featured-recipes></featured-recipes>
	<top-recipes></top-recipes>
	<list-recipes :store="recipeStore"></list-recipes>
</template>

<script setup>
import FeaturedRecipes from "./Recipes/FeaturedRecipes.vue";
import TopRecipes from "./Recipes/TopRecipes.vue";
import ListRecipes from "./Recipes/ListRecipes.vue";
import {useRecipeStore} from "@/stores/recipeStore";

const recipeStore = useRecipeStore()

</script>

<style scoped>

</style>