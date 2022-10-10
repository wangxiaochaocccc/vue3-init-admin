<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
      <el-checkbox-group v-model="selectedData">
        <el-checkbox
          v-for="(item, index) in dynamicData"
          :key="index"
          :label="item.label"
        ></el-checkbox>
      </el-checkbox-group>
    </el-card>
    <el-card>
      <el-table :data="tableData" border ref="tableRef">
        <el-table-column
          v-for="(item, index) in renderData"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <template #default="{ row }" v-if="item.prop === 'publicDate'">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
          <template #default="{}" v-else-if="item.prop === 'action'">
            <el-button type="primary" size="small">
              {{ $t('msg.article.show') }}
            </el-button>
            <el-button type="danger" size="small">
              {{ $t('msg.article.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 50]"
        :page-size="size"
        :total="total"
        layout="total,sizes,prev,pager,next,jumper"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getArticleList } from '@/api/article'
import { selectedData, dynamicData, renderData } from './dynamic/index'
import { tableRef, initSoreable } from './sorttable'
// 数据相关
const tableData = ref([])
const page = ref(1)
const total = ref(0)
const size = ref(10)

const getTableData = async () => {
  const res = await getArticleList({
    page: page.value,
    size: size.value
  })
  total.value = res.total
  tableData.value = res.list
}
getTableData()

// size改变
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getTableData()
}
// page改变
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getTableData()
}
// 初始化拖拽
onMounted(() => {
  initSoreable()
})
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .header {
    margin-bottom: 20px;
    ::v-deep .el-card__body {
      display: flex;
      align-items: center;
    }
    .title {
      font-size: 14px;
      font-weight: bold;
      display: inline-block;
      margin-right: 10px;
    }
  }
}
:deep(.sortable-container) {
  opacity: 0.6;
  color: #fff !important;
  background-color: #304156 !important;
}
</style>
