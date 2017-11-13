<template>
  <transition name="slide">
    <div class="login">
      <div class="close" @click="close">
        <i class="iconfont icon-guanbi"></i>
      </div>
      <h1 class="title">登录</h1>
      <div class="logo">
        <span>至元操盘</span>
      </div>
      <form class="form_area" method="post" @submit.prevent="sub()">
        <div class="input_area">
          <div class="input_form">
            <i class="iconfont icon-phone"></i>
            <input v-model="user.mobile" maxlength="11" type="number" placeholder="请输入手机号" />
          </div>
          <div class="input_form">
            <i class="iconfont icon-pwd"></i>
            <input v-model="user.password" maxlength="20" type="password" placeholder="请输入密码" />
          </div>
        </div>
        <div class="btn_area">
          <button type="submit">登录</button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {regexConfig} from 'common/js/util'
  import { MessageBox } from 'mint-ui'
  import {logIn} from 'api/login'

  export default{
    name: 'login',
    data() {
      return {
        user: {
          mobile: '',
          password: ''
        }
      }
    },
    methods: {
      close() {
        console.log('111')
      },
      sub() {
        let param = this.user
        let flag = this.checkMobile(param) && this.checkPwd(param)
        if (flag) {
          this.mySubmit(param)
        }
      },
      checkMobile(param) {
        let phone = regexConfig().phone
        let mobile = param.mobile.trim()
        if (phone.test(mobile)) {
          return true
        } else {
          MessageBox('提示', '请输入有效的手机号码')
          return false
        }
      },
      checkPwd(param) {
        let pwd = param.password.trim()
        if (pwd.length <= 0) {
          MessageBox('提示', '请输入密码')
          return false
        } else if (pwd.length < 6 || pwd.length > 20) {
          MessageBox('提示', '请输入6-20位密码')
          return false
        } else {
          return true
        }
      },
      mySubmit(param) {
        let mobile = param.mobile.trim()
        let password = param.password.trim()
        logIn(mobile, password)
      }
    }
  }
</script>

<style scoped  lang="scss">
  .login {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background: #fff;
  }
  .close {
    position:absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .icon-guanbi {
      display: block;
      padding: 10px;
      font-size: 18px;
      color: #212121;
    }
  }
  .title {
    line-height: 40px;
    text-align: left;
    font-size: 18px;
    padding: 0 50px;
  }
  .logo{
    margin-top: 50px;
    margin-bottom: 60px;
    text-align: center;
    span{
      font-size: 30px;
      color: #212121;
    }
  }
  .form_area{
    display:flex;
    flex-direction:column;
    width:100%;
  }
  .input_area{
    flex:1;
    padding:0 15px;
    margin-bottom: 40px;
  }
  .input_form{
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    i{
      position: absolute;
      font-size: 18px;
      color: #F44336;
      z-index:1;
    }
    input{
      position: relative;
      height:50px;
      line-height: 50px;
      padding:0 25px;
      outline: none;
      flex: 1;
      border-bottom: 1px solid #BDBDBD;
      box-sizing: border-box;
    }
  }
  .btn_area{
    width:90%;
    margin: 0 auto;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
