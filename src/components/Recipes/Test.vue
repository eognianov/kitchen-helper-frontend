<template>
	<div>
		<h1>Testing recipes load more button</h1>
		<ul>
			<li v-for="recipe in recipes" :key="recipe.id">{{ recipe.name }}</li>
		</ul>
		<button @click="getRecipes(next_page)" v-if="next_page">next page</button>
	</div>
</template>

<script setup>
import axios from "axios";
import {ref} from 'vue';

const next_page = ref(null)
const recipes = ref([])

async function getRecipes(current_url) {
	try {
		let response = await axios.get(current_url)
		if (response.data.next_page) {
			next_page.value = response.data.next_page
		} else {
			next_page.value = null
		}
		console.log(response.data.next_page)
		recipes.value.push(...response.data.recipes)
	} catch (error) {
		console.log(error)
	}
}
getRecipes('/recipes/?page=1&page_size=1')

</script>

<style scoped>

</style>