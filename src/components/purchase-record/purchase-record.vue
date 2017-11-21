<template>
  <transition name="slide">
    <div class="m-container">
      <navbar title="申购记录" @back="back" @close="close"></navbar>
      <div class="list">
        <scroll ref="scroll"
                v-if="purchaseList.length > 0"
                :scrollbar="scrollbarObj"
                :pullDownRefresh="pullDownRefreshObj"
                :pullUpLoad="pullUpLoadObj"
                :startY="parseInt(startY)"
                @pullingDown="onPullingDown"
                @pullingUp="onPullingUp">
          <li class="item" v-for="(item, index) in purchaseList" :key="index">
            <div class="item_head">
              <i class="iconfont icon-item"></i>
              <span class="title">{{item.name}}</span>
              <span class="item_state" style='color: #388e3c;' v-if="item.subscribe_status === '审核通过'">{{item.subscribe_status}}</span>
              <span class="item_state" style='color: #616161;' v-if="item.subscribe_status === '赎回审核中'">{{item.subscribe_status}}</span>
              <span class="item_state" style='color: #0d47a1;' v-if="item.subscribe_status === '已赎回'">{{item.subscribe_status}}</span>
              <span class="item_state" style='color: #d84315;' v-if="item.subscribe_status === '审核拒绝'">{{item.subscribe_status}}</span>
              <span class="item_state" style='color: #F44336;' v-if="item.subscribe_status === '待审核'">{{item.subscribe_status}}</span>
            </div>
            <div class="item_body">
              <div class="item__left">
                <span>申购份额：</span>
                <span class="new_data">{{item.subscribe_money}}万份</span>
              </div>
              <div class="item__right">
                <span>申购时间：</span>
                <span class="all_data">{{item.subscribe_time}}</span>
              </div>
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
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Navbar from 'base/navbar/navbar'
  import {getPurchaseList} from 'api/api'
  import { MessageBox } from 'mint-ui'
  import {rendererZhMoneyWan, _normalizeDate} from 'common/js/util'

  export default {
    name: 'purchaseRecord',
    data() {
      return {
        showBack: false,
        purchaseList: [],
        pageData: {
          page: 1,
          rows: 4,
          customer_id: ''
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
      this.getUserInfo()
      this.$nextTick(() => {
        this._getPurchaseRecord()
      })
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
        this.pageData.customer_id = userInfo.id
      },
      _getPurchaseRecord() {
        this.pageData.page = 1
        this.hasMore = true
        getPurchaseList(this, this.pageData).then((res) => {
          if (!res.ret) {
            MessageBox('提示', res.msg)
            this.hasData = true
            return false
          }
          let totalPage = res.obj.totalPage
          let list = res.obj.list
          this.purchaseList = this._normalizeList(list)
          if ((this.pageData.page + 1) > totalPage) {
            this.hasMore = false
          }
          this.$nextTick(() => {
            this.$refs.scroll.forceUpdate()
          })
        })
      },
      _getMorePurchaseRecord() {
        this.pageData.page = this.pageData.page + 1
        getPurchaseList(this, this.pageData).then((res) => {
          if (!res.ret) {
            MessageBox('提示', res.msg)
            this.hasData = true
            return false
          }
          let totalPage = res.obj.totalPage
          let list = res.obj.list
          this.purchaseList = this.purchaseList.concat(this._normalizeList(list))
          if ((this.pageData.page + 1) > totalPage) {
            this.hasMore = false
          }
          this.$nextTick(() => {
            this.$refs.scroll.forceUpdate()
          })
        })
      },
      onPullingDown() {
        // 更新数据
        this._getPurchaseRecord()
      },
      onPullingUp() {
        // 加载更多数据
        if (!this.hasMore) {
          this.$refs.scroll.forceUpdate()
          return false
        }
        this._getMorePurchaseRecord()
      },
      _normalizeList(list) {
        if (list === []) {
          return []
        } else {
          for (let i = 0; i < list.length; i++) {
            list[i].caopan_time = _normalizeDate(list[i].caopan_time)
            list[i].subscribe_time = _normalizeDate(list[i].subscribe_time)
            list[i].subscribe_money = rendererZhMoneyWan(list[i].subscribe_money)
          }
          return list
        }
      }
    },
    components: {
      Scroll,
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
    bottom: 0;
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
