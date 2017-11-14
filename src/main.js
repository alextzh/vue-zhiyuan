import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import Mint from 'mint-ui'
import VueResource from 'vue-resource'
import {post, get, patch, put} from './util/http'
import {Cookie} from './util/cookie'

import 'common/css/index.css'
import 'mint-ui/lib/style.css'

fastclick.attach(document.body)

Vue.use(Mint)
Vue.use(VueResource)

Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.prototype.$put = put

// cookie方法
Vue.prototype.$Cookie = Cookie

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
