import {createApp} from 'vue';
import App from './App.vue';
import './axios';
import { createPinia } from 'pinia'

import {createVuetify} from "vuetify";
import {createRouter, createWebHistory} from "vue-router";
import SearchRecipes from './components/Recipes/SearchRecipes.vue';
import IndexPage from './components/IndexPage.vue';
import CreateRecipe from './components/Recipes/CreateRecipe.vue';
import RecipeDetails from "./components/Recipes/RecipeDetails.vue";
import LoginUser from "./components/LoginUser/LoginUser.vue";
import ForgotPassword from "./components/LoginUser/ForgotPassword.vue";
import CreateAccount from "./components/LoginUser/CreateAccount.vue";
import Test from "./components/Test.vue";


import "vuetify/dist/vuetify.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.min.css";


const app = createApp(App)
const veautify = createVuetify()
const pinia = createPinia()
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: IndexPage, name: 'index'},
        {path: '/recipes', component: SearchRecipes},
        {path: '/create', component: CreateRecipe, meta: {requiresAuth: true}},
        {path: '/details', component: RecipeDetails},
        {path: '/login', component: LoginUser},
        {path: '/reset-password', component: ForgotPassword},
        {path: '/signup', component: CreateAccount},
        {path: '/test', component: Test},
    ]
});


app.use(veautify)
app.use(pinia)
app.use(router)
app.mount('#app')
