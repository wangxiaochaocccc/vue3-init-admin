<template>
  <el-dialog :title="$t('msg.excel.title')" :model-value="modelValue">
    <div>
      <el-input :placeholder="$t('msg.excel.placeholder')"></el-input>
    </div>
    <template #footer>
      <el-button @click="close">{{ $t('msg.excel.close') }}</el-button>
      <el-button @click="confirm" type="primary">
        {{ $t('msg.excel.confirm') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])
// 关闭
const close = () => {
  emits('update:modelValue', false)
}
// 导出
const confirm = () => {
  close()
}
</script>
<style lang="scss"></style>
