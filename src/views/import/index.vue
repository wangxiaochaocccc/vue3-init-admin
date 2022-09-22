<template>
  <div>
    <upload-excel :onSuccess="onSuccess" />
  </div>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel/index.vue'
import { useBatchImport } from '@/api/user-manage'
import { USER_RELATIONS } from './utils'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const onSuccess = async ({ results }) => {
  const updateData = generateData(results)
  await useBatchImport(updateData)
  ElMessage.success(results.length + i18n.t('msg.excel.importSuccess'))
}

// 删选数据
const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userinfo = {}
    Object.keys(item).forEach((key) => {
      userinfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userinfo)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
