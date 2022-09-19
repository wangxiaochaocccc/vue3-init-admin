<template>
  <div class="author-container">
    <div class="header">
      <pan-thumb image="/logo.jpeg" width="60px" height="60px">
        {{ $t('msg.profile.name') }}
      </pan-thumb>
      <div class="info">
        <h3>{{ $t('msg.profile.name') }}</h3>
        <span>{{ $t('msg.profile.job') }}</span>
      </div>
    </div>
    <div class="body">
      {{ $t('msg.profile.Introduction') }}
    </div>
  </div>
</template>

<script setup>
import PanThumb from '@/components/PanThumb/index.vue'
</script>
<style lang="scss">
.author-container {
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .info {
      margin-left: 20px;
      h3 {
        margin-bottom: 8px;
      }
    }
  }
  .body {
    color: #777;
    font-size: 16px;
  }
}
</style>
