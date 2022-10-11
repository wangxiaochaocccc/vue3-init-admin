<template>
  <div class="markdown-container">
    <!-- markdown渲染去 -->
    <div id="markdown-box"></div>
    <!-- 底部按钮 -->
    <div class="bottom-box">
      <el-button type="primary" @click="onCommit">
        {{ $t('msg.article.commit') }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import { watchSwitchLanguage } from '@/utils/i18n'
import { createMarkdown } from './commit'

const store = useStore()

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
// markdown实例
let mk

let el
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initMarkdown()
})

const initMarkdown = () => {
  mk = new MkEditor({
    el,
    height: '500px',
    previewStyle: 'vertical',
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  mk.getMarkdown()
}

// 国际化处理
watchSwitchLanguage(() => {
  if (!el) return
  mk.destroy()
  const htmlStr = mk.getHTML()
  initMarkdown()
  mk.setHTML(htmlStr)
})

const emits = defineEmits(['onSuccess'])
// 提交
const onCommit = async () => {
  await createMarkdown({
    title: props.title,
    content: mk.getHTML()
  })
  mk.reset()
  emits('onSuccess')
}
</script>
<style lang="scss" scoped>
.bottom-box {
  margin-top: 20px;
  text-align: right;
}
</style>
