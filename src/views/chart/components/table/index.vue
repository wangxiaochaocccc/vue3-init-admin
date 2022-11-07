<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <s2-vue :data="sheetData" v-if="sheetData" />
    </el-col>
    <el-col :span="6">
      <sheet-table
        :data="item"
        :isSelected="currentIndex === index"
        v-for="(item, index) in regionsData"
        :key="item.id"
        class="mb-20"
        @click="changeCurrentIndex(index)"
      />
    </el-col>
  </el-row>
</template>

<script setup>
import S2Vue from './components/s2.vue'
import SheetTable from './components/sheet-table.vue'
import { getChartRegions, getChartSheet } from '@/api/chart'
import { ref } from 'vue'
import { watchSwitchLanguage } from '@/utils/i18n'

// 获取大区数据
const regionsData = ref([])
const getRegion = async () => {
  const { regions } = await getChartRegions()
  regionsData.value = regions
  getChartSheet1(regionsData.value[0].id)
}
getRegion()
watchSwitchLanguage(getRegion)
// 切换大区
const currentIndex = ref(0)
const changeCurrentIndex = (index) => {
  currentIndex.value = index
  // 获取对应大区数据
  getChartSheet1(regionsData.value[currentIndex.value].id)
}
// 获取大区对应的数据
const sheetData = ref([])

const getChartSheet1 = async (id) => {
  const res = await getChartSheet(id)
  sheetData.value = res
}
</script>
<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
</style>
