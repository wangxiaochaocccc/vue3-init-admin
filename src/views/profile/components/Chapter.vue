<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in chapterData"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        <h4>{{ item.content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { ref } from 'vue'
import { getChapter } from '@/api/user'
import { watchSwitchLanguage } from '@/utils/i18n'
// 获取数据
const chapterData = ref([])
const getData = async () => {
  const res = await getChapter()
  chapterData.value = res
}
getData()
// 国际化处理
watchSwitchLanguage(getData)
</script>
<style lang="scss"></style>
