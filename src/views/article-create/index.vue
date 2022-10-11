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
          <markdown />
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <rich-text />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import markdown from './components/markdown.vue'
import RichText from './components/rich-text.vue'
import { ref } from 'vue'

const title = ref('')
const activeName = ref('markdown')
</script>

<style lang="scss" scoped>
.input-title {
  margin-bottom: 20px;
}
</style>
