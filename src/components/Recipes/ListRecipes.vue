<template>
	<div class="list">
		<div class="container">

			<div class="row">
				<div class="col-lg-12 header">
					<h5><i class="fa fa-cutlery" aria-hidden="true"></i> List Recipes</h5>
					<div class="ga-2 d-flex justify-content-start" v-if="recipes.length > 0">
						<div class="col-lg-2 d-flex align-items-center" id="sort-title">Sort by:</div>
						<div class="sort-criteria col-lg-2"
								 @click="handleName">
							Name
							<i class="fa-solid fa-arrow-down" v-if="nameDirection === null" style="color: var(--backgrond)"></i>
							<i class="fa-solid fa-arrow-down" v-if="nameDirection === 'asc'"></i>
							<i class="fa-solid fa-arrow-up" v-if="nameDirection === 'desc'"></i>
						</div>
						<div class="sort-criteria col-lg-2"
								 @click="handleCategory">
							Category
							<i class="fa-solid fa-arrow-down" v-if="categoryDirection === null" style="color: var(--backgrond)"></i>
							<i class="fa-solid fa-arrow-down" v-if="categoryDirection === 'asc'"></i>
							<i class="fa-solid fa-arrow-up" v-if="categoryDirection === 'desc'"></i>
						</div>
						<div class="sort-criteria col-lg-2"
								 @click="handleDate">
							Date
							<i class="fa-solid fa-arrow-down" v-if="dateDirection === null" style="color: var(--backgrond)"></i>
							<i class="fa-solid fa-arrow-down" v-if="dateDirection === 'asc'"></i>
							<i class="fa-solid fa-arrow-up" v-if="dateDirection === 'desc'"></i>
						</div>
						<div class="sort-criteria col-lg-2"
								 @click="handleReset">
							Reset
						</div>
					</div>
				</div>

				<div :key="reloadList">
					<div v-if="recipes.length > 0 && !isLoading" class="row">
						<div class="col-lg-4 col-sm-6" v-for="recipe in recipes" :key="recipe.id">
							<recipe-box :recipe="recipe"></recipe-box>
						</div>
					</div>
					<div v-if="recipes.length === 0">No recipes found</div>
					<div class="col-lg-12 text-center">
						<button class="btn btn-load"
										@click="nextPage"
										v-if="recipeStore.next_page"
						>Load More
						</button>
					</div>
				</div>
				<div
						v-if="isLoading"
						class="container d-flex justify-content-center">
					<div class="lds-ring">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
				<div ref="target"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
import RecipeBox from "./RecipeBox.vue";
import {ref, watch} from 'vue';
import {useElementVisibility} from "@vueuse/core";
import {useRecipeStore} from "@/stores/recipeStore";
import {useAuthStore} from "@/stores/authStore";

const recipeStore = useRecipeStore();
const auth = useAuthStore();

const recipes = ref([])

function getRecipes() {
	recipes.value = recipeStore.recipes
}

getRecipes()


// load more on scroll if any
const target = ref(null)
const targetIsVisible = useElementVisibility(target)

function nextPage() {
	recipeStore.nextPage(auth.token)
}

watch(targetIsVisible, (targetVisible) => {
	if (targetVisible === true && recipeStore.next_page !== null) {
		nextPage()
	}
})

const categoryDirection = ref(null)
const nameDirection = ref(null)
const dateDirection = ref(null)
const isLoading = ref(false)
const reloadList = ref(0)

async function submitSearch() {
	isLoading.value = true
	recipeStore.recipes = []

	await recipeStore.searchTrigger(auth.token)
	setTimeout(() => {
		getRecipes()
		isLoading.value = false
		reloadList.value += 1;
	}, 300)
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
	categoryDirection.value = null

	recipeStore.sort.name = null
	recipeStore.sort['category.name'] = null
	recipeStore.sort.created_on = null
	submitSearch()
}
</script>

<style>
.list {
	margin-top: 80px;
	margin-bottom: 40px;
}

.list .header {
	margin-bottom: 40px;
}

.list h5 {

	padding-bottom: 20px;
	border-bottom: 1px dashed var(--dark-background);
	color: var(--main-text);
}

.list .btn-load {
	padding: 15px 30px;
	color: var(--white);
	border: 1px solid var(--dark-background);
	border-radius: 6px;
	background: var(--dark-background);
	margin-top: 20px;
}

.list .btn-load:hover {
	text-decoration: none;
	background-color: var(--main-hover);
	border: 1px solid var(--dark-background);
	color: var(--main-text);
	transition: all 0.3s ease;
}

.list .box.grid.recipes .by {
	padding: 10px 15px;
	font-size: 15px;
}

.list .box.grid.recipes a {
	font-size: 1.2rem
}

.list .box.grid.recipes p {
	font-size: .9rem
}

.sort-criteria {
	padding: 3px 10px;
	background-color: var(--backgrond);
	border-radius: 5px;
	color: var(--white);
}

.sort-criteria:hover {
	cursor: pointer;
}

.lds-ring {
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
}

.lds-ring div {
	box-sizing: border-box;
	display: block;
	position: absolute;
	width: 64px;
	height: 64px;
	margin: 8px;
	border: 8px solid var(--light-background);
	border-radius: 50%;
	animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	border-color: var(--light-background) transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
	animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
	animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
	animation-delay: -0.15s;
}

@keyframes lds-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

@media only screen and (max-width: 460px) {
	.header {
		font-size: .8rem;
	}

	#sort-title {
		display: none !important;
	}
}
</style>