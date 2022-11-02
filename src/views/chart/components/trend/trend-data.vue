<template>
  <div class="trend-data-container">
    <div class="trend-data-title">
      <div class="title">{{ $t('msg.chart.trendDataTitle') }}</div>
      <div class="all-amount">
        &yen;
        <span>{{ data.allAmount }}</span>
      </div>
    </div>
    <div class="item">
      <div class="left border-left-1">
        {{ $t('msg.chart.trendDataTadayAdded') }}
      </div>
      <div class="money">
        <span>{{ data.tadayAdded }}</span>
        {{ $t('msg.chart.unit') }}
      </div>
    </div>
    <div class="item">
      <div class="left border-left-2">
        {{ $t('msg.chart.trendDataTadayExpend') }}
      </div>
      <div class="money">
        <span>{{ data.tadaySub }}</span>
        {{ $t('msg.chart.unit') }}
      </div>
    </div>
    <div class="item">
      <div class="left border-left-3">
        {{ $t('msg.chart.trendDataTadayBalance') }}
      </div>
      <div class="money">
        <span>{{ data.tadayAmount }}</span>
        {{ $t('msg.chart.unit') }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
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
