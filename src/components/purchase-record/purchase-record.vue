<template>
  <transition name="slide">
    <navbar title="申购记录" @back="back" @close="close"></navbar>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar'

  export default {
    name: 'purchaseRecord',
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

<style scoped>

</style>
