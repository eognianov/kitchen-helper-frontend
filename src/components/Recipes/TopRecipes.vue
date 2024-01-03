<template>
	<div class="top">
		<div class="container">
			<div class="row">
				<div class="col-lg-4">
					<h5><i class="fa fa-cutlery" aria-hidden="true"></i> Top Breakfast Recipes</h5>
					<top-recipe-box></top-recipe-box>
				</div>
				<div class="col-lg-4">
					<h5><i class="fa fa-cutlery" aria-hidden="true"></i> Top Lunch Recipes</h5>
					<top-recipe-box></top-recipe-box>
				</div>
				<div class="col-lg-4">
					<h5><i class="fa fa-cutlery" aria-hidden="true"></i> Top Dinner Recipes</h5>
					<top-recipe-box></top-recipe-box>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import TopRecipeBox from "./TopRecipeBox.vue";
</script>

<style scoped>
.top {
	padding: 80px 0;
	background-color: var(--backgrond);
}
.top h5 {
	font-size: 1.2rem;
	margin-bottom: 30px;
	color: var(--light-text);
	padding-bottom: 15px;
	border-bottom: 1px dashed var(--light-text);
}


@media only screen and (max-width: 990px) {
	.top h5 {
		margin-top: 30px;
		margin-bottom: 20px;
	}
}
</style>