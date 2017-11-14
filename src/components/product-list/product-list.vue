<template>
  <transition name="slide">
    <div class="product-list">
      <div class="close" @click="close">
        <i class="iconfont icon-guanbi"></i>
      </div>
      <h1 class="head_title">产品列表</h1>
      <div class="list" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <template v-if="productList.length > 0">
          <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
            <div class="item" v-for="(item, index) in productList" :key="index">
              <div class="item_head">
                <i class="iconfont icon-item"></i>
                <span class="title">{{item.name}}</span>
                <span class="item_state" style='color: #2196F3;' v-if="item.status === '已发布'">{{item.status}}</span>
                <span class="item_state" style='color: #4527a0;' v-if="item.status === '申购中'">{{item.status}}</span>
                <span class="item_state" style='color: #e91e63;' v-if="item.status === '申购结束'">{{item.status}}</span>
                <span class="item_state" style='color: #F44336;' v-if="item.status === '操盘中'">{{item.status}}</span>
              </div>
              <div class="item_body">
                <div class="item__left">
                  <span>预融份额：</span>
                  <span class="new_data">{{item.expect_quota}}万份</span>
                </div>
                <div class="item__right">
                  <span>最大申购人数：</span>
                  <span class="all_data">{{item.max_amount}}</span>
                </div>
              </div>
              <div class="item_foot" v-if="item.status !== '操盘中'">
                <span>申购起始时间：</span>
                <span>{{item.start_datetime}}</span>
              </div>
              <div class="item_foot" v-if="item.status !== '操盘中'">
                <span>申购结束时间：</span>
                <span>{{item.end_datetime}}</span>
              </div>
              <div class="item_foot">
                <span>操盘时间：</span>
                <span>{{item.caopan_time}}</span>
              </div>
              <div class="item_foot">
                <span>结算时间：</span>
                <span>{{item.settlement_time}}</span>
              </div>
            </div>
          </v-loadmore>
        </template>
        <template v-if="hasData">
          <div class="no_data">
            <i class="iconfont icon-nodata"></i>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { MessageBox, Loadmore } from 'mint-ui'
  import {rendererZhMoneyWan, _normalizeDate} from 'common/js/util'
  import {getProductList} from 'api/api'

  export default{
    name: 'productList',
    data() {
      return {
        productList: [],
        pageData: {
          page: 1,
          rows: 2
        },
        allLoaded: false, // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        scrollMode: 'auto', // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        hasData: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._getProductList()
      })
    },
    methods: {
      close() {
        console.log('111')
      },
      _getProductList() {
        getProductList(this, this.pageData).then((res) => {
          if (!res.ret) {
            MessageBox('提示', res.msg)
            this.hasData = true
            return false
          }
          this.isHaveMore(res.obj.totalPage)
          let list = res.obj.list
          this.productList = this._normalizeList(list)
          this.$nextTick(function () {
            // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写
            // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果
            // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
            this.scrollMode = 'touch'
          })
        })
      },
      _getMoreProductList() {
        this.pageData.page = this.pageData.page + 1
        getProductList(this, this.pageData).then((res) => {
          if (!res.ret) {
            MessageBox('提示', res.msg)
            this.hasData = true
            return false
          }
          // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
          this.isHaveMore(res.obj.totalPage)
          let list = res.obj.list
          this.productList = this.productList.concat(this._normalizeList(list))
        })
      },
      loadTop() { // 组件提供的下拉触发方法
        // 下拉加载
        this._getProductList()
        this.$refs.loadmore.onTopLoaded() // 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom() {
        // 上拉加载
        this._getMoreProductList() // 上拉触发的分页查询
        this.$refs.loadmore.onBottomLoaded() // 固定方法，查询完要调用一次，用于重新定位
      },
      isHaveMore(totalPage) {
        // 是否还有下一页，如果没有就禁止上拉刷新
        this.allLoaded = true // true是禁止上拉加载
        if (this.pageData.page > totalPage) {
          this.allLoaded = false
        }
      },
      _normalizeList(list) {
        if (list === []) {
          return []
        } else {
          for (let i = 0; i < list.length; i++) {
            list[i].caopan_time = _normalizeDate(list[i].caopan_time)
            list[i].expect_quota = rendererZhMoneyWan(list[i].expect_quota)
          }
          return list
        }
      }
    },
    components: {
      'v-loadmore': Loadmore
    }
  }
</script>

<style scoped lang="scss">
  .product-list {
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
      color: #fff;
    }
  }
  .head_title {
    line-height: 40px;
    text-align: left;
    font-size: 18px;
    padding: 0 50px;
    background: #F44336;
    color: #fff;
  }
  .list{
    display: flex;
    flex-direction:column;
    width: 100%;
  }
  .item{
    position:relative;
    padding: 10px;
    margin: 10px;
    box-sizing:border-box;
    background:#fff;
    transition:all .3s;
    border-radius:4px;
    box-shadow:0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12)
  }
  .item:active{
    box-shadow: 0 1px 3px 0 rgba(244,67,54,.2), 0 1px 1px 0 rgba(244,67,54,.14), 0 2px 1px -1px rgba(244,67,54,.12);
  }
  .item_head{
    position: relative;
    line-height:30px;
    padding-bottom: 10px;
  }
  .item_head icon{
    color: #F44336;
    font-size: 18px;
  }
  .item_head .title{
    padding-left: 10px;
    font-size: 18px;
    color: #212121;
  }
  .item_state{
    float: right;
    padding:0 10px;
    background:#fff;
    color:#F44336;
  }
  .item_body{
    display: flex;
    line-height: 25px;
  }
  .item__left,.item__right{
    flex: 1;
    color: #333333;
  }
  .new_data,.all_data{
    font-size: 16px;
    color: #F44336;
    letter-spacing: 0;
  }
  .item_foot{
    color: #333333;
    line-height: 25px;
  }
</style>
