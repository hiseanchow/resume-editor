import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Preview from './views/preview.vue'
import Login from './components/login.vue'
import signUp from './components/signup.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: 'login',
        components: {
          dialog: Login
        }
      }, {
        path: 'signup',
        components: {
          dialog: signUp
        }
      }]
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview
    }
  ]
})
