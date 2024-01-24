import {createApp} from 'vue';
import App from './App.vue';
import './axios';
import {createPinia} from 'pinia'

import {createVuetify} from "vuetify";
import {createRouter, createWebHistory} from "vue-router";
import SearchRecipes from './components/Recipes/SearchRecipes.vue';
import IndexPage from './components/IndexPage.vue';
import CreateRecipe from './components/Recipes/CreateRecipe.vue';
import RecipeDetails from "./components/Recipes/RecipeDetails.vue";
import LoginUser from "./components/LoginUser/LoginUser.vue";
import ForgotPassword from "./components/LoginUser/ForgotPassword.vue";
import CreateAccount from "./components/LoginUser/CreateAccount.vue";
import CheckEmail from "./components/LoginUser/CheckEmail.vue";
import MyRecipes from "./components/Recipes/MyRecipes.vue";

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
        {path: '/', component: IndexPage, name: 'index', meta: {requiresAuth: false}},
        {path: '/recipes', component: SearchRecipes, meta: {requiresAuth: false}},
        {path: '/create', component: CreateRecipe, meta: {requiresAuth: true}},
        {path: '/recipes/:id', component: RecipeDetails, meta: {requiresAuth: false}, name: 'recipe details'},
        {path: '/login', component: LoginUser, meta: {requiresAuth: false}},
        {path: '/reset-password', component: ForgotPassword, meta: {requiresAuth: true}},
        {path: '/signup', component: CreateAccount, meta: {requiresAuth: false}},
        {path: '/check-email', component: CheckEmail, name: 'check-email', meta: {requiresAuth: false}},
        {path: '/my-recipes', component: MyRecipes, name: 'my-recipes', meta: {requiresAuth: true}},
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem('token')) {
            next('/login')
        } else {
            next()
        }
    } else {
        next()
    }
})

app.use(pinia)
app.use(veautify)
app.use(router)
app.mount('#app')
