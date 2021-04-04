<!--
 * @Author: your name
 * @Date: 2021-04-01 17:41:31
 * @LastEditTime: 2021-04-04 17:41:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\announcement\index.vue
-->
<template>
  <div class="announcement">
    <div class="announcement-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="content" label="内容"> </el-table-column>
        <el-table-column prop="time" label="发布时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="editRow(scope.row)" type="text" size="small"
              >修改</el-button
            >
            <el-button @click="deleteRow(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button @click="showDetail(scope.row)" type="text" size="small"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 修改公告弹窗 -->
    <el-dialog
      title="修改公告"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      width="40%"
    >
      <el-form :model="form">
        <el-form-item label="标题" label-width="80px">
          <el-input v-model="form.title" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="内容" label-width="80px">
          <el-input
            type="textarea"
            v-model="form.content"
            resize="none"
            rows="3"
            style="width: 70%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 删除公告弹窗 -->
    <el-dialog
      title="删除提示"
      :visible.sync="deleteDialogVisible"
      v-if="deleteDialogVisible"
      width="40%"
    >
      <span>您确认删除标题为 '{{ deleteTitle }}' 的公告吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDelete">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看公告详情 -->
    <el-dialog
      v-if="showDetailVisible"
      title="详情"
      :visible.sync="showDetailVisible"
      width="30%"
    >
      <detail :detailData="selectRow"></detail>
    </el-dialog>
  </div>
</template>

<script>
import detail from './components/detail.vue';
export default {
  components: { detail },
  name: "announcement",
  data() {
    return {
      tableData: [
        {
          id: 1,
          title: "增加新书",
          content:
            "书名：数据库系统概论学习指导 作者：王珊 出版社：高等教育出版社",
          time: "2020-06-20",
        },
        {
          id: 2,
          title: "增加新书",
          content:
            "书名：数据库系统概论学习指导 作者：王珊 出版社：高等教育出版社",
          time: "2020-06-20",
        },
        {
          id: 3,
          title: "增加新书",
          content:
            "书名：数据库系统概论学习指导 作者：王珊 出版社：高等教育出版社",
          time: "2020-06-20",
        },
        {
          id: 4,
          title: "增加新书",
          content:
            "书名：数据库系统概论学习指导 作者：王珊 出版社：高等教育出版社",
          time: "2020-06-20",
        },
      ],
      // 修改公告弹窗
      dialogFormVisible: false,
      // 修改公告弹窗表单
      form: {
        title: "",
        content: "",
      },
      // 删除公告弹窗
      deleteDialogVisible: false,
      deleteTitle: "",
      // 查看详情弹窗
      showDetailVisible: false,
      selectRow: {}
    };
  },
  methods: {
    // 编辑行
    editRow(row) {
      for(let key in this.form){
        this.form[key] = row.key
      }
      this.dialogFormVisible = true;
    },
    // 删除行
    deleteRow(row) {
      this.deleteTitle = row.title;
      this.deleteDialogVisible = true;
    },
    // 取消删除
    cancelDelete() {
      this.deleteDialogVisible = false;
      this.deleteTitle = "";
    },
    // 确认删除
    confirmDelete() {
      try {
        // 发送请求

        this.deleteDialogVisible = false;
        this.deleteTitle = "";
      } catch (e) {
        this.$message.error(e.message);
      }
    },
    // 查看详情弹窗
    showDetail(row) {
      this.$set(this.$data, "selectRow", row);
      this.showDetailVisible = true
    },
  },
};
</script>

<style lang="scss" scoped>
</style>