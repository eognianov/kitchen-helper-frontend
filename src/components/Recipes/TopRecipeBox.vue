<template>
	<div class="box clearfix">
		<router-link :to="'/recipes/' + recipe.id">
			<img :src="imageUrl" :alt="recipe.name">
		</router-link>

		<h3>
			<router-link :to="'/recipes/' + recipe.id">
				{{ recipe.name }}
			</router-link>
		</h3>
		<p>{{ recipe.summary.slice(0, 50) }}{{ recipe.summary.length > 50 ? "..." : null }}</p>
	</div>
</template>
<script setup>

import axios from "axios";
import {onMounted, ref} from "vue";
import {useAuthStore} from "@/stores/authStore";
import {getImageById, getRecipes} from "./helepers";

const auth = useAuthStore()
const props = defineProps(['recipeUrl'])

const recipe = ref({'summary': '', 'name': '', id: 1,})
const imageUrl = ref(null)

async function getRecipeTopRecipe(current_utl) {
	try {
		let response = await axios.get(current_utl, {
			headers: {'Authorization': 'Bearer ' + auth.token}
		})

		if (response.status === 200) {
			recipe.value = response.data.recipes[0]
			imageUrl.value = await getImageById(response.data.recipes[0].picture)
		}
	} catch (error) {
		console.log(error)
	}
}

onMounted(async () => {
	// getRecipeTopRecipe(props.recipeUrl)
	const recipes = await getRecipes(props.recipeUrl, auth.token)
	recipe.value = recipes[0]
	if (recipe.value) {
		imageUrl.value = await getImageById(recipe.value.picture)
	}
})

// console.log(props.recipeUrl)


</script>

<style scoped>

.top .box {
	background-color: var(--white);
}

.top .box {
	padding: 25px
}

.top .box h3 {
	font-size: 1.2rem;
	font-weight: 700;
	padding-left: 120px;
	text-transform: capitalize;
}

.top .box h3 a {
	color: var(--main-text);
}

.top .box p {
	line-height: 22px;
	margin-bottom: 0;
	padding-left: 120px;
	color: var(--main-text);
	height: 90px;
}

.top .box img {
	float: left;
	width: 100px;
	height: 100px;
	border-radius: 6px;
	object-fit: cover;
}
</style>