<template>
  <el-config-provider :locale="store.getters.language === 'en' ? en : zhCn">
    <router-view />
  </el-config-provider>
</template>
<script setup>
import { writeNewStyle, generateNewStyle } from '@/utils/theme.js'
import { useStore } from 'vuex'
import { watchSwitchLanguage } from '@/utils/i18n'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

const store = useStore()

generateNewStyle(store.getters.mainColor).then((newStyle) => {
  writeNewStyle(newStyle)
})

watchSwitchLanguage(() => {
  store.dispatch('user/getUserInfo')
})
</script>
<style lang="scss"></style>
