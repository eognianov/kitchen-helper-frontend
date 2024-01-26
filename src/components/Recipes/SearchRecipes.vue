<template>
	<div class="search">
		<form @submit.prevent="submitSearch()" class="container">
			<div class="row">
				<div class="col-lg-12">
					<h2>Browse Recipes</h2>
				</div>
				<div class="row">
					<div class="col-lg-3 mt-2">
						<label>Choose category</label>
						<select class="form-control" name="category" v-model="selectCategory">
							<option value="0" selected>All</option>
							<option
									v-for="category in categories"
									:key="category.id"
									:value="category.id">
								{{ category.name }}
							</option>
						</select>
					</div>
					<div class="col-lg-6 mt-2">
						<label>Select ingredients</label>
						<div class="form-group" @click="isModalOpen=true">
							<div v-if="selectIngredientNames.length === 0" class="ingredient-name">No ingredients selected</div>
							<div v-if="selectIngredientNames.length > 0" class="ingredient-name">
								{{ selectIngredientNames.join(', ') }}
							</div>
						</div>
					</div>
					<div class="col-lg-3 mt-2">
						<label>Recipe needs to have</label>
						<select class="form-control" name="category" v-model="selectConditionIngredient">
							<option value="all">All of selected ingredients</option>
							<option value="any">Any of selected ingredients</option>
						</select>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-9 mt-2">
						<label>Search by Keyword</label>
						<input type="text" class="form-control" v-model="searchKeyWord" placeholder="Search by Keyword">
					</div>
					<div class="col-lg-3 mt-2">
						<label>Search in </label>
						<select class="form-control" name="category" v-model="selectConditionSearch">
							<option value="title">Search in title</option>
							<option value="summary">Search in summary</option>
							<option value="any">Search in both</option>
						</select>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-12 form-group">
						<button type="submit" class="btn mt-3">Search Recipes</button>
					</div>
				</div>
			</div>
		</form>

	</div>
	<SelectIngredient
			:isModalOpen="isModalOpen"
			@hideModal="isModalOpen=false"
			@handleSelectIngredients="handleSelectIngredients"
	></SelectIngredient>
	<list-recipes :key="reloadList" v-if="!isLoading" :store="searchStore"></list-recipes>
	<div
			v-if="isLoading"
			class="container d-flex justify-content-center pr-15 mt-15">
		<LoadingWheel class="mb-15"></LoadingWheel>
	</div>
</template>

<script setup>
import {ref} from 'vue'
import ListRecipes from "./ListRecipes.vue";
import {useSearchStore } from "@/stores/searchStore";
import {useAuthStore} from "@/stores/authStore";
import SelectIngredient from './SelectIngredients.vue';
import LoadingWheel from './LoadingWheel.vue'

const isModalOpen = ref(false)

const searchStore = useSearchStore();
const auth = useAuthStore();

const categories = ref([])
const reloadList = ref(0)
const isLoading = ref(false)

const selectCategory = ref('0')
const selectIngredient = ref([])
const selectIngredientNames = ref([])
const selectConditionIngredient = ref('all')
const searchKeyWord = ref('')
const selectConditionSearch = ref('title')


async function init() {
	categories.value = await searchStore.getCategories()
}

init()

function handleSelectIngredients(listIngredients) {
	selectIngredient.value = []
	selectIngredientNames.value = []
	for (const key in listIngredients) {
		selectIngredient.value.push(listIngredients[key].id)
		selectIngredientNames.value.push(listIngredients[key].name)
	}
}

async function submitSearch() {
	isLoading.value = true
	searchStore.recipes = []
	if (selectCategory.value === '0') {
		searchStore.filters.category = null
	} else {
		searchStore.filters.category = selectCategory.value
	}
	if (searchKeyWord.value.trim() !== '') {
		searchKeyWord.value = searchKeyWord.value.replaceAll(/[-=:&?,]/g, '')
		searchStore.filters.search = selectConditionSearch.value + '-' + searchKeyWord.value
	} else {
		searchStore.filters.search = null
	}
	if (selectIngredient.value.length > 0) {
		searchStore.filters.ingredient = selectConditionIngredient.value + '-' + selectIngredient.value.join('-')
	} else {
		searchStore.filters.ingredient = null
	}

	await searchStore.searchTrigger(auth.token)

	setTimeout(() => {
		isLoading.value = false
		reloadList.value += 1;
	}, 300)
}
</script>

<style scoped>
.search {
	padding: 60px 0;
	background-color: var(--very-light-background);
	color: var(--main-text);
}

.search h2 {
	font-size: 1.2rem;
	margin-bottom: 20px;
	padding-bottom: 10px;
	border-bottom: 1px dashed var(--main-text)
}

.search .form-group {
	position: relative
}

.search .form-group label {
	display: block
}

.search .form-group .btn {
	position: absolute;
	top: 0;
	right: 0;
	height: 45px;
	color: var(--white);
	padding: 10px 25px;
	border-radius: 6px;
	background-color: var(--main-color);
}

.search .btn:hover {
	color: var(--main-text);
	background-color: var(--main-hover);
	border: 1px solid var(--main-color);
	font-weight: 400;
}


.search .form-group .btn {
	position: static;
	border-radius: 3px;
	width: 100%
}

.form-control {
	height: 45px;
}

.ingredient-name {
	box-sizing: border-box;
	padding: 10px 10px;
	width: 100%;
	height: 45px;
	line-height: 1.3;
	background-color: var(--white);
	color: var(--main-text);
	border-radius: 5px;
	overflow: hidden;
	overflow-y: scroll;

	border: 1px solid var(--light-background);
}

.ingredient-name:hover {
	cursor: pointer;
}

label {
	padding-left: 5px;
	padding-bottom: 2px;
}
</style>