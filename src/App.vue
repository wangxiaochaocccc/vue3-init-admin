<template>
  <router-view />
</template>
<script setup>
import { writeNewStyle, generateNewStyle } from '@/utils/theme.js'
import { useStore } from 'vuex'

const store = useStore()

generateNewStyle(store.getters.mainColor).then(newStyle => {
  writeNewStyle(newStyle)
})
</script>
<style lang="scss">
</style>
