<template>
  <div class="hamburger-container" @click="triggerSideBar">
    <svg-icon id="guide-hamburger" :icon="iconVal"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const iconVal = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})
const triggerSideBar = () => {
  store.commit('app/triggerSideBarOpened')
}
</script>
<style lang="scss">
.hamburger-container {
  padding: 0 16px;

  .hamburger {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
}
</style>
