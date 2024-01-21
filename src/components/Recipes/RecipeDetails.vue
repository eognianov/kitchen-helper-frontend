<template>
	<div class="recipe-detail" v-if="recipe">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-12 text-center">
					<h1>{{ recipe.name }}</h1>
					<div class="by"><i class="fa fa-user" aria-hidden="true"></i> {{ recipe.created_by }}</div>
				</div>
				<div class="col-lg-8">
					<img :src='recipe.picture' :alt="recipe.name">
					<div class="info">
						<div class="row">
							<div class="col-lg-4 col-sm-4">
								<p>Serves:</p>
								<p><strong><i class="fa fa-users" aria-hidden="true"></i> {{ recipe.serves }} people</strong>
								</p>
							</div>
							<div class="col-lg-4 col-sm-4">
								<p>Time to prepare:</p>
								<p><strong><i class="fa fa-clock-o" aria-hidden="true"></i> {{ recipe.time_to_prepare }} minutes
								</strong>
								</p>
							</div>
							<div class="col-lg-4 col-sm-4">
								<p>Complexity:</p>
								<p><strong><i class="fa fa-clock-o" aria-hidden="true"></i> {{ recipe.complexity }}</strong>
								</p>
							</div>
						</div>
					</div>


					<p>{{ recipe.summary }}</p>

					<div class="tag">
						<a href="#">{{ recipe.category.name }}</a>
					</div>

					<div class="ingredient-direction">
						<div class="row">
							<div class="col-lg-6 col-sm-6">
								<h3>Ingredients</h3>
								<ul class="ingredients p-3">
									<li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient.quantity }} {{ingredient.measurement}}
										{{ ingredient.name }}
									</li>
								</ul>
							</div>
							<div class="col-lg-6 col-sm-6">
								<h3>Instructions</h3>
								<ol class="directions">
									<li v-for="instruction in recipe.instructions" :key="instruction.id">{{ instruction.instruction }}
									</li>
								</ol>
							</div>
						</div>
					</div>


					<div class="nutrition-facts clearfix">
						<h3>Nutrition Facts</h3>
						<div>
							<p>Calories:</p>
							<p><strong>{{ recipe.calories }} kcal</strong>
							</p>
						</div>
						<div>
							<p>Carbohydrate:</p>
							<p><strong>{{ recipe.carbo }} g</strong>
							</p>
						</div>
						<div>
							<p>Fat:</p>
							<p><strong>{{ recipe.fats }} g</strong>
							</p>
						</div>
						<div>
							<p>Protein:</p>
							<p><strong>{{ recipe.proteins }} g</strong>
							</p>
						</div>
						<div>
							<p>Cholesterol:</p>
							<p><strong>{{ recipe.cholesterol }} mg</strong>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="recipe-detail" v-if="recipeNotFound">
		<h2 class="text-center">Recipe not found</h2>
	</div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {ref, onMounted} from "vue";
import axios from "axios";
import {useAuthStore} from "@/stores/authStore";

const auth = useAuthStore()
const route = useRoute()

const recipe = ref(null)
const recipeNotFound = ref(false)

async function getRecipeById() {
	try {
		const response = await axios.get(`/recipes/${route.params.id}`, {
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer ' + auth.token
			}
		})
		if (response.status === 200) {
			recipe.value = response.data
		}
	} catch (e) {
		recipeNotFound.value = true
	}
}


onMounted( () => {
	getRecipeById();
})


</script>

<style scoped>
.recipe-detail {
	color: var(--main-text);
}

.recipe-detail {
	padding: 70px 0
}

.recipe-detail h1 {
	font-size: 2.5rem;
	font-weight: 700;
	margin-bottom: 10px;
	color: var(--main-text);
	text-transform: capitalize;
}

.recipe-detail .by {
	margin-bottom: 40px;
	font-size: 18px;
	color: var(--main-text);
}

.recipe-detail .by i {
	font-size: 20px;
	color: var(--main-text);
}

.recipe-detail img {
	width: 100%;
	height: 500px;
	object-fit: cover;
}


.recipe-detail .tag a {
	display: inline-block;
	padding: 10px 20px;
	color: var(--white);
	border: 1px solid var(--main-color);
	border-radius: 6px;
	background: var(--main-color);
	transition: all 0.3s ease;
	margin: 0 3px 6px 0;
	text-decoration: none;
}

.recipe-detail .tag a:hover {
	text-decoration: none;
	background-color: var(--main-hover);
	color: var(--main-text);
	border: 1px solid var(--dark-background);
	transition: all 0.3s ease;
}


.recipe-detail .info {
	margin-bottom: 20px;
	padding: 20px;
	color: var(--white);
	background-color: var(--dark-background);
}

.recipe-detail .info p {
	font-size: .8rem;
	margin-bottom: 0
}

.recipe-detail .info p strong {
	font-size: 1rem;
	color: var(--white)
}

.recipe-detail .ingredient-direction {
	margin-top: 30px
}

.recipe-detail .ingredient-direction h3 {
	font-size: 1.2rem;
	font-weight: 700;
	margin-bottom: 20px
}

.recipe-detail .ingredient-direction ul.ingredients {
	padding: 30px 30px 30px 0;
	list-style: none;
	background: var(--very-light-background);
}

.recipe-detail .ingredient-direction ul.ingredients li {
	margin-bottom: 10px;
	padding-bottom: 10px;
	border-bottom: 1px dashed var(--main-text)
}

.recipe-detail ol.directions > li {
	position: relative;
	margin-bottom: 30px;
	padding-left: 20px
}

.recipe-detail ol.directions {
	list-style-type: none;
	margin: 15px 0 0 34px;
	padding: 0;
	counter-reset: li-counter
}

.recipe-detail ol.directions > li:before {
	font-size: 16px;
	font-weight: 700;
	line-height: 32px;
	position: absolute;
	top: 3px;
	left: -34px;
	width: 34px;
	height: 34px;
	text-align: center;
	color: var(--main-text);
	background-color: var(--light-background);
	content: counter(li-counter);
	counter-increment: li-counter;
	cursor: default
}

.recipe-detail .nutrition-facts {
	position: relative;
	margin-bottom: 50px;
	padding-top: 20px;
	padding-bottom: 20px;
	border-top: 1px dashed var(--main-text);
	border-bottom: 1px dashed var(--main-text);
}

.recipe-detail .nutrition-facts h3 {
	font-size: .9rem;
	position: absolute;
	top: -20px;
	left: 0;
	padding: 8px 10px;
	color: var(--white);
	background-color: var(--dark-background)
}

.recipe-detail .nutrition-facts p {
	color: var(--main-text);
	font-size: .8rem;
}

.recipe-detail .nutrition-facts p strong {
	font-size: 1rem;
	color: var(--main-text)
}

.recipe-detail .nutrition-facts div {
	float: left;
	width: 20%
}

.recipe-detail .nutrition-facts div p {
	margin-bottom: 0
}
</style>