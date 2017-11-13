import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 懒加载路由模块导入
const Login = () => import('components/login/login')
const Mine = () => import('components/mine/mine')
const ModifyPassword = () => import('components/modify-password/modify-password')
const ProductList = () => import('components/product-list/product-list')
const PurchaseRecord = () => import('components/purchase-record/purchase-record')
const Redeem = () => import('components/redeem/redeem')
const RedeemRecord = () => import('components/redeem-record/redeem-record')
const RiskTip = () => import('components/risk-tip/risk-tip')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/productList',
      name: 'productList',
      component: ProductList
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/modifyPassword',
      name: 'modifyPassword',
      component: ModifyPassword
    },
    {
      path: '/purchaseRecord',
      name: 'purchaseRecord',
      component: PurchaseRecord
    },
    {
      path: '/redeem',
      name: 'redeem',
      component: Redeem
    },
    {
      path: '/redeemRecord',
      name: 'redeemRecord',
      component: RedeemRecord
    },
    {
      path: '/riskTip',
      name: 'riskTip',
      component: RiskTip
    }
  ]
})
