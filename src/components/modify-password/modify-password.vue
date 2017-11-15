<template>
  <transition name="slide">
    <navbar title="修改密码" @back="back" @close="close"></navbar>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar'

  export default{
    name: 'modifyPassword',
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
