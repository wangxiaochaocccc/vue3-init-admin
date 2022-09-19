<template>
  <el-dropdown class="international" trigger="click" @command="handleLangClick">
    <div>
      <el-tooltip class="box-item" :effect="effect" content="国际化">
        <el-button>
          <svg-icon id="guide-lang" icon="language"></svg-icon>
        </el-button>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
const store = useStore()

// tooptip主题
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})
const language = computed(() => {
  return store.getters.language
})

// 切换语言方法
const i18n = useI18n()
const handleLangClick = (lang) => {
  i18n.locale.value = lang
  store.commit('app/setLanguage', lang)
  ElMessage.success('切换成功')
}
</script>
<style lang="scss">
.international {
  .el-button {
    border: none;
    background-color: none;
    --el-button-hover-bg-color: none;
  }

  .svg-icon {
    display: inline-block;
    font-size: 24px;
    width: 20px;
    height: 20px;
  }
}
</style>
