<template>
  <div class="">
    <trend-vue />

    <el-row class="mt-20" :gutter="20">
      <el-col :span="16">
        <horizontal-bar />
      </el-col>
      <el-col :span="8">
        <calendar-vue />
      </el-col>
    </el-row>

    <el-row class="mt-20" :gutter="20">
      <el-col :span="8">
        <div>
          <pie-vue />
        </div>
        <div class="mt-20">
          <word-cloud />
        </div>
      </el-col>
      <el-col :span="16">
        <map-vue />
      </el-col>
    </el-row>
    <table-vue class="mt-20" />
  </div>
</template>

<script setup>
import TrendVue from './components/trend/index.vue'
import HorizontalBar from './components/horizontal-bar/index.vue'
import CalendarVue from './components/calendar/index.vue'
import PieVue from './components/pie/index.vue'
import WordCloud from './components/word-cloud/index.vue'
import MapVue from './components/map/index.vue'
import TableVue from './components/table/index.vue'
</script>
<style lang="scss" scoped>
.mt-20 {
  margin-top: 20px;
}
</style>
