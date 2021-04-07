<!--
 * @Author: your name
 * @Date: 2021-02-23 14:23:31
 * @LastEditTime: 2021-04-07 11:34:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\form\edit-user.vue
-->
<template>
  <el-form ref="form" :model="form" label-width="100px" label-position="left">
    <el-form-item label="角色">
      <el-select v-model="form.role" placeholder="请选择角色">
        <el-option
          v-for="item in roleList"
          :label="item.roleName"
          :value="item.roleId"
          :key="item.roleId"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="form.sex">
        <el-radio label="男" value='1'></el-radio>
        <el-radio label="女" value='2'></el-radio>
      </el-radio-group>
    </el-form-item>
    
    <el-form-item label="姓名">
      <el-input
        v-model="form.name"
        placeholder="请输入用户姓名"
        maxlength="10"
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

    <el-form-item label="邮箱">
      <el-input
        v-model="form.email"
        placeholder="请输入邮箱"
        maxlength="16"
        show-word-limit
      ></el-input>
    </el-form-item>
    
    <el-form-item label="借阅证编号">
          <el-input
            v-model="form.borrowId"
            maxlength="16"
            show-word-limit 
            :disabled="notEdit"
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
        role: "",
        name: "",
        sex: '',
        email: "",
        mobile: "",
        borrowId: '',
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
            // 性别转换
            // if(temp.sex == '男'){
            //   temp.sex = '1'
            // }else if(temp.sex == '女'){
            //   temp.sex = '2'
            // }
            // 角色转换
            if(temp.role == '普通用户'){
              temp.role = 1
            }else if(temp.role == '管理员'){
              temp.role = 2
            };
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