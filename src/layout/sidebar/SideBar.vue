<template>
  <el-menu
    :default-active="activeMenu"
    class="el-menu-vertical-demo"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :unique-opened="true"
    router
    :collapse="!$store.getters.sidebarOpened"
  >
    <side-bar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></side-bar-item>
  </el-menu>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/router'
import { computed } from 'vue'
import SideBarItem from './SideBarItem.vue'

const router = useRouter()
const routes = computed(() => {
  const filterR = filterRoutes(router.getRoutes())
  return generateMenus(filterR)
})
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
console.log(routes.value)
</script>
<style lang="scss"></style>
