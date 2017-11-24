import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import Mint from 'mint-ui'
import http from 'util/http'

import 'common/css/index.css'
import 'mint-ui/lib/style.css'

fastclick.attach(document.body)

Vue.use(Mint)

Vue.prototype.$http = http

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
