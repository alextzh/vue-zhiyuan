<template>
  <transition name="slide">
    <div class="m-container">
      <navbar title="我的" :showBack="showBack" @close="close"></navbar>
      <div class="m-box">
        <div class="userinfo">
          <div class="info_box">
            <img class="user_avatar" src="./avatar.png" />
            <div class="user_msg">
              <p class="name">{{username}}</p>
              <p class="mobile">{{mobile}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="list">
        <router-link tag="div" to="/modifyPassword" class="item">
          <i class="iconfont icon-config" style="color:#2196F3;"></i>
          <span class="text">修改密码</span>
          <i class="iconfont icon-goto fc999"></i>
        </router-link>
        <router-link tag="div" to="/purchaseRecord" class="item">
          <i class="iconfont icon-bought" style="color:#F44336;"></i>
          <span class="text">申购记录</span>
          <i class="iconfont icon-goto fc999"></i>
        </router-link>
        <router-link tag="div" to="/redeemRecord" class="item">
          <i class="iconfont icon-record" style="color:#FFC107;"></i>
          <span class="text">赎回记录</span>
          <i class="iconfont icon-goto fc999"></i>
        </router-link>
        <router-link tag="div" to="/riskTip" class="item">
          <i class="iconfont icon-risk" style="color:#E91E63;"></i>
          <span class="text">风险提示</span>
          <i class="iconfont icon-goto fc999"></i>
        </router-link>
        <div class="item" @click="contactUs">
          <i class="iconfont icon-lianxiwomen" style="color:#03A9F4;"></i>
          <span class="text">联系我们</span>
          <i class="iconfont icon-goto fc999"></i>
        </div>
        <button class="btn" @click="close">退出账号</button>
      </div>
      <tabbar></tabbar>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar'
  import Tabbar from 'base/tabbar/tabbar'
  export default{
    name: 'mine',
    data() {
      return {
        showBack: false,
        username: '',
        mobile: ''
      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      close() {
        sessionStorage.clear()
        this.$router.push({
          path: '/login'
        })
      },
      contactUs() {
        console.log('111')
      },
      getUserInfo() {
        if (!sessionStorage.getItem('cInfo')) {
          this.$router.push({
            path: '/login'
          })
          return false
        }
        let cInfo = JSON.parse(sessionStorage.getItem('cInfo'))
        this.username = cInfo.name
        this.mobile = cInfo.phone
      }
    },
    components: {
      Navbar,
      Tabbar
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
    background: #f4f4f4;
  }
  .m-box{
    width: 100%;
    display: flex;
    flex-direction:column;
  }
  .userinfo{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 30%;
    -webkit-transform-origin: top;
    transform-origin: top;
    background: #f44336;
    background-size: cover;
    box-sizing: border-box;
    border:0;
    outline:0;
    box-shadow: 0 2px 6px rgba(0,0,0,.2);
    .info_box{
      position:absolute;
      top:50%;
      text-align:center;
      z-index:50;
      -webkit-transform:translateY(-50%);
      transform:translateY(-50%);
      display:flex;
      align-items:center;
      box-sizing: border-box;
      width:100%;
      padding:20px;
      .user_avatar{
        flex: 0 0 80px;
        width:80px;
        height:80px;
        border-radius: 50%;
      }
      .user_msg{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:flex-start;
        flex: 1;
        padding-left: 20px;
        line-height: 30px;
        overflow: hidden;
        .name{
          font-size: 18px;
          color: #fff;
        }
        .mobile{
          color:#fff;
          font-size:16px;
        }
      }
    }
  }
  .list{
    padding: 20px 0;
    .item{
      position: relative;
      height:45px;
      line-height:45px;
      background:#fff;
      color: #333;
      padding:0 10px;
      margin-bottom: 10px;
      transition: all .3s;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      &:hover{
        background: rgba(0,0,0,.1);
      }
      &:after{
        content:" ";
        width:200%;
        height:200%;
        position:absolute;
        top:0;
        left:0;
        border-top:1px solid #BDBDBD;
        border-bottom:1px solid #BDBDBD;
        -webkit-transform:scale(0.5);
        transform:scale(0.5);
        -webkit-transform-origin:0 0;
        transform-origin:0 0;
        box-sizing:border-box;
      }
      i{
        font-size: 18px;
      }
      .text{
        flex: 1;
        font-size: 16px;
        padding-left: 10px;
      }
    }
    .btn{
      width:90%;
      margin:20px auto;
    }
    .fc999{color: #999999;}
  }
</style>
