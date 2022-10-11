<template>
  <div class="article-detail-container">
    <!-- 标题 -->
    <h2 class="title">{{ detailData.title }}</h2>
    <!-- 头部 -->
    <div class="header">
      <span class="author">
        {{ $t('msg.article.author') }}：{{ detailData.author }}
      </span>
      <span class="time">
        {{ $t('msg.article.publicDate') }}：{{
          $filters.relativeTime(detailData.publicDate)
        }}
      </span>
      <el-link class="edit" @click="onEditClick">
        {{ $t('msg.article.edit') }}
      </el-link>
    </div>
    <!-- 内容 -->
    <div class="content" v-html="detailData.content"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { articleDetail } from '@/api/article'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const detailData = ref({})
const getData = async () => {
  detailData.value = await articleDetail(route.params.id)
}
getData()
// 编辑
const onEditClick = () => {
  router.push(`/article/editor/${route.params.id}`)
}
</script>

<style lang="scss" scoped>
.article-detail-container {
  .title {
    font-size: 22px;
    text-align: center;
    padding: 12px 0;
  }
  .header {
    padding: 26px 0;
    .author {
      font-size: 14px;
      color: #555666;
      margin-right: 20px;
    }
    .time {
      font-size: 14px;
      color: #999aaa;
      margin-right: 20px;
    }
    .edit {
      float: right;
    }
  }
  .content {
    font-size: 14px;
    padding: 20px 0;
    border-top: 1px solid #d4d4d4;
  }
}
</style>
