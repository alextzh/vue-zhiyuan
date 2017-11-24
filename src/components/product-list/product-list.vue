<template>
  <transition name="slide">
    <div class="m-container">
      <navbar title="产品列表" :showBack="showBack" @close="close"></navbar>
      <div class="list">
        <scroll ref="scroll" class="scroll_list"
                v-if="productList.length > 0"
                :scrollbar="scrollbarObj"
                :pullDownRefresh="pullDownRefreshObj"
                :pullUpLoad="pullUpLoadObj"
                :startY="parseInt(startY)"
                @pullingDown="onPullingDown"
                @pullingUp="onPullingUp">
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
        </scroll>
        <div v-if="hasData">
          <div class="no_data">
            <i class="iconfont icon-nodata"></i>
          </div>
        </div>
      </div>
      <tabbar></tabbar>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Tabbar from 'base/tabbar/tabbar'
  import Navbar from 'base/navbar/navbar'
  import { MessageBox } from 'mint-ui'
  import {rendererZhMoneyWan, _normalizeDate} from 'common/js/util'

  export default{
    name: 'productList',
    data() {
      return {
        showBack: false,
        select: 'tab1',
        productList: [],
        pageData: {
          page: 1,
          rows: 5
        },
        scrollbar: true,
        scrollbarFade: true,
        pullDownRefresh: true,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 60,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多数据了',
        startY: 0,
        hasData: false,
        totalPage: 0
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
    },
    mounted() {
      setTimeout(() => {
        this._getProductList()
      }, 20)
    },
    methods: {
      close() {
        sessionStorage.clear()
        this.$router.push({
          path: '/login'
        })
      },
      _getProductList() {
        this.pageData.page = 1
        this.$http.getProductList(this.pageData).then((res) => {
          if (!res.ret) {
            MessageBox('提示', res.msg)
            this.hasData = true
            return false
          }
          let list = res.obj.list
          this.totalPage = res.obj.totalPage
          this.productList = this._normalizeList(list)
          setTimeout(() => {
            this.$refs.scroll.forceUpdate()
          }, 20)
        })
      },
      _getMoreProductList() {
        this.pageData.page = this.pageData.page + 1
        if (this.pageData.page > this.totalPage) {
          // 如果没有新数据
          setTimeout(() => {
            this.$refs.scroll.forceUpdate()
          }, 20)
        } else {
          this.$http.getProductList(this.pageData).then((res) => {
            if (!res.ret) {
              MessageBox('提示', res.msg)
              this.hasData = true
              return false
            }
            let list = res.obj.list
            this.productList = this.productList.concat(this._normalizeList(list))
            setTimeout(() => {
              this.$refs.scroll.forceUpdate()
            }, 20)
          })
        }
      },
      onPullingDown() {
        // 更新数据
        this._getProductList()
      },
      onPullingUp() {
        // 加载更多数据
        this._getMoreProductList()
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
      Scroll,
      Tabbar,
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
    background: #f4f4f4;
  }
  .list{
    position: fixed;
    top: 40px;
    bottom: 50px;
    width: 100%;
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
