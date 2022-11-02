<template>
  <el-card
    :body-style="{
      padding: 0
    }"
    class="container"
  >
    <el-calendar v-model="currentDate">
      <template #dateCell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(2).join('') }}
        </p>
      </template>
    </el-calendar>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'

const currentDate = ref(new Date())
</script>
<style lang="scss" scoped>
.container {
  // background-color: #bcbfc3;
  height: 443px;
  :deep(.el-calendar__body) {
    padding: 0 12px 12px;
    font-size: 14px;
  }
  :deep(.el-calendar-day) {
    height: 66px !important;
    padding: 0 !important;
    p {
      height: 100%;
      padding: 8px;
    }
    // 金额样式
    .amount {
      font-size: 12px;
    }
    // 正收益
    .profit {
      background-color: #f3fff3;
      span {
        color: #649840;
      }
    }
    // 负收益
    .loss {
      background-color: #ffe7e7;
      span {
        color: #b65d59;
      }
    }
  }
}
.is-selected {
  background-color: #d6f2ff;
}
</style>
