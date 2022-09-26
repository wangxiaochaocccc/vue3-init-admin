<template>
  <div>
    <el-card>
      <el-table
        :data="allPermission"
        style="width: 100%"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          prop="permissionName"
          :label="$t('msg.permission.name')"
        ></el-table-column>
        <el-table-column
          prop="permissionMark"
          :label="$t('msg.permission.mark')"
        ></el-table-column>
        <el-table-column
          prop="permissionDesc"
          :label="$t('msg.permission.desc')"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getPermissionList } from '@/api/permission'
import { watchSwitchLanguage } from '@/utils/i18n'

// 获取数据
const allPermission = ref([])
const getData = async () => {
  allPermission.value = await getPermissionList()
}
getData()
watchSwitchLanguage(getData)
</script>

<style lang="scss" scoped></style>
