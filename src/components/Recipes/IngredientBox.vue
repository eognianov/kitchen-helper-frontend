<template>
	<div class="col-sm-5 mb-2">
		<section class="dropdown-wrapper">
			<div class="dropdown-popover">
				<input class="form-control input-name" type="text" v-model="searchQuery"
							 @focus="isVisible=true"
							 @blur="handleBlur">
				<div class="options" v-if="isVisible">
					<div class="outer">
						<div class="inner">
							<ul>
								<li v-for="ingredient in filteredIngredients"
										:key="ingredient.id" @click="selectItem(ingredient)">
									{{ ingredient.name }}
								</li>
								<li v-if="filteredIngredients.length === 0" class="no-items">No items found</li>
							</ul>
						</div>
					</div>

				</div>
			</div>
		</section>
	</div>

	<div class="col-sm-5 mb-2" style="display: flex; flex-direction: row">
		<input type="number" step="0.001" class="form-control" v-model="current_quantity"
					 placeholder="Quantity" style="width: 75%" @focus="isVisible=false">
		<div class="col-sm-1" style="box-sizing: border-box;width: 30%; padding: 8px">{{ measurement }}</div>
	</div>


</template>

<script setup>
import {ref, watch, computed} from 'vue'

const props = defineProps(['ingredientList', 'ingredient']);
const selectedIngredient = ref("")
const current_quantity = ref("")
const measurement = ref("")
const ingredient = ref(props.ingredient)

const searchQuery = ref("")
const isVisible = ref(false)

watch(selectedIngredient, (id) => {
	let current_ingredient = props.ingredientList.filter(ingredient => ingredient.id === id)
	measurement.value = current_ingredient[0].measurement.toLowerCase()
	ingredient.value.name = current_ingredient[0].name;
	ingredient.value.pk = current_ingredient[0].id;
})

watch(current_quantity, (quantity) => {
	ingredient.value.quantity = quantity;
})

watch(searchQuery, (word) => {
	let current_ingredient = props.ingredientList.filter(ingredient => ingredient.name === word.trim())
	if (current_ingredient.length === 1) {
		measurement.value = current_ingredient[0].measurement.toLowerCase()
		ingredient.value.name = current_ingredient[0].name;
		ingredient.value.pk = current_ingredient[0].id;
	} else {
		measurement.value = null
		ingredient.value.name = '';
	}
})

const filteredIngredients = computed(() => {
	const query = searchQuery.value.toLowerCase()
	if (searchQuery.value.trim() === '') {
		return props.ingredientList
	} else {
		return props.ingredientList.filter(ingredient => ingredient.name.toLowerCase().includes(query))
	}
})

function selectItem(selected_ingredient) {
	selectedIngredient.value = selected_ingredient.id
	searchQuery.value = selected_ingredient.name
	isVisible.value = false
}

function handleBlur() {
	setTimeout(() => {
		isVisible.value = false
	}, 300)

}

</script>

<style scoped>
.dropdown-wrapper {
	position: relative;
}

.options {
	position: absolute;
	width: 100%;
	border-radius: 7px;
	background-color: var(--white);
	z-index: 1199;
	overflow: hidden;
}

.options ul {
	list-style: none;
	text-align: left;
	padding-left: 0;
}
.options ul li {
	width: 100%;
	padding-left: .7rem;
	cursor: pointer;
	margin-top: 5px;
}

.options ul li:hover {
	background-color: var(--main-color);
	color: var(--white);
}

.no-items {
	color: var(--light-text)
}

.options .no-items:hover {
	background-color: var(--white);
	color: var(--light-text)
}
.outer {
  width: 100%;
  border: 1px solid var(--light-background);
  border-radius: 10px;
  overflow: hidden;
}
.inner {
  height: 100%;
	max-height: 15rem;
  overflow-y: scroll;

}
</style>