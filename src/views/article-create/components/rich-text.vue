<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">
        {{ $t('msg.article.commit') }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import E from 'wangeditor'
import i18next from 'i18next'
import { useStore } from 'vuex'
import { createMarkdown, editMarkdown } from './commit'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
// 接收数据
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})

const emits = defineEmits(['onSuccess'])

let el
let editor

const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  // 国际化处理
  editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}

onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})

// 创建文章
const onSubmitClick = async () => {
  if (props?.detail?._id) {
    await createMarkdown({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html()
    })
  } else {
    await editMarkdown({
      title: props.title,
      content: editor.txt.html()
    })
  }

  editor.txt.html('')
  emits('onSuccess')
  router.push('/article/ranking')
}

// 判断是否是编辑
watch(
  () => props.detail,
  (val) => {
    if (val?.content) {
      editor.txt.html(val.content)
    }
  },
  {
    imediate: true
  }
)
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
