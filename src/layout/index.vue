<template>
  <div
    class="app-container"
    :class="[$store.getters.sidebarOpened ? 'openSideBar' : 'hideSidebar']"
  >
    <side-bar
      class="sidebar-container"
      id="guide-sidebar"
      :style="{ background: $store.getters.cssVar.menuBg }"
    ></side-bar>
    <div class="main-container">
      <div class="nav-bar-container">
        <nav-bar></nav-bar>
        <tags-view id="guide-tags" />
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup>
import SideBar from '@/layout/sidebar'
import NavBar from '@/layout/components/NavBar.vue'
import AppMain from '@/layout/components/AppMain.vue'
import TagsView from '@/components/TagsView/index.vue'
// import Variable from '@/assets/styles/variable.scss'
</script>
<style lang="scss">
@import '~@/assets/styles/mixin.scss';
@import '~@/assets/styles/variable.scss';

.app-container {
  @include clearfix;
  width: 100%;
  height: 100%;
  position: relative;

  .nav-bar-container {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;
    width: 100%;
    transition: width 0.28s;
  }
}

.hideSidebar .nav-bar-container {
  width: 100%;
}
.hideSidebar .main-container {
  margin-left: 54px !important;
}
</style>
