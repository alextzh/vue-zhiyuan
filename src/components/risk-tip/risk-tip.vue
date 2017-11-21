<template>
  <transition name="slide">
    <div class="m-container">
      <navbar title="风险提示" @back="back" @close="close"></navbar>
      <div class="risk">
        <h3 class="risk_title">投资有风险 理财需谨慎</h3>
        <p class="risk_content">投资有风险，当您/贵单位进行投资时，可能获得投资收益，但同时也面临着投资风险，比如资金损失风险、运营风险、流动性风险等。您/贵单位在做出投资决策之前，请仔细阅读相关风险揭示书和投资协议、公司章程或者合伙协议等文件，充分认识投资的风险收益特征和产品特征，认真考虑可能存在的各项风险因素，并充分考虑自身的风险承受能力，理性判断并谨慎做出投资决策。</p>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar'

  export default {
    name: 'riskTip',
    methods: {
      back() {
        this.$router.back()
      },
      close() {
        sessionStorage.clear()
        this.$router.push({
          path: '/login'
        })
      }
    },
    components: {
      Navbar
    }
  }
</script>

<style scoped lang="scss">
  .risk{
    display: flex;
    flex-direction: column;
    padding: 15px;
  }
  .risk_title{
    line-height: 2;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: #222;
  }
  .risk_content{
    line-height: 1.5;
    color: #333;
    text-indent: 2em;
    font-size: 16px;
  }
</style>
