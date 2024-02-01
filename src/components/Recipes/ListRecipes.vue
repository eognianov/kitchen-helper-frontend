<template>
	<div class="list">
		<div class="container">

			<div class="row">
				<div class="col-lg-12 header">
					<h5><i class="fa fa-cutlery" aria-hidden="true"></i> List Recipes</h5>
					<div class="d-flex justify-content-start sort-wrapper" v-if="recipes.length > 0 || isLoading">
						<div class="d-flex align-items-center" id="sort-title">Sort by:</div>
						<div class="sort-criteria"
								 @click="handleName">
							Name
							<i class="fa-solid fa-arrow-down" v-if="nameDirection === null" style="color: var(--backgrond)"></i>
							<i class="fa-solid fa-arrow-down" v-if="nameDirection === 'asc'"></i>
							<i class="fa-solid fa-arrow-up" v-if="nameDirection === 'desc'"></i>
						</div>
						<div class="sort-criteria"
								 @click="handleCategory">
							Category
							<i class="fa-solid fa-arrow-down" v-if="categoryDirection === null" style="color: var(--backgrond)"></i>
							<i class="fa-solid fa-arrow-down" v-if="categoryDirection === 'asc'"></i>
							<i class="fa-solid fa-arrow-up" v-if="categoryDirection === 'desc'"></i>
						</div>
						<div class="sort-criteria"
								 @click="handleDate">
							Date
							<i class="fa-solid fa-arrow-down" v-if="dateDirection === null" style="color: var(--backgrond)"></i>
							<i class="fa-solid fa-arrow-down" v-if="dateDirection === 'asc'"></i>
							<i class="fa-solid fa-arrow-up" v-if="dateDirection === 'desc'"></i>
						</div>
						<div class="sort-criteria"
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
					<div v-if="recipes.length === 0 && !isLoading">No recipes found</div>
				</div>
				<div
						v-if="isLoading"
						class="container d-flex justify-content-center mt-15 mb-15 pr-16"
						style="width: 100%; height: 50px">
					<LoadingWheel></LoadingWheel>
				</div>
				<div ref="target"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
import RecipeBox from "./RecipeBox.vue";
import LoadingWheel from './LoadingWheel.vue'
import {onMounted, ref, watch} from 'vue';
import {useElementVisibility} from "@vueuse/core";
import {useAuthStore} from "@/stores/authStore";

const props = defineProps(['store'])
const store = props.store;
const auth = useAuthStore();

const recipes = ref([])

onMounted(() => {
	recipes.value = []
	recipes.value = store.recipes
	reloadList.value += 1
})


// load more on scroll if any
const target = ref(null)
const targetIsVisible = useElementVisibility(target)

function nextPage() {
	store.nextPage(auth.token)
}

watch(targetIsVisible, (targetVisible) => {
	if (targetVisible === true && store.next_page !== null) {
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
	recipes.value = []

	await store.searchTrigger(auth.token)
	setTimeout(() => {
		recipes.value = store.recipes
		isLoading.value = false
		reloadList.value += 1;
	}, 300)
}

function handleCategory() {
	if (!isLoading.value) {
		if (categoryDirection.value === null) {
			categoryDirection.value = 'asc'
		} else if (categoryDirection.value === 'asc') {
			categoryDirection.value = 'desc'
		} else {
			categoryDirection.value = null
		}
		store.sort['category.name'] = categoryDirection.value
		submitSearch()
	}
}

function handleName() {
	if (!isLoading.value) {
		if (nameDirection.value === null) {
			nameDirection.value = 'asc'
		} else if (nameDirection.value === 'asc') {
			nameDirection.value = 'desc'
		} else {
			nameDirection.value = null
		}
		store.sort.name = nameDirection.value
		submitSearch()
	}
}

function handleDate() {
	if (!isLoading.value) {
		if (dateDirection.value === null) {
			dateDirection.value = 'asc'
		} else if (dateDirection.value === 'asc') {
			dateDirection.value = 'desc'
		} else {
			dateDirection.value = null
		}
		store.sort.created_on = dateDirection.value
		submitSearch()
	}
}

function handleReset() {
	if (!isLoading.value) {
		dateDirection.value = null
		nameDirection.value = null
		categoryDirection.value = null

		store.sort.name = null
		store.sort['category.name'] = null
		store.sort.created_on = null
		submitSearch()
	}
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
	width: 200px;
}

.sort-criteria:hover {
	cursor: pointer;
}

.sort-wrapper {
	gap: 1rem;
}

@media only screen and (max-width: 991px) {
	#sort-title {
		width: 110px;
	}
}

@media only screen and (max-width: 768px) {
	#sort-title {
		width: 150px;
	}

	.sort-criteria:nth-child(3) {
		width: 240px;
	}
}

@media only screen and (max-width: 550px) {
	.header {
		font-size: .8rem;
	}

	#sort-title {
		display: none !important;
	}

	.sort-wrapper {
		gap: .4rem;
	}
}

@media only screen and (max-width: 422px) {
	.sort-criteria:last-child {
		display: none;
	}
}
</style>