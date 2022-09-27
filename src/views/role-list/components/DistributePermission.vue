<template>
  <el-dialog
    :model-value="modelValue"
    :title="$t('msg.excel.roleDialogTitle')"
    @closed="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      :props="defaultProps"
      node-key="id"
      default-expand-all
      check-strictly
      show-checkbox
    ></el-tree>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getPermissionList } from '@/api/permission'
import { watchSwitchLanguage } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { rolePermission, distributePermission } from '@/api/role'

const i18n = useI18n()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

// 关闭事件
const closed = () => {
  emits('update:modelValue', false)
}
// 获取全部角色
const allPermission = ref([])
const getAllRole = async () => {
  allPermission.value = await getPermissionList()
}
getAllRole()
// 获取当前角色权限
const curRolePermission = ref([])
const treeRef = ref(null)
const getRolePermission = async () => {
  curRolePermission.value = await rolePermission(props.id)
  treeRef.value.setCheckedKeys(curRolePermission.value)
}
watch(
  () => props.id,
  (val) => {
    if (val) getRolePermission()
  }
)
// 点击确定
const confirm = async () => {
  await distributePermission({
    roleId: props.id,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}
// tree 默认配置
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}
// 国际化
watchSwitchLanguage(getAllRole)
</script>
<style lang="scss"></style>
