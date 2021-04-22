<!--
 * @Author: your name
 * @Date: 2021-04-03 17:28:37
 * @LastEditTime: 2021-04-22 13:48:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\dashboard\views\add-book.vue
-->
<template>
  <div class="add-book">
    <div class="add-book-top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/dashboard/index' }"
          >图书管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>上架图书</el-breadcrumb-item>
      </el-breadcrumb>
      <p class="back" @click="cancel">返回</p>
    </div>
    <div class="add-book-content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="类别">
          <el-select v-model="form.sortId" placeholder="请选择图书类别">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书名">
          <el-input v-model="form.name" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="form.publisher" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="ISBN">
          <el-input v-model="form.description" style="width: 400px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="备注" prop="tips">
                    <el-input type="textarea" v-model="form.tips" resize="none" rows="3" style="width: 400px"></el-input>
                </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-book",
  data() {
    return {
      form: {
        name: "",
        author: "",
        publisher: "",
        sortId: "",
        // tips: '',
        description: "",
      },
      typeOptions: [
        {
          label: "未分类",
          value: 1,
        },
        {
          label: "护理类",
          value: 2,
        },
        {
          label: "编程类",
          value: 3,
        },
        {
          label: "艺术类",
          value: 4,
        },
        {
          label: "管理类",
          value: 5,
        },
        {
          label: "法律类",
          value: 6,
        },
        {
          label: "生活类",
          value: 7,
        },
        {
          label: "励志类",
          value: 8,
        },
        {
          label: "故事类",
          value: 9,
        },
        {
          label: "诗歌类",
          value: 10,
        },
        {
          label: "社会学类",
          value: 11,
        },
        {
          label: "文学类",
          value: 12,
        },
        {
          label: "哲学类",
          value: 13,
        },
        {
          label: "科学类",
          value: 14,
        },
        {
          label: "幽默类",
          value: 15,
        },
      ],
    };
  },
  methods: {
    // 返回/取消
    cancel() {
      this.$router.push("/dashboard/index");
    },
    // 提交
    async onSubmit() {
      try {
        let { code, msg } = await this.$api.bookManageApi.addBook(this.form);
        if(code!== 200) throw new Error(msg)
        this.$message.success(msg)
        this.$router.push("/dashboard/index");
      } catch (e) {
        this.$message.error(e.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-book {
  padding: 0 20px;
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .back {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  &-content {
    padding: 20px;
    box-shadow: 0px 0px 8px 0px rgba(0, 24, 16, 0.08);
  }
}
</style>