<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <div @click="handleStartGuide" id="guide-start">
        <svg-icon icon="guide" />
      </div>
    </el-tooltip>
  </div>
</template>

<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import steps from '@/utils/steps'

const i18n = useI18n()

let driver = null
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})
// 开始引导
const handleStartGuide = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>
<style lang="scss" scoped></style>
