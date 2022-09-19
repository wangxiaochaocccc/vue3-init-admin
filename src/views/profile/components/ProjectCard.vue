<template>
  <div class="user-container">
    <el-card>
      <template #header>
        <div>个人介绍</div>
      </template>
      <div class="info-conatiner">
        <pan-thumb image="/logo.jpeg" :height="'100px'" :width="'100px'">
          <p><a>Hello</a></p>
          {{ $store.getters.userInfo.title }}
        </pan-thumb>
        <div class="user-name">{{ $store.getters.userInfo.username }}</div>
        <div class="user-role">{{ $store.getters.userInfo.title }}</div>
      </div>
      <!-- 项目介绍 -->
      <div class="project-desc">
        <div class="project-desc-icon">
          <svg-icon icon="introduce" />
          <span>{{ $t('msg.profile.projectIntroduction') }}</span>
        </div>
        <div class="project-desc-cont">{{ $t('msg.profile.muted') }}</div>
      </div>
      <!-- 项目功能 -->
      <div class="project-desc">
        <div class="project-desc-icon">
          <svg-icon icon="reward" />
          <span>{{ $t('msg.profile.projectFunction') }}</span>
        </div>
        <div class="project-feature">
          <div
            class="project-feature-item"
            v-for="item in featureData"
            :key="item.id"
          >
            <div class="project-feature-item-title">{{ item.title }}</div>
            <el-progress
              status="success"
              :percentage="item.percentage"
            ></el-progress>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import PanThumb from '@/components/PanThumb/index.vue'

defineProps({
  featureData: {
    type: Array,
    required: true
  }
})
</script>
<style lang="scss" scoped>
.info-conatiner {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.user-name {
  margin: 12px auto;
  font-weight: bold;
}

.user-role {
  font-size: 14px;
  margin-bottom: 20px;
}

.project-desc {
  margin-bottom: 20px;

  .project-desc-icon {
    margin-bottom: 10px;
    border-bottom: 1px solid #dfe6ec;
    padding: 10px 0;

    span {
      display: inline-block;
      margin-left: 8px;
      font-weight: bold;
    }
  }

  .project-desc-cont {
    font-size: 14px;
    color: #777;
  }
}
.project-feature-item {
  margin-bottom: 15px;
  font-size: 14px;
  color: #777;
}
</style>
