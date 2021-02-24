<!--
 * @Author: your name
 * @Date: 2021-02-24 10:22:17
 * @LastEditTime: 2021-02-24 17:14:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\dashboard\comfirm-order.vue
-->
<template>
  <el-form ref="form" :model="form" label-width="80px" label-position="left">

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

    <el-form-item label="地址">
      <el-input
        placeholder="请输入图书馆地址"
        v-model="form.address"
        maxlength="50"
        show-word-limit
      >
      </el-input>
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
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getLocalStorage, delLocalStorage } from '@/utils/index.js';
export default {
  name: "confirm-order",
  data() {
    return {
      form: {
        name: "",
        mobile: "",
        address: "",
        description: "",
      },
    };
  },
  mounted () {
    this.getUserItem();
  },
  beforeDestroy () {
    
  },
  methods: {
      cancel() {
          this.$emit('closeOrderDialog');
      },
      onSubmit() {
          //调用参数接口
      },
  },
};
</script>

<style lang="scss" scoped>
</style>