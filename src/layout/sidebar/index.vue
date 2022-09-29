<template>
  <div>
    <div class="logo-conatiner">
      <el-avatar :size="44" shape="square" src="/logo.jpeg"></el-avatar>
      <div class="title" v-if="$store.getters.sidebarOpened">my-admin</div>
    </div>
    <el-scrollbar>
      <side-bar></side-bar>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SideBar from './SideBar.vue'
</script>
<style lang="scss">
.logo-conatiner {
  height: 44px;
  padding: 10px 0 22px;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    margin-left: 10px;
  }
}
</style>
