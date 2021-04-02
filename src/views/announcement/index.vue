<!--
 * @Author: your name
 * @Date: 2021-04-01 17:41:31
 * @LastEditTime: 2021-04-02 10:23:49
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
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="content" label="内容">
        </el-table-column>
        <el-table-column prop="time" label="发布时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="editRow(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 修改公告弹窗 -->
    <el-dialog title="修改公告" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "announcement",
  data() {
    return {
      tableData: [
        {
          title: "增加新书",
          content: "书名：数据库系统概论学习指导 作者：王珊 出版社：高等教育出版社",
          time: "2020-06-20"
        },
        {
          title: "增加新书",
          content: "书名：数据库系统概论学习指导 作者：王珊 出版社：高等教育出版社",
          time: "2020-06-20"
        },
        {
         title: "增加新书",
          content: "书名：数据库系统概论学习指导 作者：王珊 出版社：高等教育出版社",
          time: "2020-06-20"
        },
        {
          title: "增加新书",
          content: "书名：数据库系统概论学习指导 作者：王珊 出版社：高等教育出版社",
          time: "2020-06-20"
        },
      ],
    };
  },
  methods: {
    // 编辑行
    editRow(){

    },
    // 删除行
    deleteRow(){

    },
      handleClick(row) {
        console.log(row);
      }
  },
};
</script>

<style lang="scss" scoped>
</style>