import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// vue-fullpage.js関連
import VueFullPage from 'vue-fullpage.js'
import 'vue-fullpage.js/dist/style.css'

const app = createApp(App)
app.use(VueFullPage)
app.mount('#app')
