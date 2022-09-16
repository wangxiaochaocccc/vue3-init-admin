<template>
  <!-- 外部图标 -->
  <div
    v-if="isExternal"
    class="svg-icon svg-external-icon"
    :style="externalIconStyle"
    :class="iconClassName"
    v-bind="$attrs"
  ></div>
  <!-- 内部图标 -->
  <svg v-else class="svg-icon" :class="iconClassName" v-bind="$attrs">
    <use :xlink:href="iconIn" />
  </svg>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { isExternal as external } from '@/utils/validate.js'
const props = defineProps({
  // icon图标
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  iconClassName: {
    type: String,
    default: ''
  }
})
// 判断是否为外部图标
const isExternal = computed(() => external(props.icon))

// 外部图标样式
const externalIconStyle = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))

// 内部图标
const iconIn = computed(() => `#icon-${props.icon}`)
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
// .svg-container {
//   display: inline;
// }
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
