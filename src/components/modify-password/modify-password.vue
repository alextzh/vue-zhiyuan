<template>
  <transition name="slide">
    <div class="m-container">
      <navbar title="修改密码" @back="back" @close="close"></navbar>
      <form class="form_area" method="post" @submit.prevent="sub()">
        <div class="input_area">
          <div class="input_form">
            <i class="iconfont icon-oldpwd"></i>
            <input v-model="passwordGroup.password" maxlength="20" type="password" placeholder="请输入原密码" />
          </div>
          <div class="input_form">
            <i class="iconfont icon-newpwd"></i>
            <input v-model="passwordGroup.password1" maxlength="20" type="password" placeholder="请输入新密码" />
          </div>
          <div class="input_form">
            <i class="iconfont icon-surepwd"></i>
            <input v-model="passwordGroup.password2" maxlength="20" type="password" placeholder="请再次输入新密码" />
          </div>
        </div>
        <div class="btn_area">
          <button type="submit">修改</button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar'
  import { MessageBox, Toast } from 'mint-ui'

  export default{
    name: 'modifyPassword',
    data() {
      return {
        showBack: false,
        passwordGroup: {
          password: '',
          password1: '',
          password2: ''
        }
      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      back() {
        this.$router.back()
      },
      close() {
        sessionStorage.clear()
        this.$router.push({
          path: '/login'
        })
      },
      getUserInfo() {
        if (!sessionStorage.getItem('userInfo')) {
          this.$router.push({
            path: '/login'
          })
          return false
        }
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        this.passwordGroup.customer_id = userInfo.id
      },
      sub() {
        let param = this.passwordGroup
        let flag = this.checkPassword(param) && this.checkNewPassword(param)
        if (flag) {
          this.mySubmit(param)
        }
      },
      checkPassword: function (param) {
        let password = param.password.trim()
        if (!password) {
          MessageBox('提示', '请输入原密码')
          return false
        } else if (password.length < 6 || password.length > 20) {
          MessageBox('提示', '请输入6-20位原密码')
          return false
        } else {
          return true
        }
      },
      checkNewPassword: function (param) {
        let password1 = param.password1.trim()
        let password2 = param.password2.trim()
        if (!password1 || !password2) {
          MessageBox('提示', '请输入新密码')
          return false
        } else if (password1.length < 6 || password1.length > 20) {
          MessageBox('提示', '请输入6-20位新密码')
          return false
        } else if (password2.length < 6 || password2.length > 20) {
          MessageBox('提示', '请输入6-20位新密码')
          return false
        } else if (password1 !== password2) {
          MessageBox('提示', '两次新密码输入不一致')
          return false
        } else {
          return true
        }
      },
      mySubmit(param) {
        let passwordInfo = {
          old_pwd: param.password.trim(),
          new_pwd: param.password1.trim(),
          customer_id: param.customer_id
        }
        this.$http.modifyPwd(passwordInfo).then(res => {
          if (!res.ret) {
            MessageBox('提示', res.msg)
            return false
          }
          Toast({
            message: '修改成功',
            duration: 1500
          })
          this.$router.push({
            path: `/mine`
          })
        })
      }
    },
    components: {
      Navbar
    }
  }
</script>

<style scoped lang="scss">
  .m-container {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background: #fff;
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
      top: 50%;
      transform: translateY(-50%);
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
</style>
