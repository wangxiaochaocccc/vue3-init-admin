<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card class="user-card" :featureData="featureData" />
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeTabs">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature :featureData="featureData" />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
import Feature from './components/Feature.vue'
import Chapter from './components/Chapter.vue'
import Author from './components/Author.vue'
import { getFeature } from '@/api/user'
import { ref } from 'vue'
import { watchSwitchLanguage } from '@/utils/i18n'
const activeTabs = ref('feature')

const featureData = ref([])
const getFeatureData = async () => {
  const res = await getFeature()
  featureData.value = res
}
getFeatureData()

// 监听国际化切换
watchSwitchLanguage(getFeatureData)
</script>

<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>
