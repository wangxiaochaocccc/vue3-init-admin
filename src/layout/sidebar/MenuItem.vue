<template>
  <!-- <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i> -->
  <svg-icon :icon="icon"></svg-icon>
  <span>{{ genarateTitle(title) }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
import { genarateTitle } from '@/utils/i18n'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
</style>
