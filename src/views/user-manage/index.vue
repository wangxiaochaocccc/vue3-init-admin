<template>
  <div class="user-manage-container">
    <el-card>
      <div class="header">
        <el-button
          type="primary"
          @click="uploadExcel"
          v-permission="['importUser']"
        >
          {{ $t('msg.excel.importExcel') }}
        </el-button>
        <el-button @click="handleExport" type="success">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          prop="username"
          :label="$t('msg.excel.name')"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          :label="$t('msg.excel.mobile')"
        ></el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" #default="{ row }">
          <el-image
            :src="row.avatar"
            :preview-src-list="[row.avatar]"
          ></el-image>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')" #default="{ row }">
          <div v-if="row.role?.length > 1">
            <el-tag v-for="item in row.role" :key="item.id">
              {{ item.title }}
            </el-tag>
          </div>
          <div v-else>
            <el-tag>{{ $t('msg.excel.defaultRole') }}</el-tag>
          </div>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')" #default="{ row }">
          {{ $filters.dateFilter(row.openTime) }}
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          width="250"
          #default="{ row }"
        >
          <el-button type="primary" size="small" @click="handleLook(row._id)">
            {{ $t('msg.excel.show') }}
          </el-button>
          <el-button
            type="info"
            size="small"
            @click="handleRoleDialog(row)"
            v-permission="['distributeRole']"
          >
            {{ $t('msg.excel.showRole') }}
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="onRemoveUser(row)"
            v-permission="['removeUser']"
          >
            {{ $t('msg.excel.remove') }}
          </el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <export-excel v-model="exportExcelVisible" />
    <role-vue v-model="roleVisible" :id="selectedId" @updateRole="getData" />
  </div>
</template>

<script setup>
import ExportExcel from './components/ExportExcel.vue'
import RoleVue from './components/role.vue'
import { getManageList, deleteUser } from '@/api/user-manage'
import { watchSwitchLanguage } from '@/utils/i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { onActivated, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const i18n = useI18n()
// 基础数据
const size = ref(2)
const page = ref(1)
const total = ref(0)
const tableData = ref([])
// 获取员工列表数据
const getData = async () => {
  const res = await getManageList({
    size: size.value,
    page: page.value
  })
  tableData.value = res.list
  total.value = res.total
}
getData()
// 分页相关
const handleSizeChange = (value) => {
  size.value = value
  getData()
}
const handleCurrentChange = (value) => {
  page.value = value
  getData()
}
// 删除员工
const onRemoveUser = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    // 重新渲染数据
    getData()
  })
}
// 监听语言变化
watchSwitchLanguage(getData)
// 点击上传
const uploadExcel = () => {
  router.push('/user/import')
}
// 重新渲染数据
onActivated(getData)

// 导出excel
const exportExcelVisible = ref(false)
const handleExport = () => {
  exportExcelVisible.value = true
}
// 查看
const handleLook = (id) => {
  router.push(`/user/info/${id}`)
}
// 是否显示角色弹窗
const roleVisible = ref(false)
const selectedId = ref('')
const handleRoleDialog = (row) => {
  roleVisible.value = true
  selectedId.value = row._id
}
watch(roleVisible, (val) => {
  if (!val) selectedId.value = ''
})
</script>

<style lang="scss" scoped>
.user-manage-container {
  .el-card {
    margin-bottom: 20px;
    .header {
      display: flex;
      justify-content: flex-end;
    }
    .el-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .el-pagination {
      margin-top: 20px;
    }
    .el-tag {
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }
}
</style>
