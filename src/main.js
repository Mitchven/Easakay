import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import * as io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

import Vuelidate from "vuelidate"
import { CardPlugin } from 'bootstrap-vue'
Vue.use(CardPlugin)
Vue.use(Vuelidate)

Vue.use(new VueSocketIO({
  debug: true,
  connection: io('http://localhost:8082'), //options object is Optional
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
})
);

Vue.config.productionTip = false
Vue.use(BootstrapVue)

export const EventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')