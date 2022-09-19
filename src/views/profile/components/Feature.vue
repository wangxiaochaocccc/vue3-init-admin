<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item
      v-for="item in featureData"
      :key="item.id"
      :name="item.id"
      :title="item.title"
    >
      <div v-html="item.content"></div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  featureData: {
    type: Array,
    required: true
  }
})

const activeName = ref(0)
</script>
<style lang="scss"></style>
