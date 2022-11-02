<template>
  <div class="trend-chart-container" ref="target"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

const target = ref(null)
let mChart
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})

/**
 * 图表渲染方法
 */
const renderChart = () => {
  const options = {
    // 图表标题配置
    title: {
      // 标题文本
      text: 'ECharts 入门示例'
    },
    // 图例配置
    legend: {
      // 图例数据
      data: ['销量']
    },
    // X 轴配置
    xAxis: {
      // 数据
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    // Y 轴配置
    yAxis: [{}],
    // 图表类型（可以指定多个）
    series: [
      {
        // 图表名字，对应 legend.data[0]
        name: '销量',
        // 图表的类型
        type: 'bar',
        // 图表的数据
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  }
  mChart.setOption(options)
}
</script>

<style lang="scss" scoped>
.trend-chart-container {
  height: 100%;
}
</style>
