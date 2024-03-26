import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
const emitter = mitt()

const app = createApp(App)

app.use(router)
app.use(VueSweetalert2)

app.config.globalProperties.emitter = emitter
app.mount('#app')

app.config.globalProperties.ENVIRONMENT = false

if (app.config.globalProperties.ENVIRONMENT) {
  app.config.globalProperties.BASE_URL = 'http://192.168.4.200:81/social_media_api'
} else {
  app.config.globalProperties.BASE_URL = 'http://192.168.1.9/social_media_api'
}
