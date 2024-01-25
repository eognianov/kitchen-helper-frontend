<template>
	<div class="container">
		<h1>Category
			<span v-if="category"> {{ category.name }}</span>
			<span v-if="errorFound"> not found</span>
		</h1>
		<p>Total items: {{items}}</p>
		<list-recipes v-if="recipes.length > 0" :recipes="recipes" :key="refreshState"></list-recipes>
	</div>

</template>

<script setup>
import {ref} from 'vue'
import axios from "axios";
import {useRoute} from "vue-router";
import {useAuthStore} from "@/stores/authStore";
import {useRecipeStore} from "@/stores/recipeStore";
import ListRecipes from './ListRecipes.vue'

const auth = useAuthStore()
const route = useRoute()
const recipeStore = useRecipeStore()
const errorFound = ref(false)

const recipes = ref( [])
const refreshState = ref(0)
const category = ref(null)
const items = ref( null)

async function getRecipesByCategory() {
	recipeStore.resetSearch()
	recipeStore.recipes = []
	recipeStore.filters.category = route.params.id
	recipeStore.page_size = 6
	recipeStore.page = 1
	try {
		let response = await axios.get(`/categories/${route.params.id}`)
		if (response.status === 200) {
			category.value = response.data
		}
	} catch (e) {
		errorFound.value = true
		return
	}
	await recipeStore.searchTrigger(auth.token)
	recipes.value = recipeStore.recipes
	items.value = recipeStore.total_items
	errorFound.value = false
	refreshState.value += 1
}

getRecipesByCategory()
</script>

<style scoped>
h1 {
	margin-top: 40px;
}
</style>