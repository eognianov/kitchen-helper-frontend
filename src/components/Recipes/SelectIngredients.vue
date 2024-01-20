<template>
  <div v-if="props.isModalOpen" class="modal-overlay">
    <div class="modal">
      <span class="close-button" @click="handleClick">×</span>
      <h3>Select Ingredients</h3>
      <div class="row">
        <div class="col-lg-6">
          <div class="text-left mb-2">Ingredients:</div>
          <ul class="ingredient-list">
            <li v-for="ingredient in filteredIngredients"
                :key="ingredient.id"
                @click="selectIngredient(ingredient.id, ingredient.name)">
              {{ ingredient.name }}
            </li>
          </ul>
        </div>
        <div class="col-lg-6">
          <div class="text-left mb-2">Selected Ingredients:</div>
          <ul class="selected">
            <li v-for="ingredient in selectedIngredients"
                :key="ingredient.id"
                @click="removeIngredient(ingredient.id, ingredient.name)">
              {{ ingredient.name }}
            </li>
          </ul>

        </div>


      </div>
      <div class="row d-flex justify-content-between pl-3 pr-3">
        <button @click="resetList" class="btn btn-dark col-lg-3">Reset</button>
        <div class="col-lg-3 mb-2"></div>
        <button @click="handleClick" class="btn btn-dark col-lg-3">OK</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref, toRaw} from 'vue'
import {useRecipeStore} from "@/stores/recipeStore";
import {useAuthStore} from "@/stores/authStore";

const recipeStore = useRecipeStore();
const auth = useAuthStore();

const props = defineProps(['isModalOpen', 'ingredients'])
const emit = defineEmits(['hideModal', 'handleSelectIngredients'])

const selectedIngredients = ref([])
const filteredIngredients = ref([])

async function init() {
    filteredIngredients.value = await recipeStore.getIngredients(auth.token)
}
init()

function handleClick() {
  emit('hideModal')
  emit('handleSelectIngredients', selectedIngredients.value)
}

function resetList() {
  selectedIngredients.value = []
  init()
}

function selectIngredient(id, name) {
  if (!selectedIngredients.value.some(item => item.id === id)) {
    selectedIngredients.value.push({id: id, name: name})
    filteredIngredients.value = filteredIngredients.value.filter(x => x.id !== id)
  }
}
function removeIngredient(id, name) {
  selectedIngredients.value = selectedIngredients.value.filter(item => item.id !== id)
  filteredIngredients.value.push({id:id, name: name})
}
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
  background: var(--white);
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

ul {
  padding: 0;
  overflow-y: scroll;
  height: 270px;
  border: 1px solid var(--dark-background-transparent);
}

ul li {
  padding: 2px 10px;
  text-align: left;
  list-style: none;
  font-size: .8rem;
}

.ingredient-list li:hover {
  cursor: pointer;
  background-color: var(--secondary-color);
  color: var(--white)
}
.selected li:hover {
  cursor: pointer;
  background-color: var(--main-alert);
  color: var(--white)
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