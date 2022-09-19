<template>
  <router-view />
</template>
<script setup>
import { writeNewStyle, generateNewStyle } from '@/utils/theme.js'
import { useStore } from 'vuex'
import { watchSwitchLanguage } from '@/utils/i18n'

const store = useStore()

generateNewStyle(store.getters.mainColor).then((newStyle) => {
  writeNewStyle(newStyle)
})

watchSwitchLanguage(() => {
  store.dispatch('user/getUserInfo')
})
</script>
<style lang="scss"></style>
