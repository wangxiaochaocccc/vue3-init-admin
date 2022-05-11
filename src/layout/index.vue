<template>
  <div class='app-container' :class="[$store.getters.sidebarOpened ? 'openSideBar' : 'hideSidebar']">
    <side-bar class="sidebar-container" :style="{ background: $store.getters.mainColor }"></side-bar>
    <div class="main-container">
      <div class="nav-bar-container">
        <nav-bar></nav-bar>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup>
import SideBar from '@/layout/sidebar'
import NavBar from '@/layout/components/NavBar.vue'
import AppMain from '@/layout/components/AppMain.vue'
// import Variable from '@/assets/styles/variable.scss'
</script>
<style lang='scss'>
@import '~@/assets/styles/mixin.scss';
@import '~@/assets/styles/variable.scss';

.app-container {
  @include clearfix;
  width: 100%;
  height: 100%;
  position: relative;

  .nav-bar-container {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width .28s;
  }
}

.hideSidebar .nav-bar-container {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
