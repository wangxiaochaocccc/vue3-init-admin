<template>
  <div>用户详情</div>
</template>

<script setup>
import { userDetail } from '@/api/user-manage'
import { ref } from 'vue'
import { watchSwitchLanguage } from '@/utils/i18n'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
// 获取数据
const detailData = ref({})
const getData = async () => {
  detailData.value = await userDetail(props.id)
}
getData()
watchSwitchLanguage(getData)
</script>

<style lang="scss" scoped></style>
