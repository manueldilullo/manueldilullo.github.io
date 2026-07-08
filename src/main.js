import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import AOS from 'aos'
import 'aos/dist/aos.css'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

import './style.css'

const app = createApp(App)

app.use(router)
app.use(FloatingVue)

app.mount('#app')

AOS.init()
