<template>
  <div class='nav-bar'>
    <Hamburger class="hamburger"></Hamburger>
    <Breadcrumb class="breadcrumb"></Breadcrumb>
    <div class="right-container">
      <screen-full class="right-container-menu"></screen-full>
      <theme-select class="right-container-menu"></theme-select>
      <lang-select class="right-container-menu"></lang-select>
      <el-dropdown trigger="click" class="dropdown-container">
        <div class="avatar-container">
          <el-avatar shape="square" :size="40" :src="$store.getters.userInfo.avatar"></el-avatar>
          <el-icon>
            <tools />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>主页</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>课程主页</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import Hamburger from '@/components/hamburger/index.vue'
import Breadcrumb from '../../components/breadcrumb/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import ThemeSelect from '@/components/ThemeSelect/index.vue'
import ScreenFull from '@/components/ScreenFull/index.vue'
const store = useStore()
const loginout = () => {
  store.dispatch('user/logout')
}
</script>
<style lang='scss'>
.nav-bar {
  width: 100%;
  height: 50px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger {
    height: 100%;
    line-height: 50px;
    cursor: pointer;
    transition: background .5s;
    float: left;

    &:hover {
      background: rgba(0, 0, 0, .1);
    }
  }

  .breadcrumb {
    height: 50px;
    line-height: 50px;
    float: left;
  }

  .right-container {
    display: flex;
    align-items: center;
    height: 100%;
    float: right;
    padding-right: 20px;

    .right-container-menu {
      display: inline-block;
      padding: 0 19px 0 0;
    }

    .dropdown-container {
      cursor: pointer;
    }

    .el-avatar {
      margin-right: 12px;

      img {
        background-color: #fff;
      }
    }
  }
}
</style>
