<template>
	<div v-if="recipeFirst.length > 0 || recipeSecond.length > 0 || recipeThird.length > 0">
		<div class="top">
			<div class="container">
				<div class="row" >
					<div v-if="recipeFirst.length > 0" class="col-lg-4 col-sm-12">
						<div  v-for="recipe in recipeFirst" :key="recipe.id">
							<h5><i class="fa fa-cutlery" aria-hidden="true"></i> Top {{recipe.category.name}} Recipe</h5>
							<top-recipe-box :recipe="recipe"></top-recipe-box>
						</div>
					</div>
					<div v-if="recipeSecond.length > 0"  class="col-lg-4 col-sm-12">
						<div v-for="recipe in recipeSecond" :key="recipe.id">
							<h5><i class="fa fa-cutlery" aria-hidden="true"></i> Top {{recipe.category.name}} Recipe</h5>
							<top-recipe-box :recipe="recipe"></top-recipe-box>
						</div>
					</div>
					<div v-if="recipeThird.length > 0" class="col-lg-4">
						<div  v-for="recipe in recipeThird" :key="recipe.id">
							<h5><i class="fa fa-cutlery" aria-hidden="true"></i> Top {{recipe.category.name}} Recipe</h5>
							<top-recipe-box :recipe="recipe"></top-recipe-box>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import TopRecipeBox from "./TopRecipeBox.vue";
import {ref} from "vue";
import {useRecipeStore} from "@/stores/recipeStore";

const recipeStore = useRecipeStore();

const recipeFirst = ref(recipeStore.topFirst)
const recipeSecond = ref(recipeStore.topSecond)
const recipeThird = ref(recipeStore.topThird)

</script>

<style scoped>
.top {
	padding: 2rem 0;
	background-color: var(--backgrond);
}

.top h5 {
	font-size: 1.2rem;
	margin-bottom: 1rem;
	color: var(--light-text);
	padding-bottom: .7rem;
	border-bottom: 1px dashed var(--light-text);
}


@media only screen and (max-width: 990px) {
	.row {
		display: flex;
		gap: 1.2rem;
	}
}
</style>