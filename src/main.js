import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import Mint from 'mint-ui'

import 'common/css/index.css'
import 'mint-ui/lib/style.css'

fastclick.attach(document.body)

Vue.use(Mint)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
