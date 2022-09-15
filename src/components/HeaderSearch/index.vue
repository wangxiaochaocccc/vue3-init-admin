<template>
  <div class="header-search" :class="{ show: isShow }">
    <div @click="handleShowSearch" class="svg-container">
      <svg-icon icon-class-name="search-icon" icon="search"></svg-icon>
    </div>

    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="searchVal"
      filterable
      remote
      default-first-option
      placeholder="Search"
      :remote-method="querySearch"
    ></el-select>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 是否展示下拉
const isShow = ref(false)
const handleShowSearch = () => {
  isShow.value = !isShow.value
}
// 搜索数据
const searchVal = ref('')
// 获取下拉框内容
const querySearch = () => {}
</script>
<style lang="scss" scoped>
.header-search {
  display: flex !important;
  align-items: center;
  font-size: 0 !important;
  ::v-deep .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__wrapper {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
    ::v-deep .is-focus.el-input__wrapper {
      box-shadow: none !important;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
