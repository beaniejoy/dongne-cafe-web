import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import eventBus from './plugins/event-bus'
import globalFilters from './plugins/filter/filters'
import { loadFonts } from './plugins/webfontloader'
import { globalCookiesConfig } from 'vue3-cookies'
import './index.pcss'

globalCookiesConfig({
  expireTimes: '30d',
  path: '/',
  domain: '',
  secure: true,
  sameSite: 'None',
})

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(eventBus)
  .use(globalFilters)
  .mount('#app')
