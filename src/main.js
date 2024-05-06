import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import URL from './additional_scripts/environment'
const emitter = mitt()

const app = createApp(App)

app.use(router)
app.use(VueSweetalert2)

app.config.globalProperties.emitter = emitter
app.mount('#app')

app.config.globalProperties.BASE_URL = URL

app.config.devtools = false
