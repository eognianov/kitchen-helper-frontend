<template>
	<div class="submit">
		<div class="title">
			<div class="container">
				<div class="row">
					<div class="col-lg-12">
						<h2>Submit Recipe</h2>
					</div>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="container">
				<div class="row">
					<div class="col-lg-12">

						<div class="form-group">
							<label>Recipe Title</label>
							<input type="text" class="form-control">
						</div>

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

						<div class="form-group">
							<label>Short summary</label>
							<textarea class="form-control" rows="4" required="required"></textarea>
						</div>

						<div class="form-group">
							<label>Tag</label>
							<input type="text" class="form-control">
						</div>

						<div class="form-group">
							<label>Upload your photos</label>
							<input type="file" class="form-control-file">
						</div>

						<div class="form-group">
							<label>Ingredients:</label>

							<div id="sortable">
								<div class="box ui-sortable-handle">
									<div class="row">
										<div class="col-lg-1 col-sm-1">
											<i class="fa fa-arrows" aria-hidden="true"></i>
										</div>
										<div class="col-lg-5 col-sm-5">
											<input type="text" class="form-control" placeholder="Name of ingredient">
										</div>
										<div class="col-lg-5 col-sm-5">
											<input type="text" class="form-control" placeholder="Notes (quantity or additional info)">
										</div>
										<div class="col-lg-1 col-sm-1">
											<i class="fa fa-times-circle-o minusbtn" aria-hidden="true"></i>
										</div>
									</div>
								</div>

							</div>
							<a href="#" class="btn btn-light">Add new ingredient</a>

						</div>

						<div class="form-group">
							<label>Directions:</label>
							<textarea class="form-control" rows="4" required="required"></textarea>
						</div>

						<div class="form-group">
							<label>Additional Informations</label>
							<hr>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 col-form-label">Yield</label>
							<div class="col-sm-10">
								<input type="text" class="form-control">
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 col-form-label">Preparation Time</label>
							<div class="col-sm-10">
								<input type="text" class="form-control">
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 col-form-label">Cooking Time</label>
							<div class="col-sm-10">
								<input type="text" class="form-control">
							</div>
						</div>

						<div class="form-group">
							<label>Nutrition Facts</label>
							<hr>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 col-form-label">Calories</label>
							<div class="col-sm-10">
								<input type="text" class="form-control">
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 col-form-label">Total Carbohydrate</label>
							<div class="col-sm-10">
								<input type="text" class="form-control">
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 col-form-label">Total Fat</label>
							<div class="col-sm-10">
								<input type="text" class="form-control">
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 col-form-label">Protein</label>
							<div class="col-sm-10">
								<input type="text" class="form-control">
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 col-form-label">Cholesterol</label>
							<div class="col-sm-10">
								<input type="text" class="form-control">
							</div>
						</div>

						<button type="submit" class="btn btn-submit">Submit Recipe</button>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "CreateRecipe"
}
</script>

<style scoped>
.submit .title {
	padding: 30px 0;
	background-color: #f8f8f8
}

.submit .title h2 {
	font-size: 1.3rem;
	font-weight: 700;
	margin-bottom: 0
}

.submit .content {
	padding: 40px 0
}

.submit .content .form-group {
	margin-bottom: 40px
}

.submit .content .form-group hr {
	border-top: 1px dashed #dedede
}

.submit .content .form-group .btn-dark {
	background-color: #363636;
	color: #fff
}

.submit .content .btn-submit {
	padding: 15px;
	color: #fff;
	background-color: #e13b2b
}

.submit .content .select2-container--default .select2-selection--single .select2-selection__rendered {
	line-height: 45px;
	color: #444
}

.submit .content .select2-container--default .select2-selection--single .select2-selection__arrow {
	height: 40px
}

.submit .content .box {
	background-color: #f8f8f8;
	margin-bottom: 15px;
	padding: 20px;
	text-align: center
}

.submit .content .box:hover {
	cursor: pointer
}

.submit .content .box .fa-arrows {
	padding-top: 13px
}

.submit .content .box .fa-times-circle-o {
	font-size: 20px;
	padding-top: 13px
}

.submit .content .box .fa-times-circle-o:hover {
	color: #e13b2b
}
</style>