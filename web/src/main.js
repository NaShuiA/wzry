import Vue from 'vue'
import App from './App.vue'
import './assets/style/global.scss'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../src/assets/iconfont/iconfont.css'
// import style
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.config.productionTip = false
import Card from './components/Card'
Vue.component('m-card', Card)
import ListCard from './components/ListCard'
Vue.component('m-list-card', ListCard)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
