<template>
	<div class="list">
		<div class="container">
			<div class="row">

				<div class="col-lg-12">
					<h5><i class="fa fa-cutlery" aria-hidden="true"></i> List Recipes</h5>
				</div>

				<div class="col-lg-4 col-sm-6" v-for="recipe in recipes" :key="recipe.id">
					<recipe-box :recipe="recipe"></recipe-box>
				</div>

				<div class="col-lg-12 text-center">
					<button class="btn btn-load"
									@click="getRecipes(next_page)"
									v-if="next_page"
					>Load More</button>
				</div>

			</div>
		</div>
	</div>
</template>

<script setup>
import RecipeBox from "./RecipeBox.vue";
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

<style>
.list {
	margin-top: 80px
}

.list h5 {
	margin-bottom: 40px;
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

</style>