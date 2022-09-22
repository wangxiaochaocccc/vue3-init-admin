<template>
  <div class="upload-excel-container">
    <div class="button-upload">
      <div class="button-upload-container">
        <el-button type="primary" :loading="loading" @click="handleUploadClick">
          {{ $t('msg.uploadExcel.upload') }}
        </el-button>
      </div>
      <input
        ref="inputRef"
        type="file"
        accept=".xlsx,xls"
        class="input-upload"
        @change="handleInputChange"
      />
      <div
        class="drop-upload"
        @drop.stop.prevent="handleDorp"
        @dragover.stop.prevent="handleDorpOver"
        @dragenter.stop.prevent="handleDorpOver"
      >
        <p>{{ $t('msg.uploadExcel.drop') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { read, utils } from 'xlsx'
import { getHeaderRow, isExcel } from './utils'

const props = defineProps({
  beforeUpload: Function,
  onSuccess: Function
})

const loading = ref(false)
// 拖拽上传
const handleDorp = (e) => {
  if (loading.value) return

  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('请选择一个文件')
    return false
  }

  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('上传文件格式必须是.xlsx/.xls/.csv')
    return false
  }
  // 触发上传事件
  upload(rawFile)
}
// 拖拽悬停时触发
const handleDorpOver = (e) => {
  e.dataTransfer.dropEffect = 'copy'
}
// 点击上传
const inputRef = ref(null)
const handleUploadClick = () => {
  inputRef.value.click()
}
// 选择文件后
const handleInputChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}
// 上传事件
const upload = (rawFile) => {
  inputRef.value.value = null
  // 如果没有指定上传前回调的话
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果指定了上传前回调，那么只有返回 true 才会执行后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}
// 读取数据（异步）
const readerData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // 在读取操作完成后触发
    reader.onload = (e) => {
      // 获取解析的数据
      const data = e.target.result
      // 利用xlsx对数据进行解析
      const workbook = read(data, { type: 'array' })
      // 获取第一章表格名称
      const firstSheetName = workbook.SheetNames[0]
      // 只读取sheet1的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 解析表头数据
      const header = getHeaderRow(worksheet)
      // 解析数据体
      const results = utils.sheet_to_json(worksheet)
      // 传入解析之后的数据
      generateData({ header, results })
      // loading 处理
      loading.value = false
      // 异步完成
      resolve()
    }
    // 启动读取指定的Blob或File
    reader.readAsArrayBuffer(rawFile)
  })
}
// 根据导入内容，生成数据
const generateData = (data) => {
  props.onSuccess?.(data)
}
</script>
<style lang="scss">
.upload-excel-container {
  margin-top: 100px;
  .button-upload {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    .button-upload-container,
    .drop-upload {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 350px;
      height: 160px;
      border: 1px dashed #bbb;
    }
    .input-upload {
      display: none;
    }
  }
}
</style>
