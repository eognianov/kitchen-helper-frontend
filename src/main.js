import {createApp} from 'vue'
import App from './App.vue'
import {createVuetify} from "vuetify";
import {createRouter, createWebHistory} from "vue-router";
import ListRecipes from './components/ListRecipes/ListRecipes.vue'
import IndexPage from './components/IndexPage.vue'

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
        {path: '/recipes', component: ListRecipes}
    ]
})

app.use(veautify)
app.use(router)
app.mount('#app')
