<template>
  <el-card
    :body-style="{
      padding: 0
    }"
    class="container"
  >
    <el-calendar v-model="currentDate">
      <template #dateCell="{ data }">
        <p
          :class="[
            data.isSelected ? 'is-selected' : '',
            getClassName(data.day)
          ]"
        >
          {{ data.day.split('-').slice(2).join('') }}
          <br />
          <span class="amount" v-if="getCurentDayMoney(data.day) != 0">
            {{ getCurentDayMoney(data.day) }}
          </span>
        </p>
      </template>
    </el-calendar>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { getChartCalendar } from '@/api/chart'

// 当前时间
const currentDate = ref(new Date())
// 获取数据
const calendarData = ref([])
const getData = async () => {
  const { result } = await getChartCalendar()
  calendarData.value = result
}
getData()

// 缓存一下数据，提高效率
const AmountList = ref({})

// 获取每一天的金额
const getCurentDayMoney = (date) => {
  // 读取缓存
  if (AmountList.value[date]) {
    return AmountList.value[date]
  }
  // 找出这一天的数据
  const todayData = calendarData.value.find((item) => item.date === date)
  if (!todayData) {
    return 0
  }
  const todayAmount = todayData.amount

  // 缓存
  AmountList.value[date] = todayAmount
  return todayAmount
}

// 样式
const getClassName = (date) => {
  const amount = getCurentDayMoney(date)
  if (amount > 0) {
    return 'profit'
  } else if (amount < 0) {
    console.log(amount)
    return 'loss'
  }
  return ''
}
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
  background-color: #d6f2ff !important;
}
</style>
