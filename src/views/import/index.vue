<template>
  <div>
    <upload-excel :onSuccess="onSuccess" />
  </div>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel/index.vue'
import { useBatchImport } from '@/api/user-manage'
import { USER_RELATIONS, formatDate } from './utils'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const i18n = useI18n()
const onSuccess = async ({ results }) => {
  const updateData = generateData(results)
  await useBatchImport(updateData)
  ElMessage.success(results.length + i18n.t('msg.excel.importSuccess'))
  router.push('/user/manage')
}

// 删选数据
const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userinfo = {}
    Object.keys(item).forEach((key) => {
      if (USER_RELATIONS[key] === 'openTime') {
        userinfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userinfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userinfo)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
