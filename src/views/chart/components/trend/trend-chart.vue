<template>
  <div class="trend-chart-container" ref="target"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLanguage } from '@/utils/i18n'

const i18n = useI18n()
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

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
    // 鼠标移入提示框配置
    tooltip: {
      // 鼠标移入坐标轴是，触发提示
      trigger: 'axis',
      // 提示框配置项
      axisPointer: {
        // 十字准星
        type: 'cross',
        // 样式
        crossStyle: {
          color: '#999'
        }
      }
    },
    // 图例配置
    legend: {
      // 图例数据
      data: [i18n.t('msg.chart.monthIncome'), i18n.t('msg.chart.dayIncome')],
      // 位置
      right: 0
    },
    // 网格绘制位置
    grid: {
      top: 40,
      right: 0,
      left: 0,
      bottom: 0,
      containLabel: true // 计算边距时，包含标签
    },
    // X 轴配置
    xAxis: {
      // 坐标轴类型，类目轴
      type: 'category',
      // 数据
      data: props.data.monthAmountList.map((item) => item.time),
      // 刻度尺配置
      axisTick: {
        show: false
      }
    },
    // Y 轴配置
    yAxis: {
      type: 'value',
      min: 0,
      max: function (value) {
        return parseInt(value.max * 1.2)
      },
      // 刻度上展示的文字
      axisLabel: {
        formatter: `{value} ${i18n.t('msg.chart.unit')}`
      }
    },
    // 图表类型（可以指定多个）
    series: [
      {
        // 图表名字，对应 legend.data[0]
        name: i18n.t('msg.chart.monthIncome'),
        // 图表的类型
        type: 'bar',
        // 图表的数据
        data: props.data.monthAmountList.map((item) => item.amount),
        // bar宽度
        barWidth: 20,
        // 提示框
        tooltip: {
          // 展示内容
          valueFormatter: function (value) {
            return value + i18n.t('msg.chart.unit')
          }
        }
      },
      {
        // 图表名字，对应 legend.data[0]
        name: i18n.t('msg.chart.dayIncome'),
        // 图表的类型
        type: 'line',
        color: '#6EC6D0',
        // 图表的数据
        data: props.data.dailyCurve.map((item) => item.amount),
        smooth: true,
        // 提示框
        tooltip: {
          // 展示内容
          valueFormatter: function (value) {
            return value + i18n.t('msg.chart.unit')
          }
        }
      }
    ]
  }
  mChart.setOption(options)
}

watchSwitchLanguage(renderChart)
</script>

<style lang="scss" scoped>
.trend-chart-container {
  height: 100%;
}
</style>
