<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <s2-vue />
    </el-col>
    <el-col :span="6">
      <sheet-table v-for="item in 6" :key="item" class="mb-20" />
    </el-col>
  </el-row>
</template>

<script setup>
import S2Vue from './components/s2.vue'
import SheetTable from './components/sheet-table.vue'
</script>
<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
</style>
