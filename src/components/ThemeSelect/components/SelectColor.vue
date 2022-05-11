<template>
  <el-dialog @close="closed" :title="$t('msg.universal.title')" width="22%" :model-value="modelValue">
    <div class="center">
      <div class="title">{{ $t('msg.theme.themeColorChange') }}</div>
      <el-color-picker v-model="mycolor" :predefine="predefineColors"></el-color-picker>
    </div>
    <template #footer>
      <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
      <el-button type="primary" @click="confirm">{{ $t('msg.universal.confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
// 初始色值
const mycolor = ref(store.getters.mainColor)

// 预定义色值
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]

const emits = defineEmits(['update:modelValue'])

const closed = () => {
  emits('update:modelValue', false)
}

const confirm = () => {
  store.commit('theme/setThemeColor', mycolor.value)
  closed()
}
</script>
<style lang='scss'>
.center {
  text-align: center;

  .title {
    margin-bottom: 12px;
  }
}
</style>
