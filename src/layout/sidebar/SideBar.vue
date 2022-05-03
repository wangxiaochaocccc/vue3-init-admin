<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <side-bar-item v-for="item in routes" :key="item.path" :route="item"></side-bar-item>
  </el-menu>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/router'
import { computed } from 'vue'
import SideBarItem from './SideBarItem.vue'

const router = useRouter()
const routes = computed(() => {
  const filterR = filterRoutes(router.getRoutes())
  return generateMenus(filterR)
})
console.log(routes.value)
</script>
<style lang='scss'>
</style>
