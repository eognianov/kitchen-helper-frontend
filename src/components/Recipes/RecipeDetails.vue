<template>
  <div class="recipe-detail" v-if="recipe">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-12 text-center">
          <h1>{{ recipe.name }}</h1>
          <div class="by"><i class="fa fa-user" aria-hidden="true"></i> {{ user ? user.username : 'Unknown' }}</div>
        </div>
        <div class="col-lg-8">
          <img :src='imageUrl' :alt="recipe.name">
          <div class="info">
            <div class="row">
              <div class="col-lg-4 col-sm-4">
                <p>Serves:</p>
                <p><strong><i class="fa fa-users" aria-hidden="true"></i> {{ recipe.serves }} people</strong>
                </p>
              </div>
              <div class="col-lg-4 col-sm-4">
                <p>Time to prepare:</p>
                <p><strong><i class="fa fa-clock-o" aria-hidden="true"></i> {{ recipe.time_to_prepare }} minutes </strong>
                </p>
              </div>
              <div class="col-lg-4 col-sm-4">
                <p>Complexity:</p>
                <p><strong><i class="fa fa-clock-o" aria-hidden="true"></i> {{recipe.complexity}}</strong>
                </p>
              </div>
            </div>
          </div>


          <p>{{ recipe.summary }}</p>

          <div class="tag">
            <a href="#">Chicken</a>
            <a href="#">Lemon</a>
            <a href="#">Sayur</a>
          </div>

          <div class="ingredient-direction">
            <div class="row">
              <div class="col-lg-6 col-sm-6">
                <h3>Ingredients</h3>
<!--                <p> {{ recipe.ingredients }}</p>-->
                <ul class="ingredients p-3">
                  <li>3 Slice Chicken</li>
                  <li>2 cubes beef bouillon, crumbled</li>
                  <li>2 pounds cubed beef stew meat</li>
                  <li>3 tablespoons vegetable oil</li>
                  <li>1 large onion, chopped</li>
                  <li>1 teaspoon dried rosemary</li>
                  <li>1/2 teaspoon ground black pepper</li>
                </ul>
              </div>
              <div class="col-lg-6 col-sm-6">
                <h3>Instructions</h3>
<!--                <p> {{ recipe.instructions}}</p>-->
                <ol class="directions">
                  <li>Mei latine maluisset constituam ut. Eum vero vocibus at, minim debet deterruisset cum ei. Soluta
                    virtute tibique cu quo, his vivendo suscipit ea. Legere fabulas pro ea.
                  </li>
                  <li>An unum soluta eos, audire meliore te nam. Mundi choro sensibus ut vim, ut sed errem ludus
                    tractatos, eu vix fierent definiebas. Ad est autem appareat. Vim ne latine interpretaris, eum
                    sensibus mediocritatem cu.
                  </li>
                  <li>Est an etiam cetero fierent. At sit primis evertitur. Est prima electram voluptatum ne. Nec id
                    atqui contentiones mediocritatem, ut mel enim soleat audire, tecripta consequat ea.
                  </li>
                  <li>Vidit mutat periculis sed ex, ex mel nihil suscipiantur. Brute noster aeterno et eum, mea et idque
                    primis repudiare.
                  </li>
                </ol>
              </div>
            </div>
          </div>


          <div class="nutrition-facts clearfix">
            <h3>Nutrition Facts</h3>
            <div>
              <p>Calories:</p>
              <p><strong>{{ recipe.calories }} kcal</strong>
              </p>
            </div>
            <div>
              <p>Carbohydrate:</p>
              <p><strong>{{ recipe.carbo }} g</strong>
              </p>
            </div>
            <div>
              <p>Fat:</p>
              <p><strong>{{ recipe.fats }} g</strong>
              </p>
            </div>
            <div>
              <p>Protein:</p>
              <p><strong>{{ recipe.proteins }} g</strong>
              </p>
            </div>
            <div>
              <p>Cholesterol:</p>
              <p><strong>{{ recipe.cholesterol }} mg</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="recipe-detail" v-if="recipeNotFound">
    <h2 class="text-center">Recipe not found</h2>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {ref} from "vue";
import axios from "axios";
import {useAuthStore} from "@/stores/authStore";

const auth = useAuthStore()
const route = useRoute()

const recipe = ref(null)
const recipeNotFound = ref(false)
const user = ref(null)
const imageUrl = ref(null)

async function getUserById(id) {
  try {
    const response = await axios.get(`/users/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + auth.token
      }
    })
    if (response.status === 200) {
      user.value = response.data
      // console.log(response.data)
    }
  } catch (e) {
    recipeNotFound.value = true
  }
}

async function getImageById(id) {
  try {
    const response = await axios.get(`/images/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + auth.token
      }
    })
    if (response.status === 200) {
      if (response.data.in_cloudinary === false) {
        const url = response.data.url.replaceAll("\\", '/')
        imageUrl.value = `http://127.0.0.1:8000/${url}`
      } else {
        console.log('cloudinary url')
      }

    }
  } catch (e) {
    recipeNotFound.value = true
  }
}

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
      getUserById(response.data.created_by)
      getImageById(response.data.picture)
    }
  } catch (e) {
    recipeNotFound.value = true
  }
}

getRecipeById();

</script>

<style scoped>
.recipe-detail {
  color: var(--main-text);
}

.recipe-detail {
  padding: 70px 0
}

.recipe-detail h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--main-text);
}

.recipe-detail .by {
  margin-bottom: 40px;
  font-size: 18px;
  color: var(--main-text);
}

.recipe-detail .by i {
  font-size: 20px;
  color: var(--main-text);
}

.recipe-detail img {
  width: 100%
}


.recipe-detail .tag a {
  display: inline-block;
  padding: 10px 20px;
  color: var(--white);
  border: 1px solid var(--main-color);
  border-radius: 6px;
  background: var(--main-color);
  transition: all 0.3s ease;
  margin: 0 3px 6px 0;
  text-decoration: none;
}

.recipe-detail .tag a:hover {
  text-decoration: none;
  background-color: var(--main-hover);
  color: var(--main-text);
  border: 1px solid var(--dark-background);
  transition: all 0.3s ease;
}


.recipe-detail .info {
  margin-bottom: 20px;
  padding: 20px;
  color: var(--white);
  background-color: var(--dark-background);
}

.recipe-detail .info p {
  font-size: .8rem;
  margin-bottom: 0
}

.recipe-detail .info p strong {
  font-size: 1rem;
  color: var(--white)
}

.recipe-detail .ingredient-direction {
  margin-top: 30px
}

.recipe-detail .ingredient-direction h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 20px
}

.recipe-detail .ingredient-direction ul.ingredients {
  padding: 30px 30px 30px 0;
  list-style: none;
  background: var(--very-light-background);
}

.recipe-detail .ingredient-direction ul.ingredients li {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed var(--main-text)
}

.recipe-detail ol.directions > li {
  position: relative;
  margin-bottom: 30px;
  padding-left: 20px
}

.recipe-detail ol.directions {
  list-style-type: none;
  margin: 15px 0 0 34px;
  padding: 0;
  counter-reset: li-counter
}

.recipe-detail ol.directions > li:before {
  font-size: 16px;
  font-weight: 700;
  line-height: 32px;
  position: absolute;
  top: 3px;
  left: -34px;
  width: 34px;
  height: 34px;
  text-align: center;
  color: var(--main-text);
  background-color: var(--light-background);
  content: counter(li-counter);
  counter-increment: li-counter;
  cursor: default
}

.recipe-detail .nutrition-facts {
  position: relative;
  margin-bottom: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px dashed var(--main-text);
  border-bottom: 1px dashed var(--main-text);
}

.recipe-detail .nutrition-facts h3 {
  font-size: .9rem;
  position: absolute;
  top: -20px;
  left: 0;
  padding: 8px 10px;
  color: var(--white);
  background-color: var(--dark-background)
}

.recipe-detail .nutrition-facts p {
  color: var(--main-text);
  font-size: .8rem;
}

.recipe-detail .nutrition-facts p strong {
  font-size: 1rem;
  color: var(--main-text)
}

.recipe-detail .nutrition-facts div {
  float: left;
  width: 20%
}

.recipe-detail .nutrition-facts div p {
  margin-bottom: 0
}
</style>