<template>
  <div id="app" @touchmove.prevent>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'app'
  }
</script>

<style>

</style>
