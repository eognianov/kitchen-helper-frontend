<template>
	<div class="search">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<h2>Browse Recipes</h2>
					<div class="row">
						<div class="col-lg-3">
							<div class="form-group">
								<label>Choose category</label>
								<select class="js-search-category form-control" name="category" data-placeholder="Choose Category">
									<option value="1">All</option>
									<option value="2">Breakfast</option>
									<option value="3">Lunch</option>
									<option value="4">Beverages</option>
									<option value="5">Appetizers</option>
									<option value="6">Soups</option>
									<option value="7">Salads</option>
									<option value="8">Beef</option>
									<option value="9">Poultry</option>
									<option value="10">Pork</option>
									<option value="11">Seafood</option>
									<option value="12">Vegetarian</option>
									<option value="13">Vegetables</option>
									<option value="14">Desserts</option>
									<option value="15">Canning / Freezing</option>
									<option value="16">Breads</option>
									<option value="17">Holidays</option>
								</select>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="form-group">
								<label>Select one or more ingredients that should be included in recipe</label>
								<select class="js-search-ingredients form-control" name="ingredients[]" multiple="multiple"
												data-placeholder="Included Ingredients">
									<option value="sugar">sugar</option>
									<option value="wheat-flour">wheat flour</option>
									<option value="baking-powder">baking powder</option>
									<option value="eggs">eggs</option>
									<option value="salt">salt</option>
									<option value="brown-sugar">brown sugar</option>
									<option value="chicken-breast">chicken breast</option>
									<option value="garlic">garlic</option>
									<option value="milk">milk</option>
									<option value="oil">oil</option>
									<option value="sesame-oil">sesame oil</option>
									<option value="soy-sauce">soy sauce</option>
									<option value="butter">butter</option>
									<option value="carrots">carrots</option>
									<option value="coconut-flakes">coconut flakes</option>
									<option value="honey">honey</option>
									<option value="mung-bean-sprouts">mung bean sprouts</option>
									<option value="noodles">noodles</option>
									<option value="onion">onion</option>
									<option value="potato-starch">potato starch</option>
									<option value="red-bell-pepper">red bell pepper</option>
									<option value="walnuts">walnuts</option>
									<option value="water">water</option>
									<option value="almonds">almonds</option>
									<option value="baking-soda">baking soda</option>
									<option value="beef-brisket">beef brisket</option>
									<option value="beef-sirloin">beef sirloin</option>
									<option value="bell-pepper">bell pepper</option>
									<option value="broth">broth</option>
									<option value="carrot">carrot</option>
									<option value="cherries">cherries</option>
									<option value="chocolate">chocolate</option>
									<option value="cinnamon">cinnamon</option>
									<option value="cinnamon-stick">cinnamon stick</option>
									<option value="cocoa-powder">cocoa powder</option>
									<option value="coconut">coconut</option>
									<option value="corn-tortillas">corn tortillas</option>
									<option value="dark-chocolate">dark chocolate</option>
									<option value="dried-black-mushrooms">dried black mushrooms</option>
									<option value="dried-soba">dried soba</option>
									<option value="egg">egg</option>
									<option value="five-spice-powder">five spice powder</option>
									<option value="flour">flour</option>
									<option value="ginger">ginger</option>
									<option value="guilin-chili-sauce">guilin chili sauce</option>
									<option value="leek">leek</option>
									<option value="lettuce">lettuce</option>
									<option value="olive-oil">olive oil</option>
									<option value="oyster-sauce">oyster sauce</option>
									<option value="pear-juice">pear juice</option>
									<option value="pepper">pepper</option>
									<option value="pineapple">pineapple</option>
									<option value="red-onion">red onion</option>
									<option value="redcurrant">redcurrant</option>
									<option value="ribs-of-celery">ribs of celery</option>
									<option value="sichuan-pepper">Sichuan pepper</option>
									<option value="spring-onions">spring onions</option>
									<option value="strawberries">strawberries</option>
									<option value="taiwanese-golden-mushrooms">Taiwanese golden mushrooms</option>
									<option value="yeast">yeast</option>
									<option value="yellow-bell-pepper">yellow bell pepper</option>
								</select>
							</div>
						</div>
						<div class="col-lg-3">
							<div class="form-group">
								<label>Recipe needs to have</label>
								<select class="js-search-category2 form-control" name="category" data-placeholder="Choose Category">
									<option value="1">All of selected ingredients</option>
									<option value="2">Any of selected ingredients</option>
								</select>
							</div>
						</div>
						<div class="col-lg-12 pt-3">
							<div class="form-group">
								<input type="email" class="form-control" placeholder="Search by Keyword">
								<button type="submit" class="btn">Search Recipes</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<list-recipes></list-recipes>

</template>

<script>
import ListRecipes from "./ListRecipes.vue";

export default {
	components: {
		'list-recipes': ListRecipes,
	},
	name: "SearchRecipes"
}
</script>

<style scoped>
.search{
    padding:60px 0;
    background-color: var(--main-hover);
		color: var(--main-text);
}
.search .form-group .form-control,.search .form-group input{
    height:45px
}
.search h2{
    font-size:1.2rem;
    margin-bottom:20px;
    padding-bottom:10px;
    border-bottom:1px dashed var(--main-text)
}
.search .form-group{
    position:relative
}
.search .form-group label{
    display:block
}
.search .form-group .btn{
    position:absolute;
    top:0;
    right:0;
    height:45px;
    color: var(--white);
    padding: 10px 25px;
    border-radius: 6px;
    background-color: var(--main-color);
}
.search .btn:hover{
	color: var(--main-text);
	background-color: var(--main-hover);
	border: 1px solid var(--main-color);
	font-weight: 400;
}
.search .select2-container--default .select2-selection--single .select2-selection__rendered{
    line-height:45px;
    color:#444
}
.search .select2-container--default .select2-selection--single .select2-selection__arrow{
    height:40px
}
.search .select2-container .select2-selection--multiple,.submit .content .select2-container .select2-selection--single,.submit .content input{
    height:45px
}
.search .select2-container--default .select2-selection--multiple .select2-selection__choice{
    margin-top:8px
}
.search .select2-container .select2-search--inline .select2-search__field{
    margin-top:0
}
.search .form-group .btn {
	position: static;
	margin-top: 20px;
	border-radius: 3px;
	width: 100%
}

</style>