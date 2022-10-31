<template>
  <div class="create-article-container">
    <el-card>
      <el-input
        type="text"
        class="input-title"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      />
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <markdown
            :title="title"
            @onSuccess="onSuccess"
            :detail="detailData"
          />
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <rich-text
            :title="title"
            @onSuccess="onSuccess"
            :detail="detailData"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import markdown from './components/markdown.vue'
import RichText from './components/rich-text.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { articleDetail } from '@/api/article'

const title = ref('')
const activeName = ref('markdown')

const route = useRoute()
const articleId = route.params.id
// 获取文章详情
const detailData = ref({})
const getArticleDetail = async () => {
  detailData.value = await articleDetail(articleId)
  title.value = detailData.value.title
}
if (articleId) {
  getArticleDetail()
}
// 提交完成
const onSuccess = () => {
  title.value = ''
}
</script>

<style lang="scss" scoped>
.input-title {
  margin-bottom: 20px;
}
</style>
