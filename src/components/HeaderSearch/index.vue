<template>
  <div class="header-search" :class="{ show: isShow }">
    <div @click="handleShowSearch" class="svg-container" id="guide-search">
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
      @change="handleChangeSelected"
    >
      <el-option
        v-for="item in searchArr"
        :key="item.item.path"
        :label="item.item.title.join('>')"
        :value="item.item"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { filterRoutes } from '@/utils/router'
import { generateRoutes } from './fuse'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { watchSwitchLanguage } from '@/utils/i18n'

// 数据源
const router = useRouter()
let searchPool = computed(() => {
  const filterRoutesArr = filterRoutes(router.getRoutes())
  return generateRoutes(filterRoutesArr)
})
// 模糊搜索 fuse配置
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)
// 是否展示下拉
const isShow = ref(false)
const handleShowSearch = () => {
  isShow.value = !isShow.value
}
// 监听isShow
watch(
  () => isShow,
  (val) => {
    if (val) {
      document.body.addEventListener('click', onClose)
    } else {
      document.body.removeEventListener('click', onClose)
    }
  }
)
// 关闭搜索框
const headerSearchSelectRef = ref(null)
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchArr.value = []
}
// 搜索数据
const searchVal = ref('')
// 获取下拉框内容
const searchArr = ref([])
const querySearch = (query) => {
  searchArr.value = fuse.search(query)
}
// 点击搜索出来的结果
const handleChangeSelected = (val) => {
  router.push(val.path)
}
// 国际化处理
watchSwitchLanguage(() => {
  searchPool = computed(() => {
    const filterRoutesArr = filterRoutes(router.getRoutes())
    return generateRoutes(filterRoutesArr)
  })
  initFuse(searchPool.value)
})
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
