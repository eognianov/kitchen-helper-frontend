<template>
	<div class="list">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<h5><i class="fa fa-cutlery" aria-hidden="true"></i> List Recipes</h5>
				</div>

				<small-recipe-box></small-recipe-box>
				<small-recipe-box></small-recipe-box>
				<small-recipe-box></small-recipe-box>
				<small-recipe-box></small-recipe-box>
				<small-recipe-box></small-recipe-box>
				<small-recipe-box></small-recipe-box>

				<div class="col-lg-12 text-center">
					<a href="#" class="btn btn-load">Load More</a>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import SmallRecipeBox from "./SmallRecipeBox.vue";

export default {
	components: {
		'small-recipe-box': SmallRecipeBox,
	},
	name: "ListRecipes"
}
</script>

<style scoped>
.list {
	margin-top: 80px
}

.list h5 {
	margin-bottom: 40px;
	padding-bottom: 20px;
	border-bottom: 1px dashed var(--dark-grey);
  color: var(--dark-grey);
}

.list .btn-load {
	padding: 15px 30px;
	color: #FFF;
	border: 1px solid var(--grey);
	border-radius: 6px;
	background: var(--grey);
	margin-top: 20px;
}

.list .btn-load:hover {
	text-decoration: none;
	background-color: var(--white-hover);
	color: var(--grey);
	transition: all 0.3s ease;
}
</style>