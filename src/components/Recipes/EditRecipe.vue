<template>
	<div class="edit">
		<div class="recipe-detail" v-if="recipe && recipe.created_by === auth.user.username">
			<div class="title">
				<div class="container">
					<div class="row">
						<div class="col-lg-12">
							<h2>Edit Recipe</h2>
						</div>
					</div>
				</div>
			</div>
			<div class="content">
				<div class="container">
					<div class="row">
						<div class="mb-2">Recipe title</div>
						<div class="col-10">
							<input type="text" class="form-control" v-model="name">
							<p class="message"
								 :class="{ 'error': titleStatus.error, 'success': titleStatus.changed }"
							>
								{{ titleStatus.message }}
							</p>
						</div>
						<div class="col-2">
							<div class="btn btn-dark" @click="changeTitle">Change</div>
						</div>
					</div>

					<div class="row" v-if="categories.length > 0">
						<div class="mb-2">Choose category</div>
						<div class="col-10">
							<select v-model="selectCategory" class="form-select" name="category"
											data-placeholder="Choose Category">
								<option disabled>Change category</option>
								<option v-for="category in categories"
												:key="category.id"
												:value="category.id"
								>
									{{ category.name }}
								</option>
							</select>
							<p class="message"
								 :class="{ 'error': categoryStatus.error, 'success': categoryStatus.changed }"
							>
								{{ categoryStatus.message }}
							</p>
						</div>
						<div class="col-2">
							<div class="btn btn-dark" @click="changeCategory">Change</div>
						</div>
					</div>

					<!--							<div class="form-group">-->
					<!--								<label>Short summary</label>-->
					<!--								<textarea class="form-control" rows="4" v-model="summary"></textarea>-->
					<!--								<p class="error" :class="errors.summary ? 'show' : null">Please enter some summary.</p>-->
					<!--							</div>-->

					<!--							<div class="form-group">-->
					<!--								<label>Serves</label>-->
					<!--								<input type="number" class="form-control" v-model="serves"-->
					<!--											 @change="status.checkServes">-->
					<!--								<p class="error" :class="errors.serves ? 'show' : null">Serves must be greater than 0.</p>-->
					<!--							</div>-->

					<!--							<div class="form-group row">-->
					<!--								<label>Upload picture </label>-->
					<!--								<hr>-->
					<!--								<div class="col-lg-3">-->
					<!--									<input type="file" class="form-control-file" @change="uploadPicture">-->
					<!--								</div>-->
					<!--							</div>-->

					<!--							<div class="form-group">-->
					<!--								<label>Ingredients:</label>-->
					<!--								<hr>-->
					<!--								<p class="error" :class="errors.ingredients ? 'show' : null">Please select valid ingredient and quantity-->
					<!--									must be a positive number. </p>-->

					<!--								<vue-draggable-next class="box ui-sortable-handle" :list="ingredients">-->
					<!--									<div-->
					<!--											class="list-group-item bg-gray-300 pt-3 pl-3 pr-3 pb-1 rounded-md text-center"-->
					<!--											v-for="ingredient in ingredients"-->
					<!--											:key="ingredient.id"-->
					<!--									>-->
					<!--										<div class="row">-->
					<!--											<div class="col-lg-1 col-sm-1">-->
					<!--												<i class="fa fa-arrows" aria-hidden="true">-->
					<!--												</i>-->
					<!--											</div>-->
					<!--											<ingredient-box :ingredientList="ingredientsList" :ingredient="ingredient">ingredient-->
					<!--											</ingredient-box>-->
					<!--											<div class="col-lg-1 col-sm-1">-->
					<!--												<i class="fa-solid fa-circle-minus minusbtn" aria-hidden="true"-->
					<!--													 @click="deleteIngredient(ingredient.id)">-->
					<!--												</i>-->
					<!--											</div>-->
					<!--										</div>-->
					<!--									</div>-->
					<!--								</vue-draggable-next>-->
					<!--								<div class="row">-->
					<!--									<div class="col-lg-3 col-md-5 col-sm-12">-->
					<!--										<a @click="addIngredient" class="btn btn-dark">Add new ingredient</a>-->
					<!--									</div>-->
					<!--									<div class="col-lg-6 col-md-2 col-sm-2 mt-2"></div>-->
					<!--									<div-->
					<!--											class="col-lg-3 col-md-5 col-sm-12 d-flex justify-content-lg-end justify-content-md-end justify-content-sm-start">-->
					<!--										<a @click="createIngredient" class="btn btn-dark ">Create new ingredient</a>-->
					<!--									</div>-->
					<!--								</div>-->

					<!--								<div class="form-group">-->
					<!--									<label>Instructions:</label>-->
					<!--									<hr>-->
					<!--									<p class="error" :class="errors.instructions ? 'show' : null">Instructions must have a category and-->
					<!--										summary. Time to prepare must be between 1 and 99 minutes. Complexity must be between 1 and 5.</p>-->

					<!--									<vue-draggable-next class="box ui-sortable-handle" :list="instructions">-->
					<!--										<div-->
					<!--												class="list-group-item bg-gray-300 pt-3 pl-3 pr-3 pb-2 rounded-md"-->
					<!--												v-for="instruction in instructions"-->
					<!--												:key="instruction.id"-->
					<!--										>-->
					<!--											<div class="row mb-3">-->
					<!--												<div class="col-lg-6">-->
					<!--													<div>-->
					<!--														<div class="text-left p-1">Choose Category</div>-->
					<!--														<select v-model="instruction.category" class="form-select" name="category"-->
					<!--																		data-placeholder="Choose Category">-->
					<!--															<option disabled>Select category</option>-->
					<!--															<option-->
					<!--																	v-for="category in INSTRUCTION_CATEGORIES"-->
					<!--																	:key="category"-->
					<!--																	:value="category">-->
					<!--																{{ category.toLowerCase() }}-->
					<!--															</option>-->
					<!--														</select>-->
					<!--													</div>-->
					<!--													<div class="">-->
					<!--														<div class="text-left p-1">Complexity</div>-->
					<!--														<input type="number" min="1" max="5" class="form-control"-->
					<!--																	 v-model="instruction.complexity">-->
					<!--													</div>-->
					<!--													<div class="">-->
					<!--														<div class="text-left p-1">Time to prepare</div>-->
					<!--														<input type="number" min="1" max="99" class="form-control"-->
					<!--																	 v-model="instruction.time">-->
					<!--													</div>-->
					<!--												</div>-->

					<!--												<div class="col-lg-6 col-sm-12">-->
					<!--													<div class="text-left p-1">Short summary</div>-->
					<!--													<textarea class="form-control" rows="7"-->
					<!--																		v-model="instruction.instruction"></textarea>-->
					<!--												</div>-->
					<!--											</div>-->
					<!--											<div class="signs">-->
					<!--												<div>-->
					<!--													<i class="fa fa-arrows" aria-hidden="true">-->
					<!--														<span class="alert-text"> Move</span>-->
					<!--													</i>-->
					<!--												</div>-->
					<!--												<div>-->
					<!--													<i class="fa-solid fa-circle-minus minusbtn" aria-hidden="true"-->
					<!--														 @click="deleteInstruction(instruction.id)">-->
					<!--														<span class="alert-text"> Delete</span>-->
					<!--													</i>-->
					<!--												</div>-->
					<!--											</div>-->
					<!--										</div>-->
					<!--									</vue-draggable-next>-->

					<!--									<a @click="addInstruction" class="btn btn-dark">Add new instruction</a>-->
					<!--								</div>-->
					<!--							</div>-->

					<!--							<p class="error" :class="generalError ? 'show' : null">{{ generalErrorMessage }}</p>-->


					<!--				</div>-->

				</div>
			</div>
		</div>
		<div class="recipe-detail" v-if="recipeNotFound">
			<h2 class="text-center">Recipe not found</h2>
		</div>
		<div class="recipe-detail" v-if="recipe && recipe.created_by !== auth.user.username">
			<h2 class="text-center">You can't edit this recipe.</h2>
		</div>
	</div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {ref, onMounted, toRaw, watch} from "vue";
import axios from "axios";
import {useAuthStore} from "@/stores/authStore";
import {createPictureUrl} from "../../helpers/helepers";

const auth = useAuthStore()
const route = useRoute()

const recipe = ref(null)
const recipeNotFound = ref(false)
const pictureUrl = ref(null)
const categories = ref([])
const name = ref(null)
const selectCategory = ref('')


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
			name.value = recipe.value.name
			// category.value = recipe.value.category
			pictureUrl.value = createPictureUrl(response.data.picture)
			recipe.value = response.data;
			recipe.value.instructions.sort((a, b) => a.id - b.id)
		} else {
			recipeNotFound.value = true
		}
	} catch (e) {
		recipeNotFound.value = true
	}
}

async function getRecipesCategories() {
	let response = await axios.get(`/categories/`)
	if (response.status === 200) {
		categories.value = response.data
	}
}

onMounted(() => {
	getRecipeById()
	getRecipesCategories()
});

const titleStatus = ref(
		{
			error: false,
			changed: false,
			message: ''
		}
)

async function changeTitle() {
	const response = await axios.patch(`/recipes/${recipe.value.id}`, {
		"field": "name",
		"value": name.value
	}, {
		headers: {
			"Content-Type": "application/json",
			'Authorization': 'Bearer ' + auth.token
		}
	})
	if (response.status === 200) {
		titleStatus.value.changed = true;
		titleStatus.value.message = "Recipe title successfully changed"
	} else {
		titleStatus.value.error = true;
		titleStatus.value.message = "Error changing title"
	}
}

watch(name, (newName) => {
	titleStatus.value.changed = false;
	if (newName.trim() === '') {
		titleStatus.value.error = true
		titleStatus.value.message = "Recipe title can't be empty"
	} else {
		titleStatus.value.error = false
		titleStatus.value.message = ""
	}

})
const categoryStatus = ref(
		{
			error: false,
			changed: false,
			message: ''
		}
)

async function changeCategory() {
	categoryStatus.value.message = ''
	if (selectCategory.value === '') {
		categoryStatus.value.error = true;
		categoryStatus.value.message = "Please select category"
	} else {
		const response = await axios.patch(`/recipes/${recipe.value.id}`, {
			"field": "category_id",
			"value": selectCategory.value
		}, {
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer ' + auth.token
			}
		})
		if (response.status === 200) {
			categoryStatus.value.changed = true;
			categoryStatus.value.message = "Recipe category successfully changed"
		} else {
			categoryStatus.value.error = true;
			categoryStatus.value.message = "Error changing category"
		}
	}
}
</script>

<style scoped>
.edit {
	color: var(--main-text);
}

.edit .title {
	padding: 30px 0;
	background-color: var(--very-light-background)
}

.edit .title h2 {
	font-size: 1.3rem;
	font-weight: 700;
	margin-bottom: 0
}

.edit .content {
	padding: 40px 0
}

.edit .content .form-group {
	margin-bottom: 40px;
	margin-top: 40px;
}

.edit .content .form-group hr {
	border-top: 1px dashed var(--main-text);
	margin-top: 0;
}

.edit .content .btn-submit {
	padding: 15px;
	color: var(--white);
	background-color: var(--main-color)
}

.edit .content .btn-submit:hover {
	padding: 15px;
	color: var(--main-text);
	background-color: var(--main-hover);
	border: 1px solid var(--main-text);
}

.edit .content .box {
	margin-bottom: 15px;
	padding: 20px;
	text-align: center
}

.edit .content .box:hover {
	cursor: pointer
}

.edit .content .box .fa-arrows {
	padding-top: 10px
}

.edit .content .box .fa-circle-minus, .plusbtn {
	font-size: 20px;
	padding-top: 9px;
}

.edit .content .box .fa-circle-minus:hover {
	color: var(--main-alert)
}

.edit .fa {
	padding-top: 11px;
	padding-bottom: 11px;
}

.edit .btn-dark {
	background-color: var(--dark-background);
	border: 1px solid var(--dark-background);
}

.edit .btn-dark:hover {
	background-color: var(--main-hover);
	color: var(--main-text);
}

.edit label {
	margin-bottom: 10px;
}

.edit .form-group .box {
	padding: 0;
}

.edit .ui-sortable-handle > .list-group-item {
	background-color: #EFEFEF;
	margin-top: 10px !important;

}

.edit .message {
	display: block;
	font-size: .8rem;
	padding-top: .3rem;
}

.edit .error {
	color: var(--main-alert);
}

.edit .success {
	color: var(--main-success);
}

.edit .alert-text {
	box-sizing: border-box;
	font-family: Roboto, sans-serif;
	font-weight: normal;
	font-size: 1rem;
}

.edit .signs {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 10px;
}

</style>