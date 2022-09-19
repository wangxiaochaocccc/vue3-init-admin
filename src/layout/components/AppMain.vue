<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="route-transition" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { isTag } from '@/utils/tags'
import { useStore } from 'vuex'
import { genarateTitle, watchSwitchLanguage } from '@/utils/i18n'

const store = useStore()
const route = useRoute()

// 获取title
const getTitle = (route) => {
  let title = ''
  if (route.meta) {
    title = genarateTitle(route.meta.title)
  } else {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  }
  return title
}

// 监听路由变化
watch(
  route,
  (to, from) => {
    if (!isTag(to.path)) {
      const { fullPath, meta, name, params, path, query } = to
      store.commit('app/addTagsView', {
        fullPath,
        meta,
        name,
        params,
        path,
        query,
        title: getTitle(to)
      })
    }
  },
  { immediate: true }
)

// 国际化

watchSwitchLanguage(() => {
  store.getters.tagsViewList.forEach((route, index) => {
    store.commit('app/changeTagsView', {
      index,
      tag: {
        ...route,
        title: getTitle(route)
      }
    })
  })
})
</script>
<style lang="scss">
.app-main {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 50px - 43px);
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
