<template>
  <el-card :body-style="{ padding: 0 }">
    <div class="container" ref="target"></div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLanguage } from '@/utils/i18n'
import { getChartWordCloud } from '@/api/chart'
import * as echarts from 'echarts'
import { renderRGB } from '@/utils/color'
import 'echarts-wordcloud'
import wordcloudBg from '@/assets/wordcloud.png'

const i18n = useI18n()
let mChart
const target = ref(null)

onMounted(() => {
  mChart = echarts.init(target.value)
})
// 数据
const wordData = ref([])
// 获取数据
const getData = async () => {
  const res = await getChartWordCloud()
  wordData.value = res
  renderChart()
}
getData()

// 渲染echart
const renderChart = () => {
  const maskImage = new Image()
  maskImage.src = wordcloudBg

  const options = {
    title: {
      text: i18n.t('msg.chart.cloudChartTitle')
    },
    series: {
      // 类型
      type: 'wordCloud',
      // 数据映射文本的大小范围
      sizeRange: [4, 80],
      // 文字旋转范围
      rotationRange: [0, 0],
      // 单词之间的间距
      gridSize: 0,
      // 渲染动画
      layoutAnimation: true,
      // 字体
      textStyle: {
        // 随机色值
        color: renderRGB
      },
      // 背景轮廓
      maskImage,
      // 高亮字体
      emphasis: {
        textStyle: {
          fontWeight: 'bold',
          color: '#000'
        }
      },
      top: 30,
      // 数据
      data: wordData.value
    }
  }
  maskImage.onload = () => {
    mChart.setOption(options)
  }
}
// 国际化
watchSwitchLanguage(getData)
</script>
<style lang="scss" scoped>
.container {
  // background-color: #bcbfc3;
  height: 240px;
}
</style>
