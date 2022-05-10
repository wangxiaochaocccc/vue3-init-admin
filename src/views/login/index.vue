<template>
  <div class='login-container'>
    <el-form ref="formRef" class="form-container" :model="loginForm" :rules="loginRules">
      <h3>{{ $t('msg.login.title') }}</h3>
      <lang-select class="lang-select"></lang-select>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input placeholder="请输入用户名" v-model="loginForm.username" name="username" type="text"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input placeholder="请输入密码" v-model="loginForm.password" :type="passwordType" name="password"></el-input>
        <span class="svg-password-show" @click="onChangePwd">
          <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
        </span>
      </el-form-item>
      <el-button :loading="loading" @click="handleLogin" type="primary" style="width: 100%; margin-bottom: 30px;">
        {{ $t('msg.login.loginBtn') }}
      </el-button>
    </el-form>
  </div>

</template>

<script setup>
import SvgIcon from '../../components/SvgIcon/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import { reactive, ref } from 'vue'
import { passwordRule } from './rule'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
// import { watchSwitchLang } from '@/utils/i18n'
// 数据源
const loginForm = reactive({
  username: 'super-admin',
  password: '123456'
})

// watchSwitchLang(() => {
//   loginForm.value.validate()
// })
// 校验规则
const i18n = useI18n()
const loginRules = reactive({
  username: [{
    required: true,
    trigger: 'blur',
    message: i18n.t('msg.login.usernameRule')
  }],
  password: [{
    required: true,
    trigger: 'blur',
    message: i18n.t('msg.login.passwordRule'),
    validator: passwordRule()
  }]
})
// 密码通用处理
const passwordType = ref('password')
const onChangePwd = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
// 触发登录
const loading = ref(false)
const formRef = ref(null)
const store = useStore()
const handleLogin = () => {
  // 表单校验
  formRef.value.validate(valid => {
    if (!valid) return
    loading.value = true
    store.dispatch('user/login', loginForm).then(() => {
      loading.value = false
    }).catch(err => {
      console.log(err)
      loading.value = false
    })
  })
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

    .lang-select {
      position: absolute;
      right: 35px;
      top: 160px;
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
