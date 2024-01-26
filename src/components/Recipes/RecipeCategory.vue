<template>
	<div class="container">
		<div v-if="!isLoading">
			<h1>
				<span v-if="category"> {{ category.name }}</span>
				<span v-if="errorFound"> not found</span>
			</h1>
			<p>Total items: {{ items }}</p>
			<list-recipes v-if="recipes.length > 0" :recipes="recipes" :key="refreshState" :store="categoryStore"></list-recipes>
		</div>
		<div
				v-if="isLoading"
				class="container d-flex justify-content-center mt-15">
			<LoadingWheel></LoadingWheel>
		</div>
	</div>

</template>

<script setup>
import {ref, onMounted} from 'vue'
import axios from "axios";
import {useRoute} from "vue-router";
import {useAuthStore} from "@/stores/authStore";
import {useCategoryStore} from "@/stores/categoryStore";
import ListRecipes from './ListRecipes.vue'
import LoadingWheel from './LoadingWheel.vue'

const auth = useAuthStore()
const route = useRoute()
const categoryStore= useCategoryStore()
const errorFound = ref(false)
const isLoading = ref(false)

const recipes = ref([])
const refreshState = ref(0)
const category = ref(null)
const items = ref(null)

onMounted(async () => {
	isLoading.value = true
	categoryStore.recipes = []
	categoryStore.filters.category = route.params.id
	try {
		let response = await axios.get(`/categories/${route.params.id}`)
		if (response.status === 200) {
			category.value = response.data
		}
	} catch (e) {
		errorFound.value = true
		return
	}
	await categoryStore.searchTrigger(auth.token)
	recipes.value = categoryStore.recipes
	items.value = categoryStore.total_items
	errorFound.value = false
	refreshState.value += 1
	isLoading.value = false
})
</script>

<style scoped>
h1 {
	margin-top: 40px;
}

</style>