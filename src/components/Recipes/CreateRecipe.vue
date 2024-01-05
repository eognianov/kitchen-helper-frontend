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
								<label>Recipe title</label>
								<input type="text" class="form-control" v-model="name">
							</div>

							<div class="form-group">
								<label>Choose category</label>

								<select v-model="selectCategory" class="form-select" name="category"
												data-placeholder="Choose Category">
									<option disabled>Select category</option>
									<option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}
									</option>
								</select>
							</div>

							<div class="form-group">
								<label>Short summary</label>
								<textarea class="form-control" rows="4" required="required" v-model="summary"></textarea>
							</div>

							<div class="form-group">
								<label>Upload picture </label>
								<hr>
								<input type="file" class="form-control-file" @change="onFileSelected">
							</div>


							<div class="form-group">
								<label>Ingredients:</label>
								<hr>
								<vue-draggable-next class="box ui-sortable-handle" :list="ingredients" >
									<div
											class="list-group-item bg-gray-300 m-1 p-3 pb-0 rounded-md text-center"
											v-for="ingredient in ingredients"
											:key="ingredient.id"
									>
										<div class="row">
											<div class="col-lg-1 col-sm-1">
												<i class="fa fa-arrows" aria-hidden="true"></i>
											</div>
											<div class="col-lg-5 col-sm-5 mb-3">
												<input type="text" class="form-control" placeholder="Name of ingredient"
															 v-model="ingredient.name">
											</div>
											<div class="col-lg-5 col-sm-5">
												<input type="text" class="form-control" placeholder="Notes (quantity or additional info)"
															 v-model="ingredient.quantity">
											</div>
											<div class="col-lg-1 col-sm-1">
												<i class="fa-solid fa-circle-minus minusbtn" @click="deleteIngredient(ingredient.id)"
													 aria-hidden="true"></i>
											</div>
										</div>
									</div>
								</vue-draggable-next>

								<a @click="addIngredient" class="btn btn-dark">Add new ingredient</a>

								<div class="form-group">
									<label>Instructions:</label>
									<hr>
									<vue-draggable-next class="box ui-sortable-handle" :list="instructions">
										<div
												class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
												v-for="instruction in instructions"
												:key="instruction.id"
										>
											<div class="row justify-content-between">
												<div class="col-sm-1">
													<i class="fa fa-arrows" aria-hidden="true"></i>
												</div>
												<div class="col-sm-1">
													<i class="fa-solid fa-circle-minus minusbtn" aria-hidden="true" @click="deleteInstruction(instruction.id)"></i>
												</div>
											</div>
											<div class="row mb-3">
												<div class="col-lg-12 col-lg-3">
													<select v-model="instruction.category" class="form-select" name="category"
																	data-placeholder="Choose Category">
														<option disabled>Select category</option>
														<option
																v-for="category in INSTRUCTION_CATEGORIES"
																:key="category"
																:value="category">
															{{ category.toLowerCase() }}
														</option>
													</select>
												</div>
											</div>
											<div class="row mb-3">
												<div class="col-lg-12 col-lg-3">
													<textarea class="form-control" rows="4" required="required"
																		v-model="instruction.instruction" placeholder="Short summary"></textarea>
												</div>
											</div>
											<div class="row mb-3">
												<div class="col-lg-12 col-lg-3">
													<input type="number" min="1" max="5" class="form-control" placeholder="Time to prepare"
																 v-model="instruction.time">
												</div>
											</div>

											<div class="row">
												<div class="col-lg-12 col-lg-3">
													<input type="number"  min="1" max="120" class="form-control" placeholder="Complexity"
																 v-model="instruction.complexity">
												</div>
											</div>
										</div>
									</vue-draggable-next>

									<a @click="addInstruction" class="btn btn-dark">Add new instruction</a>
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
									<input type="number" class="form-control" v-model="cholesterol">
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
import {ref, toRaw} from "vue";
import axios from "axios";
import {VueDraggableNext} from 'vue-draggable-next'

const name = ref('')
const categories = ref([])
const selectCategory = ref("")
const summary = ref("")
const picture = ref("")
const calories = ref('')
const carbo = ref('')
const fats = ref('')
const proteins = ref('')
const cholesterol = ref('')
const ingredients = ref([
	{id: '1', name: '', quantity: ''}
])
const instructions = ref([
	{id: '1', instruction: '', category: '', time: null, complexity: null}
])

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

function addIngredient() {
	const id = "id" + Math.random().toString(16).slice(2)
	ingredients.value.push({id: `${id}`, name: '', quantity: ''})
}

function deleteIngredient(id) {
	ingredients.value = ingredients.value.filter((ingredient) => ingredient.id !== id);
}

function addInstruction() {
	const id = "id" + Math.random().toString(16).slice(2)
	instructions.value.push({id: `${id}`, instruction: '', category: '', time: null, complexity: null})
}
function deleteInstruction(id) {
	instructions.value = instructions.value.filter((ingredient) => ingredient.id !== id);
}
function onFileSelected(e) {
	picture.value = e.target.files[0]
}

function submitRecipe() {
	const newRecipe = {
		'name': name.value,
		'picture': picture.value,
		'category': selectCategory.value,
		'summary': summary.value,
		'calories': calories.value,
		'carbo': carbo.value,
		'fats': fats.value,
		'proteins': proteins.value,
		'cholesterol': cholesterol.value,
		'ingredients': toRaw(ingredients.value),
		'instructions': toRaw(instructions.value),
	}
	console.log(newRecipe)
}

</script>

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

.submit .content .box {
	margin-bottom: 15px;
	padding: 20px;
	text-align: center
}

.submit .content .box:hover {
	cursor: pointer
}

.submit .content .box .fa-arrows {
	padding-top: 10px
}

.submit .content .box .fa-circle-minus {
	font-size: 20px;
	padding-top: 9px
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

.submit .form-group .box {
	padding: 0;
}
.submit .ui-sortable-handle>.list-group-item {
	background-color: var(--very-light-background);
	margin-top: 10px !important;
	margin-left: 0 !important;
	margin-right: 0 !important;

}

</style>