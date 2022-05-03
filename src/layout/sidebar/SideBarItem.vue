<template>
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </template>
    <side-bar-item v-for="item in route.children" :key="item.path" :route="item"></side-bar-item>
  </el-sub-menu>
  <el-menu-item :index="route.path" v-else>
    <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue'
import MenuItem from './MenuItem.vue'

defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>
<style lang='scss'>
</style>
