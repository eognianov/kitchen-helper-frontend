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
								<input type="text" class="form-control" v-model="name" @change="status.checkTitle">
								<p class="error" :class="errors.title ? 'show' : null">Please enter recipe title.</p>
							</div>

							<div class="form-group">
								<label>Choose category</label>

								<select v-model="selectCategory" class="form-select" name="category"
												data-placeholder="Choose Category" @change="status.checkCategory()">
									<option disabled>Select category</option>
									<option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}
									</option>
								</select>
								<p class="error" :class="errors.category ? 'show' : null">Please chose category.</p>
							</div>

							<div class="form-group">
								<label>Short summary</label>
								<textarea class="form-control" rows="4" v-model="summary" @change="status.checkSummary"></textarea>
								<p class="error" :class="errors.summary ? 'show' : null">Please enter some summary.</p>
							</div>

							<div class="form-group">
								<label>Serves</label>
								<input type="number" class="form-control" v-model="serves"
											 @change="status.checkServes">
								<p class="error" :class="errors.serves ? 'show' : null">Serves must be greater than 0.</p>
							</div>

							<div class="form-group row">
								<label>Upload picture </label>
								<hr>
								<div class="col-lg-3">
									<input type="file" class="form-control-file" @change="uploadPicture">
								</div>
							</div>

							<div class="form-group">
								<label>Ingredients:</label>
								<hr>
								<p class="error" :class="errors.ingredients ? 'show' : null">Please select valid ingredient and quantity
									must be a positive number. </p>

								<vue-draggable-next class="box ui-sortable-handle" :list="ingredients">
									<div
											class="list-group-item bg-gray-300 pt-3 pl-3 pr-3 pb-3 rounded-md text-center"
											v-for="ingredient in ingredients"
											:key="ingredient.id"
									>
										<div class="row">
											<div class="col-lg-1 col-sm-1">
												<i class="fa fa-arrows" aria-hidden="true">
												</i>
											</div>
											<ingredient-box :ingredientList="ingredientsList" :ingredient="ingredient">ingredient
											</ingredient-box>
											<div class="col-lg-1 col-sm-1">
												<i class="fa-solid fa-circle-minus minusbtn" aria-hidden="true"
													 @click="deleteIngredient(ingredient.id)">
												</i>
											</div>
										</div>
										<!--										<div class="row">-->
										<!--											<div class="col-lg-1 col-sm-1">-->
										<!--												<i class="fa fa-arrows" aria-hidden="true">-->
										<!--												</i>-->
										<!--											</div>-->
										<!--											<div class="col-lg-4 col-md-4 col-sm-4">-->
										<!--												&lt;!&ndash;                        <input type="text" class="form-control"&ndash;&gt;-->
										<!--												&lt;!&ndash;                               v-model="ingredient.name" placeholder="Ingredient category">&ndash;&gt;-->
										<!--												<select v-model="ingredient.category" class="form-select" name="category"-->
										<!--																data-placeholder="Choose Category">-->
										<!--													<option disabled>Select category</option>-->
										<!--													<option-->
										<!--															v-for="category in INGREDIENT_CATEGORIES"-->
										<!--															:key="category"-->
										<!--															:value="category">-->
										<!--														{{ category.toLowerCase() }}-->
										<!--													</option>-->
										<!--												</select>-->
										<!--											</div>-->

										<!--											<div class="col-lg-4 col-md-4 col-sm-4">-->
										<!--												<input type="text" class="form-control"-->
										<!--															 v-model="ingredient.name" placeholder="Ingredient name">-->
										<!--											</div>-->
										<!--											<div class="col-sm-2">-->
										<!--												<input type="number" class="form-control"-->
										<!--															 v-model="ingredient.quantity" placeholder="Quantity">-->
										<!--											</div>-->
										<!--											<div class="col-lg-1 col-sm-1">-->
										<!--												<i class="fa-solid fa-circle-minus minusbtn" aria-hidden="true"-->
										<!--													 @click="deleteIngredient(ingredient.id)">-->
										<!--												</i>-->
										<!--											</div>-->
										<!--										</div>-->
									</div>
								</vue-draggable-next>

								<a @click="addIngredient" class="btn btn-dark">Add new ingredient</a>
								<a @click="createIngredient" class="btn btn-dark ml-2">Create new ingredient</a>

								<div class="form-group">
									<label>Instructions:</label>
									<hr>
									<p class="error" :class="errors.instructions ? 'show' : null">Instructions must have a category and
										summary. Time to prepare must be between 1 and 99 minutes. Complexity must be between 1 and 5.</p>

									<vue-draggable-next class="box ui-sortable-handle" :list="instructions">
										<div
												class="list-group-item bg-gray-300 pt-3 pl-3 pr-3 pb-2 rounded-md"
												v-for="instruction in instructions"
												:key="instruction.id"
										>
											<div class="row mb-3">
												<div class="col-lg-6">
													<div>
														<div class="text-left p-1">Choose Category</div>
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
													<div class="">
														<div class="text-left p-1">Complexity</div>
														<input type="number" min="1" max="5" class="form-control"
																	 v-model="instruction.complexity">
													</div>
													<div class="">
														<div class="text-left p-1">Time to prepare</div>
														<input type="number" min="1" max="99" class="form-control"
																	 v-model="instruction.time">
													</div>
												</div>

												<div class="col-lg-6 col-sm-12">
													<div class="text-left p-1">Short summary</div>
													<textarea class="form-control" rows="7"
																		v-model="instruction.instruction"></textarea>
												</div>
											</div>
											<div class="signs">
												<div>
													<i class="fa fa-arrows" aria-hidden="true">
														<span class="alert-text"> Move</span>
													</i>
												</div>
												<div>
													<i class="fa-solid fa-circle-minus minusbtn" aria-hidden="true"
														 @click="deleteInstruction(instruction.id)">
														<span class="alert-text"> Delete</span>
													</i>
												</div>
											</div>
										</div>
									</vue-draggable-next>

									<a @click="addInstruction" class="btn btn-dark">Add new instruction</a>
								</div>
							</div>

							<p class="error" :class="generalError ? 'show' : null">{{ generalErrorMessage }}</p>

							<button class="btn btn-submit">Submit Recipe</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<CreateIngredient
			:isModalOpen="isModalOpen"
			:ingredients="ingredientsList"
			@hideModal="hideModal"
			@addNewIngredient="addNewIngredient"
	>

	</CreateIngredient>
</template>

<script setup>
import {ref, toRaw} from "vue";
import axios from "axios";
import {VueDraggableNext} from 'vue-draggable-next';
import {useAuthStore} from "@/stores/authStore";
import IngredientBox from './IngredientBox.vue';
import CreateIngredient from './CreateIngredient.vue';
import {useRouter} from 'vue-router';

const auth = useAuthStore()
const router = useRouter();

const isModalOpen = ref(false)

function hideModal() {
	isModalOpen.value = false
}

function addNewIngredient(ingr) {
	ingredientsList.value.push(ingr)
}

const name = ref('')
const categories = ref([])
const selectCategory = ref('')
const summary = ref("")
const picture = ref(1)
const serves = ref(1)
const ingredientsList = ref([])
const ingredients = ref([
	{id: `${uniqueID()}`, name: '', quantity: null, pk: null}
])
const instructions = ref([
	{id: `${uniqueID()}`, instruction: '', category: '', time: null, complexity: null}
])

async function getRecipesCategories() {
	let response = await axios.get(`categories/`)
	if (response.status === 200) {
		categories.value = response.data
	}
}

async function getRecipesIngredients() {
	let response = await axios.get(`ingredients/`, {
		headers: {'Authorization': 'Bearer ' + auth.token}
	})
	if (response.status === 200) {
		ingredientsList.value = response.data
	}
}

getRecipesCategories();
getRecipesIngredients();


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
];


function uniqueID() {
	return "id" + Math.random().toString(16).slice(2)
}

function addIngredient() {
	ingredients.value.push({id: `${uniqueID()}`, name: '', quantity: null, pk: null})
}

function deleteIngredient(id) {
	ingredients.value = ingredients.value.filter((ingredient) => ingredient.id !== id);
}

function addInstruction() {
	instructions.value.push({id: `${uniqueID()}`, instruction: '', category: '', time: null, complexity: null})
}

function deleteInstruction(id) {
	instructions.value = instructions.value.filter((instruction) => instruction.id !== id);
}

function createIngredient() {
	isModalOpen.value = true
}

async function uploadPicture(e) {
	const image = e.target.files[0];
	if (image !== undefined) {
		const fd = new FormData();
		fd.append('file', image, image.name)
		const response = await axios.post('/images', fd, {
			headers: {'Authorization': 'Bearer ' + auth.token}
		})
		picture.value = response.data.id
		errors.value.picture = false
	} else {
		picture.value = 1
		errors.value.picture = false
	}
}

const status = {
	checkTitle: () => {
		errors.value.title = name.value.trim() === ''
	},
	checkCategory: () => {
		errors.value.category = selectCategory.value === ''
	},
	checkSummary: () => {
		errors.value.summary = summary.value.trim() === '';
	},
	checkServes: () => {
		errors.value.serves = serves.value < 1
	},
	checkInstructions: () => {
		toRaw(instructions.value).forEach(instruction => {
			if (instruction.instruction === ''
					&& instruction.category === ''
					&& instruction.time === null
					&& instruction.complexity === null) {
				deleteInstruction(instruction.id)
			} else errors.value.instructions = instruction.instruction === '' || instruction.category === ''
					|| instruction.time === null || instruction.complexity === null
					|| instruction.time < 1 || instruction.time >= 100
					|| instruction.complexity < 1 || instruction.complexity > 5;
		})
	},
	checkIngredients: () => {
		toRaw(ingredients.value).forEach(ingredient => {
			if (ingredient.name.trim() === '') {
				deleteIngredient(ingredient.id)
			} else errors.value.ingredients = ingredient.quantity < 0.001;
		})

	}
}

const generalError = ref(false)
const generalErrorMessage = ref('Please check the form. Some errors found.')

const errors = ref({
	title: false,
	category: false,
	serves: false,
	picture: false,
	instructions: false,
	ingredients: false,
	summary: false
})

async function submitRecipe() {
	// status.checkTitle();
	// status.checkCategory();
	// status.checkSummary();
	// status.checkServes();
	// status.checkInstructions();
	// status.checkIngredients();


	if (Object.values(errors.value).includes(true)) {
		generalError.value = true;
		return;
	} else {
		generalError.value = false;
	}
	const newIngredients = []

	toRaw(ingredients.value).forEach(ingredient => {
		newIngredients.push({ingredient_id: ingredient.pk, quantity: ingredient.quantity})
	})

	const response = await axios.post(`/recipes`, {
		name: name.value,
		summary: summary.value,
		category_id: selectCategory.value,
		picture: picture.value,
		serves: serves.value,
		instructions: toRaw(instructions.value),
		ingredients: newIngredients,
	}, {
		headers: {
			"Content-Type": "application/json",
			'Authorization': 'Bearer ' + auth.token
		}
	})
	if (response.status === 200) {
		await router.push({name: "recipe details", params: {id: response.data.id}});
	} else {
		generalError.value = true
		generalErrorMessage.value = 'Something went wrong. Please try later.'
	}

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

.submit .content .box .fa-circle-minus, .plusbtn {
	font-size: 20px;
	padding-top: 9px;
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

.submit .ui-sortable-handle > .list-group-item {
	background-color: #EFEFEF;
	margin-top: 10px !important;

}

.submit .error {
	display: none;
	font-size: .8rem;
	padding-top: .3rem;
	color: var(--main-alert);
}

.submit .show {
	display: block;
}

.submit .alert-text {
	box-sizing: border-box;
	font-family: Roboto, sans-serif;
	font-weight: normal;
	font-size: 1rem;
}

.submit .signs {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 10px;
}

</style>