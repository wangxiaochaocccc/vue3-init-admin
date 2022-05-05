<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="item.path">
      <span class="no-redirect" v-if="index === breadcrumb.length - 1">{{ item.meta.title }}</span>
      <span class="redirect" v-else @click="lintTOHandle(item)">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const breadcrumb = ref([])

const getBreadCrumb = () => {
  breadcrumb.value = route.matched.filter(item => item.meta?.title)
}
watch(
  route,
  () => {
    getBreadCrumb()
  }, { immediate: true }
)

// 跳转
const router = useRouter()
const lintTOHandle = item => {
  router.push(item.path)
}
</script>
<style lang='scss'>
.breadcrumb {
  display: inline-block;
  font-size: 14px;

  .redirect {
    color: #666;
    font-weight: bold;
    cursor: pointer;
  }

  .no-redirect {
    color: #97a8be;
  }
}
</style>
