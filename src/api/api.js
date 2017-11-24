const debug = process.env.NODE_ENV !== 'production'

// 登录 请求参数phone: 手机号, pwd 密码：明文密码
export function userLogin(context, data) {
  const url = debug ? '/login' : 'https://www.yanysdd.com/api/v1/login'
  return context.$post(url, data)
}
// 产品列表 请求参数page:1, rows:10
export function getProductList(context, data) {
  const url = debug ? '/product/list' : 'https://www.yanysdd.com/api/v1/product/list'
  return context.$post(url, data)
}
// 申购记录 请求参数page:1, rows:10, customer_id:用户id, status:申购状态（区分申购的产品）
export function getPurchaseList(context, data) {
  const url = debug ? '/subscribe/mySubscribes' : 'https://www.yanysdd.com/api/v1/subscribe/mySubscribes'
  return context.$post(url, data)
}
// 赎回记录 请求参数customer_id: 赎回客户id
export function getRedeemRecord(context, data) {
  const url = debug ? '/redeem/myRedeems' : 'https://www.yanysdd.com/api/v1/redeem/myRedeems'
  return context.$post(url, data)
}
// 赎回 请求参数subscribe_id:申购id, customer_id: 赎回客户id, redeem_money:赎回金额（不能大于申购金额，至少1万起赎，最多是申购金额）
export function addRedeem(context, data) {
  const url = debug ? '/redeem/addRedeem' : 'https://www.yanysdd.com/api/v1/redeem/addRedeem'
  return context.$post(url, data)
}
// 修改登录密码 请求参数customer_id 客户id， old_pwd 旧密码， new_pwd 新密码
export function modifyPwd(context, data) {
  const url = debug ? '/login/updatePwd' : 'https://www.yanysdd.com/api/v1/login/updatePwd'
  return context.$post(url, data)
}
