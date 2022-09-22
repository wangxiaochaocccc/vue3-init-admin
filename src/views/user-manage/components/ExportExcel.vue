<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="close"
  >
    <div>
      <el-input
        v-model="excelName"
        :placeholder="$t('msg.excel.placeholder')"
      ></el-input>
    </div>
    <template #footer>
      <el-button @click="close">{{ $t('msg.excel.close') }}</el-button>
      <el-button @click="confirm" type="primary" :loading="loading">
        {{ $t('msg.excel.confirm') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { watchSwitchLanguage } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'

const i18n = useI18n()

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

// 默认名称
let defaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = defaultName
watchSwitchLanguage(() => {
  defaultName = i18n.t('msg.excel.defaultName')
  excelName.value = defaultName
})

const emits = defineEmits(['update:modelValue'])
// 关闭
const close = () => {
  emits('update:modelValue', false)
}

// 导出
const loading = ref(false)
const confirm = async () => {
  loading.value = true
  const allUser = (await getUserManageAllList()).list
  console.log(allUser)
  close()
}
</script>
<style lang="scss"></style>
