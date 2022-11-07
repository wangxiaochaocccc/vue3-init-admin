<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <s2-vue />
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
import { getChartRegions } from '@/api/chart'
import { ref } from 'vue'
import { watchSwitchLanguage } from '@/utils/i18n'

// 获取大区数据
const regionsData = ref([])
const getRegion = async () => {
  const { regions } = await getChartRegions()
  regionsData.value = regions
}
getRegion()
watchSwitchLanguage(getRegion)
// 切换大区
const currentIndex = ref(0)
const changeCurrentIndex = (index) => {
  currentIndex.value = index
}
</script>
<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
</style>
