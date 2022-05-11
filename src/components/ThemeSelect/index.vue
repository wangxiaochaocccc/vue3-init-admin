<template>
  <el-dropdown v-bind="$attrs" trigger="click" class="theme" @command="handleSetTheme">
    <div>
      <el-tooltip :content="$t('msg.theme.themeChange')">
        <el-button>
          <svg-icon icon="change-theme"></svg-icon>
        </el-button>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-item command="color">{{ $t('msg.theme.themeColorChange') }}</el-dropdown-item>
    </template>
  </el-dropdown>
</template>

<script setup>

const handleSetTheme = () => { }
</script>
<style lang='scss'>
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
    width: 20px;
    height: 20px;
  }
}
</style>
