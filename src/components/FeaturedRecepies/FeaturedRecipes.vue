<template>
	<div class="featured">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-12">
					<h4>Oct 30, 2017</h4>
					<h3>Recipes of the day</h3>
				</div>
				<div class="col-lg-8">
					<recipe-box></recipe-box>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import RecipeBox from '../RecipeOfTheDay/RecipeBox.vue';

export default {
	components: {
		'recipe-box': RecipeBox
	},
	name: "FeaturedRecipes.vue"
}
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
	color: #727272;
}
.featured h4 {
	font-size: 1rem;
	text-transform: uppercase;
	color: #727272;
}

</style>