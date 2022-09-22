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
import { USER_RELATIONS } from './utils'

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
  // 导入工具包
  const excel = await import('@/utils/export2Excel')
  const data = formatJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: excelName.value || defaultName,
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: 'xlsx'
  })

  close()
}
// 数组转化为二维数组
const formatJson = (headers, rows) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]

        return JSON.stringify(roles.map((role) => role.title))
      }
      return item[headers[key]]
    })
  })
}
</script>
<style lang="scss"></style>
