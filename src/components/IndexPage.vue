<template>
	<div v-if="!isLoading">
		<featured-recipes></featured-recipes>
		<top-recipes></top-recipes>
		<list-recipes :store="recipeStore"></list-recipes>
	</div>

	<div
			v-if="isLoading"
			class="container d-flex justify-content-center mt-15">
		<LoadingWheel class="mb-15"></LoadingWheel>
	</div>

</template>

<script setup>
import FeaturedRecipes from "./Recipes/FeaturedRecipes.vue";
import TopRecipes from "./Recipes/TopRecipes.vue";
import ListRecipes from "./Recipes/ListRecipes.vue";
import {useAuthStore} from "@/stores/authStore";
import {useRecipeStore} from "@/stores/recipeStore";
import LoadingWheel from './Recipes/LoadingWheel.vue';
import {ref} from 'vue'

const auth = useAuthStore()
const recipeStore = useRecipeStore()
const isLoading = ref(false)

async function init() {
	isLoading.value = true
	await recipeStore.init(auth.token)
	isLoading.value = false
}

init()


</script>

<style scoped>

</style>