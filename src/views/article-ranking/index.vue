<template>
  <div class="article-ranking-container">
    <el-card>
      <el-table :data="tableData" border>
        <el-table-column
          :label="$t('msg.article.ranking')"
          prop="ranking"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.title')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.author')"
          prop="author"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.publicDate')"
          prop="publicDate"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.desc')"
          prop="desc"
        ></el-table-column>
        <el-table-column :label="$t('msg.article.action')">
          <template #default>
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
import { ref } from 'vue'
import { getArticleList } from '@/api/article'

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
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>
