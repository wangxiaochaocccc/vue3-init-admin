<template>
  <el-card>
    <el-table :data="allRole" style="width: 100%">
      <el-table-column
        type="index"
        :label="$t('msg.role.index')"
        width="120"
      ></el-table-column>
      <el-table-column
        :label="$t('msg.role.name')"
        prop="title"
      ></el-table-column>
      <el-table-column
        :label="$t('msg.role.desc')"
        prop="describe"
      ></el-table-column>
      <el-table-column :label="$t('msg.role.action')">
        <template #default>
          <el-button type="primary" size="small">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { getRoleList } from '@/api/role'
import { watchSwitchLanguage } from '@/utils/i18n'

// 获取数据
const allRole = ref([])
const getData = async () => {
  allRole.value = await getRoleList()
}
getData()
watchSwitchLanguage(getData)
</script>

<style lang="scss" scoped></style>
