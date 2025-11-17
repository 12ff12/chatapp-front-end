import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ClickOutside from './directive/clickoutside'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
pinia._p._devtools = false
app.use(pinia)
app.use(ClickOutside)
app.mount('#app')
