import {createApp} from 'vue'
import App from './App.vue'
import {createVuetify} from "vuetify";
import {createRouter, createWebHistory} from "vue-router";
import ListRecipes from './components/ListRecipes/ListRecipes.vue'
import IndexPage from './components/IndexPage.vue'
import CreateRecipe from './components/CreateRecipe/CreateRecipe.vue'
import RecipeDetails from "./components/RecipeDetails/RecipeDetails.vue";
import LoginUser from "./components/LoginUser/LoginUser.vue";
import ForgotPassword from "./components/LoginUser/ForgotPassword.vue";
import CreateAccount from "./components/LoginUser/CreateAccount.vue";

import "vuetify/dist/vuetify.css"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.min.css"



const app = createApp(App)
const veautify = createVuetify()
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: IndexPage},
        {path: '/recipes', component: ListRecipes},
        {path: '/create', component: CreateRecipe},
        {path: '/details', component: RecipeDetails},
        {path: '/login', component: LoginUser},
        {path: '/reset-password', component: ForgotPassword},
        {path: '/signup', component: CreateAccount},
    ]
})

app.use(veautify)
app.use(router)
app.mount('#app')
