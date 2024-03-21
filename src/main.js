import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
const emitter = mitt()

const app = createApp(App)

app.use(router)

app.config.globalProperties.emitter = emitter
app.mount('#app')

app.config.globalProperties.ENVIRONMENT = false

if (app.config.globalProperties.ENVIRONMENT) {
  app.config.globalProperties.BASE_URL = 'http://localhost:81/social_media_api'
} else {
  app.config.globalProperties.BASE_URL = 'http://localhost/social_media_api'
}
