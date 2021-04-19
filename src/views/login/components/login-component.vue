<!--
 * @Author: your name
 * @Date: 2021-04-12 15:32:46
 * @LastEditTime: 2021-04-19 10:03:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\login\components\username-login.vue
-->
<template>
  <div class="username-login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="username-login-form"
      auto-complete="on"
      label-position="left"
    >
      <el-form-item prop="identity">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="identity"
          v-model="loginForm.identity"
          :placeholder="identityPlaceholder"
          name="identity"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
  name: "username-login",
  props: {
    loginType: {
      type: String,
      required: true
    },
  },
  computed: {
    identityPlaceholder() {
      switch(this.loginType){
        case 'username': return 'Username';
        case 'studentNum': return 'StudentID';
        case 'email': return 'Email';
      }
    }
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      // if (!validUsername(value)) {
      //   callback(new Error("Please enter the correct user name"));
      // } else {
      //   callback();
      // }
      if (value.length <= 0) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        identity: "",
        password: "",
      },
      loginRules: {
        identity: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 判断是什么方式登录
          if(this.loginType == 'studentNum'){
            // 根据学号检验是否为本校学生
            
            this.loginForm.loginType = 'studentNum'
          }else if(this.loginType == 'username' || this.loginType == 'email'){
            this.loginForm.loginType = 'username'
          }
          this.$store
            .dispatch("user/login", this.loginForm)
            .then((res) => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
              
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.username-login {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  &-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>