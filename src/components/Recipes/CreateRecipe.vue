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
						<form @submit.prevent="submitRecipe()">

							<div class="form-group">
								<label>Recipe Title</label>
								<input type="text" class="form-control" v-model="name">
							</div>

							<div class="form-group">
								<label>Choose category</label>

								<select v-model="selectCategory" class="js-search-category form-control" name="category"
												data-placeholder="Choose Category">
									<option value="null">-------</option>
									<option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}
									</option>
								</select>
							</div>

							<div class="form-group">
								<label>Short summary</label>
								<textarea class="form-control" rows="4" required="required" v-model="summary"></textarea>
							</div>

							<!--							<div class="form-group">-->
							<!--								<label>Upload your photos</label>-->
							<!--								<input type="file" class="form-control-file">-->
							<!--							</div>-->


							<div class="form-group">
								<label>Ingredients:</label>
								<hr>

<!--								<div id="sortable">-->
<!--									<div class="box ui-sortable-handle">-->
<!--										<div class="row">-->
<!--											<div class="col-lg-1 col-sm-1">-->
<!--												<i class="fa fa-arrows" aria-hidden="true"></i>-->
<!--											</div>-->
<!--											<div class="col-lg-5 col-sm-5">-->
<!--												<input type="text" class="form-control" placeholder="Name of ingredient">-->
<!--											</div>-->
<!--											<div class="col-lg-5 col-sm-5">-->
<!--												<input type="text" class="form-control" placeholder="Notes (quantity or additional info)">-->
<!--											</div>-->
<!--											<div class="col-lg-1 col-sm-1">-->
<!--												<i class="fa-solid fa-circle-minus minusbtn" aria-hidden="true"></i>-->
<!--											</div>-->
<!--										</div>-->
<!--									</div>-->

<!--								</div>-->

								<a href="#" class="btn btn-dark">Add new ingredient</a>

								<div class="form-group">
									<label>Instructions:</label>
									<hr>
<!--									<div id="sortable2">-->
<!--										<div class="box ui-sortable-handle">-->
<!--											<div class="row justify-content-between">-->
<!--												<div class="col-sm-1">-->
<!--													<i class="fa fa-arrows" aria-hidden="true"></i>-->
<!--												</div>-->
<!--												<div class="col-sm-1">-->
<!--													<i class="fa-solid fa-circle-minus minusbtn" aria-hidden="true"></i>-->
<!--												</div>-->
<!--											</div>-->
<!--											<div class="row mb-3">-->
<!--												<div class="col-lg-12 col-lg-3">-->
<!--													<select class="form-control" name="category"-->
<!--																	data-placeholder="Choose Category">-->
<!--														<option value="null">-&#45;&#45;&#45;&#45;&#45;&#45;</option>-->
<!--														<option-->
<!--																v-for="category in INSTRUCTION_CATEGORIES"-->
<!--																:key="category"-->
<!--																:value="category">-->
<!--															{{ category.toLowerCase() }}-->
<!--														</option>-->
<!--													</select>-->
<!--												</div>-->
<!--											</div>-->
<!--											<div class="row mb-3">-->
<!--												<div class="col-lg-12 col-lg-3">-->
<!--													<textarea class="form-control" rows="4" required="required"></textarea>-->
<!--												</div>-->
<!--											</div>-->
<!--											<div class="row mb-3">-->
<!--												<div class="col-lg-12 col-lg-3">-->
<!--													<input type="text" class="form-control" placeholder="Time to prepare">-->
<!--												</div>-->
<!--											</div>-->

<!--											<div class="row">-->
<!--												<div class="col-lg-12 col-lg-3">-->
<!--													<input type="text" class="form-control" placeholder="Complexity">-->
<!--												</div>-->
<!--											</div>-->
<!--										</div>-->

<!--									</div>-->
									<a href="#" class="btn btn-dark">Add new instruction</a>
								</div>
							</div>

							<div class="form-group">
								<label>Nutrition Facts</label>
								<hr>
							</div>

							<div class="form-group row">
								<label class="col-sm-2 col-form-label">Calories</label>
								<div class="col-sm-10">
									<input type="number" class="form-control" v-model="calories">
								</div>
							</div>

							<div class="form-group row">
								<label class="col-sm-2 col-form-label">Carbohydrate</label>
								<div class="col-sm-10">
									<input type="number" class="form-control" v-model="carbo">
								</div>
							</div>

							<div class="form-group row">
								<label class="col-sm-2 col-form-label">Fat</label>
								<div class="col-sm-10">
									<input type="number" class="form-control" v-model="fats">
								</div>
							</div>
							<div class="form-group row">
								<label class="col-sm-2 col-form-label">Protein</label>
								<div class="col-sm-10">
									<input type="number" class="form-control" v-model="proteins">
								</div>
							</div>
							<div class="form-group row">
								<label class="col-sm-2 col-form-label">Cholesterol</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" v-model="cholesterol">
								</div>
							</div>

							<button class="btn btn-submit" @click="submitRecipe">Submit Recipe</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";

const name = ref('')
const categories = ref([])
const selectCategory = ref("")
const summary = ref("")
const calories = ref('')
const carbo = ref('')
const fats = ref('')
const proteins = ref('')
const cholesterol = ref('')

async function getRecipesCategories() {
	let response = await axios.get(`categories/`)
	if (response.status === 200) {
		categories.value = response.data
	}
}

getRecipesCategories()
const INSTRUCTION_CATEGORIES = [
	'WASH AND CHOP',
	'PREHEAT OVEN',
	'SAUTE',
	'BOIL',
	'ROAST',
	'GRILL',
	'STEAM',
	'BAKE',
	'FRY',
	'BLEND',
	'STIR',
	'WHISK',
	'FOLD',
	'KNEAD',
	'SEASONING',
	'PLATING',
	'PRESENTATION',
]

function submitRecipe() {
	console.log('name: ' + name.value)
	console.log('category: ' + selectCategory.value)
	console.log('summary: ' + summary.value)
	console.log('calories: ' + calories.value)
	console.log('carbo: ' + carbo.value)
	console.log('fats: ' + fats.value)
	console.log('proteins: ' + proteins.value)
	console.log('cholesterol: ' + cholesterol.value)
}

</script>
<!--{
  "name": "string",
  "picture": "string",
  "summary": "string",
  "calories": 0,
  "carbo": 0,
  "fats": 0,
  "proteins": 0,
  "cholesterol": 0,
  "time_to_prepare": 0,
  "category_id": 0,
  "instructions": [
    {
      "instruction": "string",
      "category": "string",
      "time": 0,
      "complexity": 1
    }
  ]
}-->
<style scoped>
.submit {
	color: var(--main-text);
}

.submit .title {
	padding: 30px 0;
	background-color: var(--very-light-background)
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
	margin-bottom: 40px;
	margin-top: 40px;
}

.submit .content .form-group hr {
	border-top: 1px dashed var(--main-text);
	margin-top: 0;
}


.submit .content .btn-submit {
	padding: 15px;
	color: var(--white);
	background-color: var(--main-color)
}

.submit .content .btn-submit:hover {
	padding: 15px;
	color: var(--main-text);
	background-color: var(--main-hover);
	border: 1px solid var(--main-text);
}

/*.submit .content .select2-container--default .select2-selection--single .select2-selection__rendered {*/
/*  line-height: 45px;*/
/*  color: #444*/
/*}*/

/*.submit .content .select2-container--default .select2-selection--single .select2-selection__arrow {*/
/*  height: 490px*/
/*}*/

.submit .content .box {
	background-color: var(--main-hover);
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

.submit .content .box .fa-circle-minus {
	font-size: 20px;
	padding-top: 13px
}

.submit .content .box .fa-circle-minus:hover {
	color: var(--main-alert)
}

.submit .fa {
	padding-top: 11px;
	padding-bottom: 11px;
}

.submit .btn-dark {
	background-color: var(--dark-background);
	border: 1px solid var(--dark-background);
}

.submit .btn-dark:hover {
	background-color: var(--main-hover);
	color: var(--main-text);
}

.submit label {
	margin-bottom: 10px;
}
</style>