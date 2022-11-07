<template>
  <el-card :body-style="{ padding: 0 }">
    <div ref="target" class="container"></div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getChartPie } from '@/api/chart'
import * as echarts from 'echarts'
import { watchSwitchLanguage } from '@/utils/i18n'

const i18n = useI18n()

// 初始化echart
let mChart
const target = ref(null)

onMounted(() => {
  mChart = echarts.init(target.value)
})
// 数据
const pieData = ref([])
// 获取数据
const getData = async () => {
  const res = await getChartPie()
  pieData.value = res
  renderChart()
}
getData()

// 渲染eahart
const renderChart = () => {
  const options = {
    title: {
      text: i18n.t('msg.chart.pieChartTitle')
    },
    tooltip: {
      trigger: 'item',
      formatter: `{b}:{c} ${i18n.t('msg.chart.unit')}`
    },
    series: {
      type: 'pie',
      radius: ['40%', '70%'],
      // 每个 item 的样式
      itemStyle: {
        // 圆角
        borderRadius: 10,
        // 边框色
        borderColor: '#fff',
        // 边框宽度
        borderWidth: 2
      },
      // 文字
      label: {
        // 默认不显示
        show: false,
        // {b}：数据名。{d}：百分比。
        formatter: '{b}: {d}%',
        // 居中展示（在鼠标移入时）
        position: 'center'
      },
      // 高亮状态的扇区和标签样式
      emphasis: {
        // 文本
        label: {
          show: true,
          fontSize: '22',
          fontWeight: 'bold'
        }
      },
      data: pieData.value
    }
  }
  mChart.setOption(options)
}
watchSwitchLanguage(getData)
</script>
<style lang="scss" scoped>
.container {
  // background-color: #bcbfc3;
  height: 240px;
}
</style>
