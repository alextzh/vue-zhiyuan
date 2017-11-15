<template>
  <div class="tabbar">
    <router-link v-for="(item,index) in items" :to="item.path" :key="index" class="tabbar-item">
      <span class="tabbar-item-icon"><i class="iconfont" :class="item.path === $route.path ? item.selectedIcon : item.defautlIcon"></i></span>
      <span class="tabbar-item-text">{{item.name}}</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'tabbar',
    data() {
      return {
        items: [
          {name: '产品', path: '/productList', defautlIcon: 'icon-home', selectedIcon: 'icon-homefill'},
          {name: '我的', path: '/mine', defautlIcon: 'icon-mine', selectedIcon: 'icon-minefill'}
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .tabbar{
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    overflow: hidden;
    height: 50px;
    background: #fff;
    border-top:1px solid #BDBDBD;
    box-sizing: border-box;
    .tabbar-item{
      flex: 1;
      text-align: center;
      .tabbar-item-icon {
        display: block;
        padding-top: 2px;
        i {
          font-size: 30px;
          color: #999;
        }
      }
      .tabbar-item-text{
        display: block;
        font-size: 10px;
        color:#999;
      }
      &.router-link-active{
        .tabbar-item-icon{
          i{
            color: #F44336;
          }
        }
        .tabbar-item-text{
          color: #F44336;
        }
      }
    }
  }
</style>
