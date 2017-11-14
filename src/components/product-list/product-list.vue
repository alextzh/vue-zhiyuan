<template>
  <transition name="slide">
    <div class="product-list">
      <div class="close" @click="close">
        <i class="iconfont icon-guanbi"></i>
      </div>
      <h1 class="head_title">产品列表</h1>
      <div class="list">
        <scroll ref="scroll" class="scroll_list"
                v-if="productList.length > 0"
                :data="productList"
                :scrollbar="scrollbarObj"
                :pullDownRefresh="pullDownRefreshObj"
                :pullUpLoad="pullUpLoadObj"
                :startY="parseInt(startY)"
                @pullingDown="onPullingDown"
                @pullingUp="onPullingUp">
          <ul>
            <li class="item" v-for="(item, index) in productList" :key="index">
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
            </li>
          </ul>
        </scroll>
        <div v-if="hasData">
          <div class="no_data">
            <i class="iconfont icon-nodata"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import { MessageBox, Indicator } from 'mint-ui'
  import {rendererZhMoneyWan, _normalizeDate} from 'common/js/util'
  import {getProductList} from 'api/api'

  export default{
    name: 'productList',
    data() {
      return {
        productList: [],
        pageData: {
          page: 1,
          rows: 5
        },
        scrollbar: true,
        scrollbarFade: true,
        pullDownRefresh: true,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 40,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多数据了',
        startY: 0,
        hasData: false,
        hasMore: true
      }
    },
    computed: {
      scrollbarObj: function () {
        return this.scrollbar ? {fade: this.scrollbarFade} : false
      },
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop)
        } : false
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    },
    created() {
      Indicator.open('加载中...')
    },
    mounted() {
      this.$nextTick(() => {
        this._getProductList()
      })
    },
    methods: {
      close() {
        sessionStorage.clear()
        this.$router.push({
          path: '/login'
        })
      },
      _getProductList() {
        getProductList(this, this.pageData).then((res) => {
          Indicator.close()
          if (!res.ret) {
            MessageBox('提示', res.msg)
            this.hasData = true
            return false
          }
          let totalPage = res.obj.totalPage
          let list = res.obj.list
          this.productList = this.productList.concat(this._normalizeList(list))
          this.pageData.page++
          if (this.pageData.page > totalPage) {
            this.hasMore = false
          }
        })
      },
      onPullingDown() {
        // 更新数据
        this.pageData.page = 1
        this.productList = []
        this.hasMore = true
        this._getProductList()
      },
      onPullingUp() {
        // 加载更多数据
        if (!this.hasMore) {
          this.$refs.scroll.forceUpdate()
          return false
        }
        this._getProductList()
      },
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
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
    watch: {
      scrollbarObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      },
      pullDownRefreshObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      },
      pullUpLoadObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      },
      startY() {
        this.rebuildScroll()
      }
    },
    components: {
      Scroll
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
    position: fixed;
    top: 40px;
    bottom: 50px;
    width: 100%;
    overflow: hidden;
  }
  .scroll_list{
    height:100%;
    overflow: hidden;
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
