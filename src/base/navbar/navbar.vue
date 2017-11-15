<template>
  <div class="navbar" :style="styleObj">
    <div class="back" @click="back" v-if="showBack">
      <i class="iconfont icon-fanhui" :style="{'color': styleObj.color}"></i>
    </div>
    <div class="close" @click="close" v-if="showClose">
      <i class="iconfont icon-guanbi" :style="{'color': styleObj.color}"></i>
    </div>
    <h1 class="title">{{title}}</h1>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'tabbar',
    props: {
      showBack: {
        type: Boolean,
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      styleObj: {
        type: Object,
        default: function () {
          return {
            color: '#ffffff',
            background: '#F44336'
          }
        }
      }
    },
    methods: {
      back() {
        this.$emit('back')
      },
      close() {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped lang="scss">
  .navbar{
    position: relative;
    display: flex;
    align-items: center;
    height:40px;
    line-height: 40px;
    background: #F44336;
    color: #fff;
    .back,.close{
      width: 40px;
      flex:0 0 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      i{
        font-size:18px;
        color: #fff;
      }
    }
    .title{
      flex:1;
      text-align: left;
      font-size: 18px;
      padding: 0 15px;
    }
  }
</style>
