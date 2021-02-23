<!--
 * @Author: your name
 * @Date: 2021-02-23 14:23:31
 * @LastEditTime: 2021-02-23 17:28:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\form\edit-user.vue
-->
<template>
  <el-form ref="form" :model="form" label-width="80px" label-position="left">
    <el-form-item label="角色">
      <el-select v-model="form.type" placeholder="请选择角色">
        <el-option
          v-for="item in roleList"
          :label="item.roleName"
          :value="item.roleId"
          :key="item.roleId"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="用户名">
      <el-input
        v-model="form.username"
        placeholder="用于登录系统"
        maxlength="16"
        show-word-limit
      ></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input
        v-model="form.name"
        placeholder="请输入用户姓名"
        maxlength="16"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item label="手机">
      <el-input
        v-model="form.mobile"
        placeholder="请输入手机号码"
        maxlength="11"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item label="备注">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入备注"
        v-model="form.description"
        maxlength="50"
        show-word-limit
      >
      </el-input>
    </el-form-item>

    <el-form-item style="display:flex; justify-content:flex-end">
        <el-button type="primary" @click="onSubmit">新建</el-button>
        <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getLocalStorage, delLocalStorage } from '@/utils/index.js';
export default {
  name: "edit-user",
  data() {
    return {
      form: {
        type: "",
        name: "",
        username: "",
        mobile: "",
        description: "",
      },
      roleList: [
        {
          roleName: "普通用户",
          roleId: 1,
        },
        {
          roleName: "管理员",
          roleId: 2,
        },
      ],
    };
  },
  mounted () {
    this.getUserItem();
  },
  beforeDestroy () {
    delLocalStorage('userItem');
  },
  methods: {
      getUserItem(){
        let temp = getLocalStorage('userItem');
        if(Object.keys(temp).length > 0){
          this.$set(this.$data, 'form', temp)
        }
        console.log(this.form);
      },
      cancel() {
          this.$emit('closeCreateDialog');
      },
      onSubmit() {
          
      },
  },
};
</script>

<style lang="scss" scoped>
</style>