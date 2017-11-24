<template>
  <transition name="slide">
    <div class="m-container">
      <navbar title="赎回记录" @back="back" @close="close"></navbar>
      <div class="list">
        <scroll ref="scroll" class="scroll_list"
                v-if="redeemRecord.length > 0"
                :scrollbar="scrollbarObj"
                :pullDownRefresh="pullDownRefreshObj"
                :pullUpLoad="pullUpLoadObj"
                :startY="parseInt(startY)"
                @pullingDown="onPullingDown"
                @pullingUp="onPullingUp">
          <li class="item" v-for="(item, index) in redeemRecord" :key="index">
            <div class="item_head">
              <i class="iconfont icon-item"></i>
              <span class="title">{{item.product_name}}</span>
              <span class="item_state" style='color: #388e3c;' v-if="item.redeem_status === '审核通过'">{{item.redeem_status}}</span>
              <span class="item_state" style='color: #01579b;' v-if="item.redeem_status === '已处理'">{{item.redeem_status}}</span>
              <span class="item_state" style='color: #F44336;' v-if="item.redeem_status === '待审核'">{{item.redeem_status}}</span>
            </div>
            <div class="item_body">
              <div class="item__left">
                <span>赎回份额：</span>
                <span class="new_data">{{item.money}}万份</span>
              </div>
              <div class="item__right">
                <span>赎回时间：</span>
                <span class="all_data">{{item.redeem_time}}</span>
              </div>
            </div>
          </li>
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
  import Navbar from 'base/navbar/navbar'
  import { MessageBox } from 'mint-ui'
  import {rendererZhMoneyWan, _normalizeDate} from 'common/js/util'

  export default {
    name: 'redeemRecord',
    components: {
      Scroll,
      Navbar
    },
    data() {
      return {
        showBack: false,
        redeemRecord: [],
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
      this.getUserInfo()
    },
    mounted() {
      setTimeout(() => {
        this._getRedeemRecord()
      }, 20)
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
      _getRedeemRecord() {
        this.pageData.page = 1
        this.$http.getRedeemRecord(this.pageData).then((res) => {
          if (!res.ret) {
            MessageBox('提示', res.msg)
            this.hasData = true
            return false
          }
          this.totalPage = res.obj.totalPage
          let list = res.obj.list
          this.redeemRecord = this._normalizeList(list)
          setTimeout(() => {
            this.$refs.scroll.forceUpdate()
          }, 20)
        })
      },
      _getMoreRedeemRecord() {
        this.pageData.page = this.pageData.page + 1
        if (this.pageData.page > this.totalPage) {
          // 如果没有新数据
          setTimeout(() => {
            this.$refs.scroll.forceUpdate()
          }, 20)
        } else {
          this.$http.getRedeemRecord(this.pageData).then((res) => {
            if (!res.ret) {
              MessageBox('提示', res.msg)
              this.hasData = true
              return false
            }
            let list = res.obj.list
            this.redeemRecord = this.redeemRecord.concat(this._normalizeList(list))
            setTimeout(() => {
              this.$refs.scroll.forceUpdate()
            }, 20)
          })
        }
      },
      onPullingDown() {
        // 更新数据
        this._getRedeemRecord()
      },
      onPullingUp() {
        // 加载更多数据
        this._getMoreRedeemRecord()
      },
      _normalizeList(list) {
        if (list === []) {
          return []
        } else {
          for (let i = 0; i < list.length; i++) {
            list[i].redeem_time = _normalizeDate(list[i].redeem_time)
            list[i].money = rendererZhMoneyWan(list[i].money)
          }
          return list
        }
      }
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
</style>
