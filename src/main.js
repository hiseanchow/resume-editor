import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { DatePicker } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AV from 'leancloud-storage'

let APP_ID = 'd1NVI02gEXxNo3PicyTh7QJL-gzGzoHsz'
let APP_KEY = 'TyMYC5J3MYlXJkILN5iTxRn8'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

Vue.use(DatePicker)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  let current = AV.User.current()
  if ((to.path === '/login' && current) || (to.path === '/signup' && current)) {
    next('/')
  } else {
    next()
  }
})
