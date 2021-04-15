<template>
  <div class="login-container">
    <div class="login-form">

      <div class="title-container">
        <h3 class="title">图书管理系统</h3>
      </div>

      <div class="login-content">
          <el-tabs v-model="activeName" :stretch="true">
            <el-tab-pane v-for="item in paneList" :key="item.value" :label="item.label" :name="item.name">
              <login-component :loginType="item.type"></login-component>
            </el-tab-pane>
          </el-tabs>
      </div>

    </div>
  </div>
</template>

<script>
import LoginComponent from './components/login-component.vue'

export default {
  name: 'Login',
  components: { LoginComponent },
  data() {
    return {
      activeName: 'username',
      paneList: [{
        value: 1,
        label: '用户名登录',
        name: 'username',
        type: 'username'
      },{
        value: 2,
        label: '学号登录',
        name: 'studentNum',
        type: 'studentNum'
      },{
        value: 3,
        label: '邮箱登录',
        name: 'email',
        type: 'username'
      },]
    }
  },
  methods: {}
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .el-tabs__item{
    color: #ffffff;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  
}
</style>
