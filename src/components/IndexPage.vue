<template>
	<featured-recipes></featured-recipes>
	<top-recipes></top-recipes>
	<list-recipes></list-recipes>
</template>

<script setup>
import {ref} from 'vue'

import {useAuthStore} from "@/stores/authStore";
import {useRecipeStore} from "@/stores/recipeStore";
import FeaturedRecipes from "./Recipes/FeaturedRecipes.vue";
import TopRecipes from "./Recipes/TopRecipes.vue";
import ListRecipes from "./Recipes/ListRecipes.vue";

const auth = useAuthStore()
const recipeStore = useRecipeStore()

const recipes = ref(recipeStore.recipes)

async function getRecipes() {
	recipeStore.resetSearch(auth.token)
	recipeStore.page = 1
	recipeStore.page_size = 6
	recipes.value = await recipeStore.init()
}
getRecipes()
</script>

<style scoped>

</style>