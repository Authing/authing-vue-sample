import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'
import VueRouter from 'vue-router'

import Redirect from './components/Redirect'
import LoginAndRegister from './components/HelloWorld'

Vue.config.productionTip = false;

Vue.use(Notifications)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: LoginAndRegister },
  { path: '/redirect', component: Redirect }
]

const router = new VueRouter({
  routes
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
