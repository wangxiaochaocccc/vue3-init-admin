import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import './assets/styles/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import installSvgIcon from './icons/index.js'
import installElementPlus from './plugins/element'
import installFilters from './filters'
import installDirective from './directives'
import i18n from './i18n'
import './permission.js'
import 'default-passive-events'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
installSvgIcon(app)
installElementPlus(app)
installFilters(app)
installDirective(app)
app.use(store).use(router).use(i18n).mount('#app')
