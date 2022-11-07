<template>
  <el-card
    :body-style="{
      padding: 0
    }"
  >
    <div class="container" :class="{ selected: isSelected }">
      <div class="title">{{ data.title }}</div>
      <!-- 今日回款 -->
      <div class="desc">
        <span>{{ $t('msg.chart.tadayReceivable') }}</span>
        <span>
          <span class="profit">&yen;{{ data.receivable }}</span>
          <span class="unit">({{ $t('msg.chart.unit') }})</span>
        </span>
      </div>
      <!-- 今日结余 -->
      <div class="desc">
        <span>{{ $t('msg.chart.tadayBalance') }}</span>
        <span>
          <span :class="data.balance > 0 ? 'profit' : 'loss'">
            &yen;{{ data.balance }}
          </span>
          <span class="unit">({{ $t('msg.chart.unit') }})</span>
        </span>
      </div>
    </div>
  </el-card>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean
  }
})
</script>

<style lang="scss" scoped>
.container {
  height: 112px;
  padding: 20px;
  border-radius: 5px;
  background-color: #f2f3f9;
  cursor: pointer;
  .title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .desc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
    font-size: 12px;
    margin-top: 10px;
  }
  .unit {
    display: inline-block;
    margin-left: 5px;
    color: #999;
  }

  .profit {
    color: #649840;
  }

  .loss {
    color: #b65d59;
  }
  &.selected {
    border-left: 6px solid #5172e9;
    background-color: white;
  }
}
</style>
