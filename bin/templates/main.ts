import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
<%= impPinia -%>

// reset.css
import './style/reset.css'

<%= pinia -%>

const app = createApp(App)

app.use(router)
<%= usePinia -%>

app.mount('#app')
