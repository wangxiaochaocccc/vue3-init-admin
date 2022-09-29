<template>
  <div class="tags-view-container">
    <router-link
      class="tags-view-item"
      v-for="(item, index) in $store.getters.tagsViewList"
      :key="item.fullPath"
      :to="{ path: item.fullPath }"
      :class="isActived(item) ? 'active' : ''"
      :style="{
        backgroundColor: isActived(item) ? $store.getters.cssVar.menuBg : '',
        borderColor: isActived(item) ? $store.getters.cssVar.menuBg : ''
      }"
      @contextmenu.prevent="openMenu($event, index)"
    >
      {{ item.title }}
      <el-icon
        class="el-icon-close"
        v-show="!isActived(item)"
        @click.stop.prevent="handleRemove(index)"
      >
        <Close />
      </el-icon>
    </router-link>
    <context-menu
      v-show="isShowMenu"
      :index="selectedIndex"
      :style="menuPosition"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import ContextMenu from './contentmenu.vue'
import { useStore } from 'vuex'

const route = useRoute()
// 判断是否被选中
const isActived = (item) => {
  return item.path === route.path
}
// 右键
const isShowMenu = ref(false)
const selectedIndex = ref(0)
const menuPosition = ref({
  top: '',
  left: ''
})
const openMenu = (e, index) => {
  const { x, y } = e
  menuPosition.value.top = y + 'px'
  menuPosition.value.left = x + 'px'
  isShowMenu.value = true
  selectedIndex.value = index
}
// 删除
const store = useStore()
const handleRemove = (index) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index
  })
}
// 监听是否关闭
watch(isShowMenu, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})
// 关闭事件
const onClose = () => {
  isShowMenu.value = false
}
</script>
<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: -2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
