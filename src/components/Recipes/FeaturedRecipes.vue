<template>
	<div class="featured">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-12">
					<h4>{{ currentDate }}</h4>
					<h3>Recipe of the day</h3>
				</div>
				<div class="col-lg-8">
					<div v-if="recipe">
						<big-recipe-box :recipe="recipe"></big-recipe-box>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import BigRecipeBox from './BigRecipeBox.vue';
// import axios from "axios";
import {onMounted, ref} from "vue";
import {useAuthStore} from "@/stores/authStore";
import {getRecipes} from './helepers'

const auth = useAuthStore()

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const date = new Date();
const currentDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

const recipe = ref(null)

onMounted(async  () => {
	const recipes = await getRecipes('/recipes/?page=1&page_size=1&sort=id:desc', auth.token)
	recipe.value = recipes[0]
})

</script>

<style scoped>
.featured {
	margin-top: 70px;
	margin-bottom: 50px;
	text-align: center
}

.featured h3 {
	font-size: 2.5rem;
	font-weight: 700;
	margin-bottom: 40px;
	color: var(--main-text);
}

.featured h4 {
	font-size: 1rem;
	text-transform: uppercase;
	color: var(--main-text)
}

</style>