<template>
  <el-card class="container">
    <el-row :gutter="32">
      <el-col :span="6">
        <trend-data />
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
</script>
<style lang="scss" scoped>
.container {
  background-color: #bcbfc3;
  height: 286px;
}
</style>
