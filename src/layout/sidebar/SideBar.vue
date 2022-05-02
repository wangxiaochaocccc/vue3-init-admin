<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>选项一</span>
      </template>
      <el-menu-item>选项1-1</el-menu-item>
      <el-menu-item>选项1-2</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>选项二</span>
      </template>
      <el-menu-item>选项1-1</el-menu-item>
      <el-menu-item>选项1-2</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>

</script>
<style lang='scss'>
</style>
