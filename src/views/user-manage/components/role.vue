<template>
  <el-dialog
    :model-value="modelValue"
    :title="$t('msg.excel.roleDialogTitle')"
    @closed="closed"
  >
    <el-checkbox-group v-model="userRoleList">
      <el-checkbox
        v-for="item in allRole"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>
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
import { getRoleList } from '@/api/role'
import { userRoles, updateRole } from '@/api/user-manage'
import { watchSwitchLanguage } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

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

const emits = defineEmits(['update:modelValue', 'updateRole'])

// 关闭事件
const closed = () => {
  emits('update:modelValue', false)
}
// 获取全部角色
const allRole = ref([])
const getAllRole = async () => {
  allRole.value = await getRoleList()
}
getAllRole()

// 用户的角色
const userRoleList = ref([])
const getUserRole = async () => {
  const res = await userRoles(props.id)
  userRoleList.value = res.role.map((item) => item.title)
}
watch(
  () => props.id,
  (val) => {
    if (val) getUserRole()
  }
)
// 点击确定
const confirm = async () => {
  const roles = userRoleList.value.map((item) => {
    return allRole.value.find((role) => role.title === item)
  })
  await updateRole(props.id, roles)
  emits('updateRole')
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}
// 国际化
watchSwitchLanguage(getAllRole)
</script>
<style lang="scss"></style>
