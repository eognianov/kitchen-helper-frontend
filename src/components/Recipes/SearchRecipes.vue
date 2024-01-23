<template>
	<div class="search">
		<form @submit.prevent="submitSearch()" class="container">
			<div class="row">
				<div class="col-lg-12">
					<h2>Browse Recipes</h2>
				</div>
				<div class="row">
					<div class="col-lg-3 form-group">
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
					<div class="col-lg-6" style="position: relative">
						<label>Select one or more ingredients that should be included in recipe</label>
						<div class="form-group">
							<a @click="isModalOpen=true" class="btn">Select ingredients</a>
							<div class="" style="width: 100%; overflow: hidden">
								<span v-if="selectIngredientNames.length === 0" class="ingredient-name">No ingredients selected</span>
								<span v-for="ingredient in selectIngredientNames"
											:key="ingredient"
											class="ingredient-name mt-2 mr-2">
                {{ ingredient }},
              </span>
							</div>
						</div>
					</div>
					<div class="col-lg-3 form-group">
						<label>Recipe needs to have</label>
						<select class="form-control" name="category" v-model="selectConditionIngredient">
							<option value="all">All of selected ingredients</option>
							<option value="any">Any of selected ingredients</option>
						</select>
					</div>
				</div>
				<div class="row mt-2">
					<div class="col-lg-9 form-group">
						<label>Search by Keyword</label>
						<input type="text" class="form-control" v-model="searchKeyWord" placeholder="Search by Keyword">
					</div>
					<div class="col-lg-3 form-group">
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
		<div class="container mt-3">
			<h2>Sort Recipes</h2>
			<div class="row ga-2 pl-2 pr-6 d-flex justify-content-between">
				<div class="col-lg-2 d-flex align-items-center">Sort by:</div>
				<div class="sort-criteria col-lg-2"
						 @click="handleName">
					Name: {{ nameDirection ? nameDirection : "None" }}
				</div>
				<div class="sort-criteria col-lg-2"
						 @click="handleCategory">
					Category: {{ categoryDirection ? categoryDirection : "None" }}
				</div>
				<div class="sort-criteria col-lg-2"
						 @click="handleDate">
					Date: {{ dateDirection ? dateDirection : "None" }}
				</div>
				<div class="sort-criteria col-lg-2"
						 @click="handleReset">
					Reset sort
				</div>
			</div>
		</div>
	</div>
	<SelectIngredient
			:isModalOpen="isModalOpen"
			@hideModal="isModalOpen=false"
			@handleSelectIngredients="handleSelectIngredients"
	></SelectIngredient>
	<list-recipes :key="reloadList" v-if="!isLoading"></list-recipes>
	<div v-if="isLoading" class="container text-center mt-6">
		<p>Loading...</p>
	</div>

</template>

<script setup>
import {ref} from 'vue'
import ListRecipes from "./ListRecipes.vue";
import {useRecipeStore} from "@/stores/recipeStore";
import {useAuthStore} from "@/stores/authStore";
import SelectIngredient from './SelectIngredients.vue';

const isModalOpen = ref(false)

const recipeStore = useRecipeStore();
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

const categoryDirection = ref(null)
const nameDirection = ref(null)
const dateDirection = ref(null)


async function init() {
	categories.value = await recipeStore.getCategories()
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
	recipeStore.recipes = []
	if (selectCategory.value === '0') {
		recipeStore.filters.category = null
	} else {
		recipeStore.filters.category = selectCategory.value
	}
	if (searchKeyWord.value.trim() !== '') {
		searchKeyWord.value = searchKeyWord.value.replaceAll(/[-=:&?,]/g, '')
		recipeStore.filters.search = selectConditionSearch.value + '-' + searchKeyWord.value
	} else {
		recipeStore.filters.search = null
	}
	if (selectIngredient.value.length > 0) {
		recipeStore.filters.ingredient = selectConditionIngredient.value + '-' + selectIngredient.value.join('-')
	} else {
		recipeStore.filters.ingredient = null
	}


	await recipeStore.searchTrigger(auth.token)
	isLoading.value = false
	reloadList.value += 1;
}

function handleCategory() {
	if (categoryDirection.value === null) {
		categoryDirection.value = 'asc'
	} else if (categoryDirection.value === 'asc') {
		categoryDirection.value = 'desc'
	} else {
		categoryDirection.value = null
	}
	recipeStore.sort['category.name'] = categoryDirection.value
	submitSearch()
}

function handleName() {
	if (nameDirection.value === null) {
		nameDirection.value = 'asc'
	} else if (nameDirection.value === 'asc') {
		nameDirection.value = 'desc'
	} else {
		nameDirection.value = null
	}
	recipeStore.sort.name = nameDirection.value
	submitSearch()
}

function handleDate() {
	if (dateDirection.value === null) {
		dateDirection.value = 'asc'
	} else if (dateDirection.value === 'asc') {
		dateDirection.value = 'desc'
	} else {
		dateDirection.value = null
	}
	recipeStore.sort.created_on = dateDirection.value
	submitSearch()
}
function handleReset() {
	dateDirection.value = null

	nameDirection.value = null
	recipeStore.sort.name = nameDirection.value
	categoryDirection.value = null
	recipeStore.sort['category.name'] = categoryDirection.value
	recipeStore.sort.created_on = dateDirection.value
	submitSearch()
}

</script>

<style scoped>
.search {
	padding: 60px 0;
	background-color: var(--main-hover);
	color: var(--main-text);
}

/*.search .form-group .form-control, .search .form-group input {*/
/*  height: 45px*/
/*}*/

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
	display: inline-block;
	font-size: .8rem;
	/*background-color: var(--secondary-color);*/
	color: var(--main-text);
	border-radius: 5px;
}

.sort-criteria {
	background-color: var(--main-color);
	color: var(--white);
	border-radius: 5px;
	padding: 10px 10px;
	/*margin-left: 1rem;*/
}

.sort-criteria:hover {
	cursor: pointer;
}
</style>