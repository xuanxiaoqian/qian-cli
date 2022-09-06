import { createApp } from 'vue'
import pinia from './store/index'
import App from './App.vue'
import router from './router/index'

import './style/reset.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
