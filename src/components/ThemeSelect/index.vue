<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <div>
      <el-tooltip :content="$t('msg.theme.themeChange')">
        <el-button>
          <svg-icon id="guide-theme" icon="change-theme"></svg-icon>
        </el-button>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-item command="color">
        {{ $t('msg.theme.themeColorChange') }}
      </el-dropdown-item>
    </template>
  </el-dropdown>
  <select-color v-model="selectColorVisible"></select-color>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/SelectColor.vue'

const selectColorVisible = ref(false)
const handleSetTheme = () => {
  selectColorVisible.value = true
}
</script>
<style lang="scss">
.theme {
  .el-button {
    border: none;
    background-color: none;
    --el-button-hover-bg-color: none;
    padding-right: 0;
    padding-left: 0;
  }

  .svg-icon {
    display: inline-block;
    font-size: 24px;
    width: 20px;
    height: 20px;
  }
}
</style>
