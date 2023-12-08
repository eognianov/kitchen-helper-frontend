import { createApp } from 'vue'
import App from './App.vue'
import {createVuetify} from "vuetify";

import "vuetify/dist/vuetify.css"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.min.css"

const app = createApp(App)
const veautify = createVuetify()
app.use(veautify)
app.mount('#app')
