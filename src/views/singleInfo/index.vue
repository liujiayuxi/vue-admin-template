<!--
 * @Author: your name
 * @Date: 2021-04-06 10:53:29
 * @LastEditTime: 2021-04-19 23:52:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\singleInfo\index.vue
-->
<template>
  <div class="singleInfo">
    <div class="singleInfo-content">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="角色">
          <el-select v-model="form.role" style="width: 10%" :disabled="notEdit">
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
            <el-radio label="男" value="1"></el-radio>
            <el-radio label="女" value="2"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="姓名" style="width: 20%">
          <el-input
            v-model="form.displayName"
            maxlength="10"
            show-word-limit
            :disabled="isEdit"
          ></el-input>
        </el-form-item>

        <el-form-item label="手机" style="width: 25%">
          <el-input
            v-model="form.phone"
            maxlength="11"
            show-word-limit
            :disabled="isEdit"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱" style="width: 30%">
          <el-input
            v-model="form.email"
            maxlength="16"
            show-word-limit
            :disabled="isEdit"
          ></el-input>
        </el-form-item>

        <el-form-item label="借阅证编号" style="width: 30%">
          <el-input
            v-model="form.studentNum"
            maxlength="16"
            show-word-limit
            :disabled="notEdit"
          ></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="4"
            v-model="form.remark"
            maxlength="50"
            show-word-limit
            resize="none"
            style="width: 30%"
            :disabled="isEdit"
          >
          </el-input>
        </el-form-item>

        <el-form-item style="display: flex; justify-content: flex-start">
          <el-button type="primary" @click="onSubmit" v-if="!isEdit"
            >确认修改</el-button
          >
          <el-button type="primary" @click="edit" v-else>编辑</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "singleInfo",
  data() {
    return {
      form: {
        role: "",
        displayName: "",
        sex: "",
        studentNum: "",
        phone: "",
        email: "",
        remark: "",
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
      //   可以修改的表单
      isEdit: true,
      // 不能修改的表单
      notEdit: true,
    };
  },
  mounted() {
    this.getCurrentUser();
  },
  methods: {
    //   获取当前用户
    getCurrentUser() {
      try {
        let currentObj = this.$store.getters.userInfo


        if (currentObj.sex == 1) {
          currentObj.sex = "男";
        } else if (currentObj.sex == 2) {
          currentObj.sex = "女";
        }

        if (currentObj.userType == "normal") {
          currentObj.role = 1;
        } else if (currentObj.userType == "superAdmin") {
          currentObj.role = 2;
        }

        // this.$set(this.$data, 'form', currentObj)
        for (let key in this.form) {
          this.form[key] = currentObj[key];
        }
      } catch (e) {
        this.$message.error(e.message);
      }
    },
    //   编辑表单
    edit() {
      this.isEdit = false;
    },
    // 提交修改
    onSubmit() {
      try {
      } catch (e) {
        this.$message.error(e.message);
      }
    },
    // 取消
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.singleInfo {
  padding: 20px 30px;
  &-content {
  }
}
</style>