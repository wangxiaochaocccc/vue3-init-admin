<template>
  <div>
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
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="handleDistributePermission(row)"
              v-permission="['distributePermission']"
            >
              {{ $t('msg.role.assignPermissions') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission v-model="distributeVisible" :id="selectedId" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getRoleList } from '@/api/role'
import { watchSwitchLanguage } from '@/utils/i18n'
import DistributePermission from './components/DistributePermission.vue'
// 获取数据
const allRole = ref([])
const getData = async () => {
  allRole.value = await getRoleList()
}
getData()
watchSwitchLanguage(getData)

// dialog
const distributeVisible = ref(false)
const selectedId = ref('')
const handleDistributePermission = (row) => {
  distributeVisible.value = true
  selectedId.value = row.id
}
</script>

<style lang="scss" scoped></style>
