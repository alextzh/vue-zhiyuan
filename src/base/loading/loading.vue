<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif" alt="">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .loading{
    width: 100%;
    text-align: center;
  }
</style>
