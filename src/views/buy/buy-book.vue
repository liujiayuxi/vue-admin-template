<!--
 * @Author: your name
 * @Date: 2021-02-24 10:22:17
 * @LastEditTime: 2021-02-24 10:57:10
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
      <el-select v-model="form.provinceValue" placeholder="请选择省">
        <el-option
          v-for="item in provinceList"
          :label="item.label"
          :value="item.value"
          :key="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="form.cityValue" placeholder="请选择市">
        <el-option
          v-for="item in cityList"
          :label="item.label"
          :value="item.value"
          :key="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="form.districtValue" placeholder="请选择区">
        <el-option
          v-for="item in districtList"
          :label="item.label"
          :value="item.value"
          :key="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="详细地址">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入详细地址(具体到小区/门牌号)"
        v-model="form.description"
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
        <el-button type="primary" @click="onSubmit">新建</el-button>
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
        provinceValue: "",
        cityValue: "",
        districtValue: "",
        detailValue: "",
        description: "",
      },
      provinceList: [
        {
          label: "上海",
          value: 1,
        },
        {
          label: "北京",
          value: 2,
        },
        {
          label: "广东",
          value: 3,
        },
        {
          label: "重庆",
          value: 4,
        },
      ],
      cityList: [
        {
          label: "广州",
          value: 1,
        },
        {
          label: "深圳",
          value: 2,
        }
      ],
      districtList: [
        {
          label: "海淀区",
          value: 1,
        },
        {
          label: "浦东区",
          value: 2,
        },
        {
          label: "南沙区",
          value: 3,
        },
        {
          label: "江北区",
          value: 4,
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
