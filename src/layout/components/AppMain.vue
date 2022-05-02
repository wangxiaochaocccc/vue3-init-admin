<template>
  <div class='app-main'>
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>
<style lang='scss'>
.app-main {
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  padding: 60px 20px 20px 20px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
