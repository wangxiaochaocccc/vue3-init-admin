<template>
  <div class="trend-data-container">
    <div class="trend-data-title">
      <div class="title">{{ $t('msg.chart.trendDataTitle') }}</div>
      <div class="all-amount">
        &yen;
        <span ref="allAmountRef">{{ data.allAmount }}</span>
      </div>
    </div>
    <div class="item">
      <div class="left border-left-1">
        {{ $t('msg.chart.trendDataTadayAdded') }}
      </div>
      <div class="money">
        <span ref="todayAddedRef">{{ data.tadayAdded }}</span>
        {{ $t('msg.chart.unit') }}
      </div>
    </div>
    <div class="item">
      <div class="left border-left-2">
        {{ $t('msg.chart.trendDataTadayExpend') }}
      </div>
      <div class="money">
        <span ref="tadaySubRef">{{ data.tadaySub }}</span>
        {{ $t('msg.chart.unit') }}
      </div>
    </div>
    <div class="item">
      <div class="left border-left-3">
        {{ $t('msg.chart.trendDataTadayBalance') }}
      </div>
      <div class="money">
        <span ref="tadayAmountRef">{{ data.tadayAmount }}</span>
        {{ $t('msg.chart.unit') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { CountUp } from 'countup.js'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// 本月累计收益
const allAmountRef = ref(null)
// 今日新增收益
const todayAddedRef = ref(null)
// 今日新增支出
const tadaySubRef = ref(null)
// 今日结余
const tadayAmountRef = ref(null)

onMounted(() => {
  const options = {
    // 小数点位
    decimalPlaces: 2,
    // 持续时间
    duration: 1.5
  }
  // 累计回款
  new CountUp(allAmountRef.value, props.data.allAmount, options).start()
  // 今日新增
  new CountUp(todayAddedRef.value, props.data.tadayAdded, options).start()
  // 今日支出
  new CountUp(tadaySubRef.value, props.data.tadaySub, options).start()
  // 今日结余
  new CountUp(tadayAmountRef.value, props.data.tadayAmount, options).start()
})
</script>
<style lang="scss">
.trend-data-container {
  .trend-data-title {
    padding: 12px 20px;
    background: linear-gradient(90deg, #0ea5e9, #6366f1);
    border-radius: 5px;
    color: #fff;
    .title {
      font-size: 12px;
      font-weight: 700;
    }
    .all-amount {
      font-size: 24px;
      margin-top: 4px;
    }
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #c9c9c9;
    padding: 16px 0;
    color: #666;
    .left {
      font-size: 12px;
      padding: 4px 0 4px 8px;
    }
    .money span {
      color: #333;
      font-weight: 700;
      font-size: 20px;
    }
  }
  .border-left-1 {
    border-left: 6px solid #409eff;
  }
  .border-left-2 {
    border-left: 6px solid #e6a23c;
  }
  .border-left-3 {
    border-left: 6px solid #67c23a;
  }
}
</style>
