<template>
  <div class='login-container'>
    <el-form class="form-container">
      <h3>用户登录</h3>
      <el-form-item>
        <span class="svg-container">
          <svg-icon icon="https://res.lgdsunday.club/user.svg"></svg-icon>
        </span>
        <el-input placeholder="请输入用户名" name="username" type="text"></el-input>
      </el-form-item>

      <el-form-item>
        <span class="svg-container">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>
        <el-input placeholder="请输入密码" name="password"></el-input>
        <span class="svg-password-show">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>
      </el-form-item>
      <el-button type="primary" style="width: 100%; margin-bottom: 30px;">登录</el-button>
    </el-form>
  </div>

</template>

<script>
import SvgIcon from '../../components/SvgIcon/index.vue'
export default {
  name: 'login',
  components: { SvgIcon }
}
</script>
<style lang='scss'>
.login-container {
  min-width: 100%;
  min-height: 100%;
  background-color: #2d3a4b;

  .form-container {
    position: relative;
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    h3 {
      text-align: center;
      color: #fff;
      margin-bottom: 20px;
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, .1);
      background-color: rgba(0, 0, 0, .1);
      border-radius: 5px;
      color: #454545;

      .svg-container {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
        vertical-align: middle;
      }

      .svg-password-show {
        position: absolute;
        right: 10px;
        top: 7px;
        color: #889aa4;
        cursor: pointer;
        user-select: none;
      }
    }

    .el-input {
      display: inline-block;
      height: 47px;
      width: 90%;
      border: none;

      .el-input__wrapper {
        width: 100%;
        background: transparent;
        box-shadow: none;
      }

      input {
        width: 100%;
        height: 47px;
        background: transparent;
        border: none;
        padding: 12px 5px 12px 0;
        color: #eee;
      }
    }

  }
}
</style>
