<template>
  <div class="upload-excel-container">
    <div class="button-upload">
      <div class="button-upload-container">
        <el-button type="primary">{{ $t('msg.uploadExcel.upload') }}</el-button>
      </div>
      <input type="file" accept=".xlsx,xls" class="input-upload" />
      <div class="drop-upload">
        <p>{{ $t('msg.uploadExcel.drop') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>
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
