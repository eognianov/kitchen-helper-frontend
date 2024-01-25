<template>
	<div v-if="props.isModalOpen" class="modal-overlay">
		<div class="modal">
			<span class="close-button" @click="handleClick">×</span>
			<h2>Create Ingredient</h2>
			<br>
			<div class="form-group row mb-2">
				<div class="col-md-8">
					<label class="text-left">Name</label>
					<input type="text" class="form-control" v-model="name">
				</div>

				<div class="col-md-4">
					<label class="">Unit</label>
					<select v-model="selectMeasurement" class="form-select" name="measurement"
									data-placeholder="Choose measurement unit">
						<option disabled>Select category</option>
						<option
								v-for="unit in INGREDIENT_MEASUREMENT_UNITS"
								:key="unit" :value="unit">
							{{ unit.toLowerCase() }}
						</option>
					</select>
				</div>
			</div>

			<div class="form-group row mb-2">
				<div class="col-md-12">
					<label class="">Choose category</label>
					<select v-model="selectCategory" class="form-select" name="category"
									data-placeholder="Choose Category">
						<option disabled>Select category</option>
						<option
								v-for="category in INGREDIENT_CATEGORIES"
								:key="category"
								:value="category">
							{{ category.toLowerCase() }}
						</option>
					</select>
				</div>
			</div>
			<div class="form-group row mb-2">
				<div class="col-md-2">
					<label class="text-left">Calories</label>
					<input type="number" class="form-control" v-model="calories">
				</div>
				<div class="col-md-2">
					<label class="text-left">Carbo</label>
					<input type="number" class="form-control" v-model="carbo">
				</div>
				<div class="col-md-2">
					<label class="text-left">Fats</label>
					<input type="number" class="form-control" v-model="fats">
				</div>
				<div class="col-md-2">
					<label class="text-left">Proteins</label>
					<input type="number" class="form-control" v-model="proteins">
				</div>
				<div class="col-md-4">
					<label class="text-left">Cholesterol</label>
					<input type="number" class="form-control" v-model="cholesterol">
				</div>
			</div>
			<p class="error" :class="generalError ? 'show' : null">{{ errorMessage }}</p>
			<button @click="addIngredient" class="btn btn-dark mt-4 mr-4" style="display: inline-block">Create</button>
			<button @click="resetIngredient" class="btn btn-dark mt-4" style="display: inline-block">Reset</button>
		</div>

	</div>
</template>


<script setup>
import {ref} from 'vue'
import axios from "axios";
import {useAuthStore} from "@/stores/authStore";

const auth = useAuthStore()

const props = defineProps(['isModalOpen', 'ingredients'])
const emit = defineEmits(['hideModal', 'addNewIngredient'])

const selectCategory = ref('')
const name = ref('')
const calories = ref(0)
const carbo = ref(0)
const proteins = ref(0)
const fats = ref(0)
const cholesterol = ref(0)
const selectMeasurement = ref('')
const errorMessage = ref('')
const generalError = ref(false)

function handleClick() {
	emit('hideModal')
}

function checkIngredients() {
	errorMessage.value = '';
	generalError.value = false;

	props.ingredients.forEach(ingredient => {
		if (ingredient.name === name.value) {
			errorMessage.value += ' Ingredient with this name already exist.'
			generalError.value = true
		}
	})

	if (name.value.length < 3 || name.value.length > 99) {
		errorMessage.value += ' Name must be between 3 and 99 characters long.'
		generalError.value = true
	}
	if (!INGREDIENT_CATEGORIES.includes(selectCategory.value)) {
		errorMessage.value += ' Please select a valid category.'
		generalError.value = true
	}
	if (!INGREDIENT_MEASUREMENT_UNITS.includes(selectMeasurement.value)) {
		errorMessage.value += ' Please select a valid measurement unit.'
		generalError.value = true
	}
	if (calories.value < 0 || carbo.value < 0 || proteins.value < 0 || fats.value < 0 || cholesterol.value < 0) {
		errorMessage.value += " Nutrition's must be a positive number."
		generalError.value = true
	}

}

function resetIngredient() {
	name.value = ''
	calories.value = 0
	carbo.value = 0
	fats.value = 0
	proteins.value = 0
	cholesterol.value = 0
	selectMeasurement.value = ''
	selectCategory.value = ''
	generalError.value = false;
	errorMessage.value = '';
}

async function addIngredient() {
	checkIngredients()

	if (generalError.value === true) {
		return
	}
	const newIngredient = {
		name: name.value,
		calories: calories.value,
		carbo: carbo.value,
		fats: fats.value,
		protein: proteins.value,
		cholesterol: cholesterol.value,
		measurement: selectMeasurement.value,
		category: selectCategory.value
	}

	const response = await axios.post('/ingredients', newIngredient, {
		headers: {
			"Content-Type": "application/json",
			'Authorization': 'Bearer ' + auth.token
		}
	})
	if (response.status === 201) {
		emit('addNewIngredient', response.data)
	} else {
		errorMessage.value = 'Something went wrong. Please try again later.'
		generalError.value = true
		return
	}
	resetIngredient()
	handleClick()
}

const INGREDIENT_CATEGORIES = [
	'PANTRY ESSENTIALS',
	'VEGETABLES AND GREENS',
	'FRUITS',
	'MEAT AND POULTRY',
	'SEAFOOD',
	'DAIRY',
	'SPICES AND SEASONINGS',
	'GRAINS AND PASTA',
	'CONDIMENTS',
	'BAKING INGREDIENTS',
	'BEVERAGES',
	'NUTS AND SEEDS',
	'SWEETENERS',
	'SNACKS',
	'MISCELLANEOUS',
]
const INGREDIENT_MEASUREMENT_UNITS = [
	'KG',
	'GRAM',
	'LITER',
	'MILLILITER',
	'TEASPOON',
	'TABLESPOON',
	'CUP',
	'PINCH',
	'PIECE',
	'OUNCE',
	'POUND',
	'FLUID OUNCE',
	'GALLON',
	'QUART',
	'PINT'
]
</script>

<style scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: #222222CC;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1200;
}

.modal {
	display: block;
	position: relative;
	margin: 0 auto;
	width: 50vw;
	height: 50vh;
	background: #fff;
	padding: 20px;
	border-radius: 8px;
	text-align: center;
}

.close-button {
	position: absolute;
	top: 10px;
	right: 10px;
	font-size: 20px;
	cursor: pointer;
}

.show {
	color: var(--main-alert);
	font-size: .8rem;
	margin-bottom: 0;
}

.btn-dark:hover {
	background-color: var(--main-hover);
	color: var(--main-text);
}

@media only screen and (max-width: 768px) {
	.modal {
		height: 85vh;
	}
}

</style>
