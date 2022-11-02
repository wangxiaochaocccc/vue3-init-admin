<template>
  <el-card class="container">
    <el-row :gutter="32">
      <el-col :span="6">
        <trend-data :data="chartData" v-if="chartData.allAmount" />
      </el-col>
      <el-col :span="18">
        <trend-chart />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import TrendData from './trend-data.vue'
import TrendChart from './trend-chart.vue'
import { getChartTrend } from '@/api/chart'
import { ref } from 'vue'

const chartData = ref({})
const getData = async () => {
  const res = await getChartTrend()
  chartData.value = res
}
getData()
</script>
<style lang="scss" scoped>
.container {
  // background-color: #bcbfc3;
  height: 286px;
}
</style>
