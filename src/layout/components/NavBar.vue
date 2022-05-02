<template>
  <div class='nav-bar'>
    <div class="right-container">
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

  .right-container {
    display: flex;
    align-items: center;
    height: 100%;
    float: right;
    padding-right: 20px;

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
