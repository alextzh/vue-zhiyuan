import axios from 'axios'
import qs from 'qs'

const debug = process.env.NODE_ENV !== 'production'
// 创建axios实例并配置
let instance = axios.create({
  baseURL: debug ? '/api' : 'http://alberttian.cn/api',
  timeout: 5000
})
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// axios request 拦截器
instance.interceptors.request.use((config) => {
  config.data = qs.stringify(config.data)
  return config
}, (error) => {
  return Promise.reject(error)
})

// axios response 拦截器
instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default {
  // 登录 请求参数phone: 手机号, pwd 密码: 明文密码
  userLogin: function(data) {
    return post('/login', data)
  },
  // 产品列表 请求参数page: 1, rows: 10
  getProductList: function(data) {
    return post('/productList', data)
  },
  // 申购记录 请求参数page:1, rows:10, customer_id:用户id, status:申购状态（区分申购的产品）
  getPurchaseList: function(data) {
    return post('/mySubscribes', data)
  },
  // 赎回记录 请求参数customer_id: 赎回客户id
  getRedeemRecord: function(data) {
    return post('/myRedeems', data)
  },
  // 赎回 请求参数subscribe_id:申购id, customer_id: 赎回客户id, redeem_money:赎回金额（不能大于申购金额，至少1万起赎，最多是申购金额）
  addRedeem: function(data) {
    return post('/addRedeem', data)
  },
  // 修改登录密码 请求参数customer_id 客户id，old_pwd 旧密码，new_pwd 新密码
  modifyPwd: function(data) {
    return post('/updatePwd', data)
  }
}
