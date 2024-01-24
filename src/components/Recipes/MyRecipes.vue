<template>
	<div class="container mt-5">
		<h2><i class="fa fa-cutlery mr-1" aria-hidden="true"></i> MyRecipes </h2>

		<div class="row">
			<div class="col-lg-12 recipe-list">
				<div class="d-flex justify-content-between recipe-list-element table-top-row">
					<span><b>Recipe Name</b></span>
					<span><b>Published</b></span>
				</div>
				<MyRecipesBox v-for="recipe in recipes"
											:key="recipe.id"
											:recipe="recipe"
											class="recipe-list-element">

				</MyRecipesBox>
			</div>
		</div>
	</div>
</template>

<script setup>
import MyRecipesBox from './MyRecipesBox.vue'
import {ref} from "vue";
import {useAuthStore} from "@/stores/authStore";
import {useRecipeStore} from "@/stores/recipeStore";

const auth = useAuthStore();
const recipeStore = useRecipeStore()

const recipes = ref([])

async function getRecipes() {
	await auth.init()
	recipeStore.resetSearch()
	recipeStore.filters.created_by = auth.user.id
	recipeStore.page_size = 100
	recipeStore.page = 1
	await recipeStore.searchTrigger(auth.token)
	recipes.value = recipeStore.recipes
}

getRecipes()

</script>

<style scoped>
h2 {
	font-size: 1.2rem;
	margin-bottom: 20px;
	padding-bottom: 10px;
	border-bottom: 1px dashed var(--main-text)
}

.recipe-list-element  {
	padding: 4px 10px;
}

.recipe-list-element:nth-child(2n) {

	background-color: var(--light-background);
}
</style>