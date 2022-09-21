<template>
  <div>
    <upload-excel :onSuccess="onSuccess" />
  </div>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel/index.vue'

const onSuccess = (data) => {
  console.log(data)
}
</script>

<style lang="scss" scoped></style>
