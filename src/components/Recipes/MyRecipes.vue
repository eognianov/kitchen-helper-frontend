<template>
	<div class="container mt-5">
		<h2><i class="fa fa-cutlery mr-1" aria-hidden="true"></i> My Recipes </h2>

		<div class="row">
			<div class="col-lg-12 recipe-list">
				<div class="d-flex justify-content-between recipe-list-element table-top-row">
					<span><b>Recipe Name</b></span>
					<span><b>Published</b></span>
				</div>
				<div v-if="recipes.length > 0 && !isLoading" :key="reloadState">
					<MyRecipesBox v-for="recipe in recipes"
												:key="recipe.id"
												:recipe="recipe"
												class="recipe-list-element">

					</MyRecipesBox>
				</div>
			</div>
			<div v-if="isLoading" class="d-flex justify-content-center mt-15">
				<LoadingWheel class="mb-15"></LoadingWheel>
			</div>
		</div>
	</div>
</template>

<script setup>
import MyRecipesBox from './MyRecipesBox.vue'
import LoadingWheel from './LoadingWheel.vue'
import {ref} from "vue";
import {useAuthStore} from "@/stores/authStore";
import {useMyRecipesStore} from "@/stores/myRecipesStore";

const auth = useAuthStore();
const myRecipesStore = useMyRecipesStore()

const recipes = ref([])
const isLoading = ref(false)
const reloadState = ref(0)

async function init() {
	isLoading.value = true
	await auth.init()
	myRecipesStore.filters.created_by = auth.user.id
	myRecipesStore.page_size = 100
	myRecipesStore.page_number = 1
	await myRecipesStore.searchTrigger(auth.token)
	recipes.value = myRecipesStore.recipes
	reloadState.value += 1
	isLoading.value = false
}

init()

</script>

<style scoped>
h2 {
	font-size: 1.2rem;
	margin-bottom: 20px;
	padding-bottom: 10px;
	border-bottom: 1px dashed var(--main-text)
}

.recipe-list-element {
	padding: 4px 10px;
}

.recipe-list-element:nth-child(2n) {
	background-color: var(--light-background);
}
.table-top-row {
	background-color: var(--backgrond);
	color: var(--white);
}
</style>