import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/styles/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import installSvgIcon from './icons/index.js'
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
installSvgIcon(app)
app.use(store).use(router).use(ElementPlus).mount('#app')
