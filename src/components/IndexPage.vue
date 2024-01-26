<template>
	<featured-recipes></featured-recipes>
	<top-recipes></top-recipes>
	<list-recipes :store="recipeStore"></list-recipes>
</template>

<script setup>
import FeaturedRecipes from "./Recipes/FeaturedRecipes.vue";
import TopRecipes from "./Recipes/TopRecipes.vue";
import ListRecipes from "./Recipes/ListRecipes.vue";
import {useAuthStore} from "@/stores/authStore";
import {useRecipeStore} from "@/stores/recipeStore";

const auth = useAuthStore()
const recipeStore = useRecipeStore()

recipeStore.init(auth.token)

</script>

<style scoped>

</style>