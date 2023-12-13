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

<script>
import TopRecipeBox from "./TopRecipeBox.vue";

export default {
	components: {
		'top-recipe-box': TopRecipeBox
	},
	name: "TopRecipes"
}
</script>

<style>

.top {
	padding: 80px 0;
	background-color: #727272;
}

.box.grid.recipes, .top .box {
	background-color: #fff;
	box-shadow: 0 6px 15px rgba(36, 37, 38, .08)
}

.top h5 {
	font-size: 1.2rem;
	margin-bottom: 30px;
	color: #dadada
}

.top .box {
	padding: 25px
}

.top .box h3 {
	font-size: 1.2rem;
	font-weight: 700;
	padding-left: 120px
}

.top .box h3 a {
	color: #333
}

.top .box p {
	line-height: 22px;
	margin-bottom: 0;
	padding-left: 120px
}

.top .box img {
	float: left;
	width: 100px;
	height: 100px;
	border-radius: 6px
}
@media only screen and (max-width: 990px) {
	.top h5 {
		margin-top: 30px;
		margin-bottom: 20px;
	}
}

@media only screen and (max-width: 768px) {
	.top .box {
		margin-bottom: 30px
	}

	.top .box img {
		width: 60px;
		height: 60px
	}

	.top .box h3, .top .box p {
		padding-left: 80px
	}
}

@media only screen and (max-width: 480px) {
	.top {
		padding: 40px 0
	}

	.top .box {
		margin-bottom: 30px
	}

}

</style>