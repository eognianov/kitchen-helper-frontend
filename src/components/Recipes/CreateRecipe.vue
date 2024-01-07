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
                <textarea class="form-control" rows="4" v-model="summary" @change="status.checkSummary()"></textarea>
                <p class="error" :class="errors.summary ? 'show' : null">Please enter some summary.</p>
              </div>

              <div class="form-group">
                <label>Upload picture </label>
                <hr>
                <input type="file" class="form-control-file" @change="status.checkPicture">
                <p class="error" :class="errors.picture ? 'show' : null">Please select a picture.</p>
              </div>


              <div class="form-group">
                <label>Ingredients:</label>
                <hr>
                <p class="error" :class="errors.ingredients ? 'show' : null">Some errors</p>

                <vue-draggable-next class="box ui-sortable-handle" :list="ingredients">
                  <div
                      class="list-group-item bg-gray-300 pt-3 pl-3 pr-3 pb-2 rounded-md text-center"
                      v-for="ingredient in ingredients"
                      :key="ingredient.id"
                  >
                    <div class="row">
                      <div class="col-lg-6 col-sm-6">
                        <div class="text-left p-1">Ingredient name</div>
                        <input type="text" class="form-control"
                               v-model="ingredient.name">
                      </div>
                      <div class="col-lg-3 col-sm-3">
                        <div class="text-left p-1">Category</div>
                        <select v-model="ingredient.category" class="form-select" name="category"
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
                      <div class="col-lg-3 col-sm-3">
                        <div class="text-left p-1">Measurement</div>
                        <select v-model="ingredient.measurement" class="form-select" name="measurment"
                                data-placeholder="Choose Measurment">
                          <option disabled>Select category</option>
                          <option
                              v-for="unit in INGREDIENT_MEASUREMENT_UNITS"
                              :key="unit"
                              :value="unit">
                            {{ unit.toLowerCase() }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3 col-sm-3">
                        <div class="text-left p-1">Carbohydrate</div>
                        <input type="number" min="0" class="form-control"
                               v-model="ingredient.carbo">
                      </div>
                      <div class="col-lg-3 col-sm-3">
                        <div class="text-left p-1">Fats</div>
                        <input type="number" min="0" class="form-control"
                               v-model="ingredient.fats">
                      </div>
                      <div class="col-lg-3 col-sm-3">
                        <div class="text-left p-1">Protein</div>
                        <input type="number" min="0" class="form-control"
                               v-model="ingredient.protein">
                      </div>
                      <div class="col-lg-3 col-sm-3">
                        <div class="text-left p-1">Cholesterol</div>
                        <input type="number" min="0" class="form-control"
                               v-model="ingredient.cholesterol">
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
                           @click="deleteIngredient(ingredient.id)">
                          <span class="alert-text"> Delete</span>
                        </i>
                      </div>
                    </div>
                  </div>
                </vue-draggable-next>

                <a @click="addIngredient" class="btn btn-dark">Add new ingredient</a>

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

              <div class="form-group">
                <label>Nutrition Facts</label>
                <hr>
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Calories</label>
                <div class="col-sm-10">
                  <input type="number" min="0" value="0" class="form-control" v-model="calories"
                         @change="status.checkCalories">
                  <p class="error" :class="errors.calories ? 'show' : null">Calories must be a positive number.</p>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Carbohydrate</label>
                <div class="col-sm-10">
                  <input type="number" min="0" value="0" class="form-control" v-model="carbo"
                         @change="status.checkCarbo">
                  <p class="error" :class="errors.carbo ? 'show' : null">Carbohydrates must be a positive number.</p>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Fat</label>
                <div class="col-sm-10">
                  <input type="number" min="0" value="0" class="form-control" v-model="fats" @change="status.checkFats">
                  <p class="error" :class="errors.fats ? 'show' : null">Fats must be a positive number.</p>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Protein</label>
                <div class="col-sm-10">
                  <input type="number" min="0" value="0" class="form-control" v-model="proteins"
                         @change="status.checkProteins">
                  <p class="error" :class="errors.proteins ? 'show' : null">Proteins must be a positive number.</p>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Cholesterol</label>
                <div class="col-sm-10">
                  <input type="number" min="0" value="0" class="form-control" v-model="cholesterol"
                         @change="status.checkCholesterol">
                  <p class="error" :class="errors.cholesterol ? 'show' : null">Cholesterol must be a positive
                    number.</p>
                </div>
              </div>

              <p class="error" :class="generalError ? 'show' : null">Please check the form. Some errors found.</p>

              <button class="btn btn-submit">Submit Recipe</button>
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
const selectCategory = ref('')
const summary = ref("")
const picture = ref("")
const calories = ref(0)
const carbo = ref(0)
const fats = ref(0)
const proteins = ref(0)
const cholesterol = ref(0)
const ingredients = ref([
  {id: '1', name: '', measurement: '', category: '', carbo: 0, fats: 0, protein: 0, cholesterol: 0}
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
];
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

function addIngredient() {
  const id = "id" + Math.random().toString(16).slice(2)
  ingredients.value.push({
    id: `${id}`,
    name: '',
    measurement: '',
    category: '',
    carbo: 0,
    fats: 0,
    protein: 0,
    cholesterol: 0
  })
}

function deleteIngredient(id) {
  ingredients.value = ingredients.value.filter((ingredient) => ingredient.id !== id);
}

function addInstruction() {
  const id = "id" + Math.random().toString(16).slice(2)
  instructions.value.push({id: `${id}`, instruction: '', category: '', time: null, complexity: null})
}

function deleteInstruction(id) {
  instructions.value = instructions.value.filter((instruction) => instruction.id !== id);
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
  checkCalories: () => {
    errors.value.calories = calories.value < 0 || calories.value === '';
  },
  checkCarbo: () => {
    errors.value.carbo = carbo.value < 0 || carbo.value === '';
  },
  checkFats: () => {
    errors.value.fats = fats.value < 0 || fats.value === '';
  },
  checkProteins: () => {
    errors.value.proteins = proteins.value < 0 || proteins.value === '';
  },
  checkCholesterol: () => {
    errors.value.cholesterol = cholesterol.value < 0 || cholesterol.value === '';
  },
  checkPicture: (e) => {
    picture.value = e.target.files[0];
    errors.value.picture = false
  },
  checkPicture2: () => {
    errors.value.picture = !picture.value;
  },
  checkInstructions: () => {
    toRaw(instructions.value).forEach(instruction => {
      if (instruction.instruction === ''
          && instruction.category === ''
          && instruction.time === null
          && instruction.complexity === null) {
        deleteInstruction(instruction.id)
      } else if (instruction.instruction === '' || instruction.category === ''
          || instruction.time === null || instruction.complexity === null
          || instruction.time < 1 || instruction.time >= 100
          || instruction.complexity < 1 || instruction.complexity > 5) {
        errors.value.instructions = true
      } else {
        errors.value.instructions = false
      }
    })
  },
  checkIngredients: () => {
    toRaw(ingredients.value).forEach(ingredient => {
      if (ingredient.name.trim() === '' && ingredient.measurement.trim() === ''
          && ingredient.category.trim() === '' && ingredient.carbo === 0
          && ingredient.fats === 0 && ingredient.cholesterol === 0
          && ingredient.protein === 0) {
        deleteIngredient(ingredient.id)
      } else if (ingredient.name.length < 3 || ingredient.measurement.trim() === ''
          || ingredient.category.trim() === ''
          || ingredient.carbo < 0 || ingredient.fats < 0
          || ingredient.cholesterol < 0 || ingredient.protein < 0) {
        errors.value.ingredients = true
      } else {
        errors.value.ingredients = false
      }
    })

  }
}

const generalError = ref(false)

const errors = ref({
  title: false,
  category: false,
  picture: false,
  calories: false,
  carbo: false,
  fats: false,
  proteins: false,
  cholesterol: false,
  instructions: false,
  ingredients: false,
  summary: false
})

function submitRecipe() {
  status.checkTitle();
  status.checkCategory();
  status.checkSummary();
  status.checkPicture2();
  status.checkCalories();
  status.checkCarbo();
  status.checkFats();
  status.checkProteins();
  status.checkCholesterol();
  status.checkInstructions();
  status.checkIngredients()


  if (Object.values(errors.value).includes(true)) {
    generalError.value = true;
    return;
  } else {
    generalError.value = false;
  }

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

/*@media only screen and (max-width: 575px) {*/
/*  .submit .signs div {*/
/*    text-align: center !important;*/
/*  }*/
/*}*/

</style>