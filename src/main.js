import Vue from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faSave, faWindowClose, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'

import store from './store';

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import router from './router.js'

library.add(faUserSecret, faSave, faWindowClose, faEdit, faTrashAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
