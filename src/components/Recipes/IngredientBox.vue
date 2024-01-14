<template>
  <div class="col-sm-5">
    <select class="form-select" name="category" v-model="selectedIngredient"
            data-placeholder="Choose Category">
      <option disabled>Select ingredient</option>
      <option v-for="ingredient in ingredientList" :key="ingredient.id" :value="ingredient.id">{{
          ingredient.name
        }}
      </option>
    </select>
  </div>
  <div class="col-sm-5" style=" display: flex; flex-direction: row" >
      <input type="number" class="form-control" v-model="current_quantity"
             placeholder="Quantity" style="width: 75%">
      <div class="col-sm-1" style="box-sizing: border-box;width: 30%; padding: 8px" >{{ measurement }}</div>
  </div>


</template>

<script setup>
import {defineProps, ref, watch} from 'vue'

const props = defineProps(['ingredientList', 'ingredient']);
const selectedIngredient = ref("")
const current_quantity = ref("")
const measurement = ref("")
const ingredient = ref(props.ingredient)


watch(selectedIngredient, (id) => {
  let current_ingredient = props.ingredientList.filter(ingredient => ingredient.id === id)
  measurement.value = current_ingredient[0].measurement.toLowerCase()
  ingredient.value.name = current_ingredient[0].name;
  ingredient.value.pk = current_ingredient[0].id;
})
watch(current_quantity, (quantity) => {
  ingredient.value.quantity = quantity
})


</script>

<style scoped>
.test {
  border: 1px solid red;
  margin: 0!important;
}

</style>