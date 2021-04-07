<!--
 * @Author: your name
 * @Date: 2021-04-01 17:41:31
 * @LastEditTime: 2021-04-07 16:25:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\announcement\index.vue
-->
<template>
  <div class="announcement">
    <div class="select-condition">
      <el-form ref="queryForm" :inline="true" label-width="68px">
        <el-form-item label="标题关键字" label-width="90px">
          <el-input v-model="keyWord" style="width: 200px"></el-input>
        </el-form-item>

        <el-form-item label="发布时间" label-width="110px">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item style="margin-left: 30px">
          <el-button type="primary" @click="getTableList">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="add">
      <el-button type="primary" @click="addAnnouncement">添加公告</el-button>
    </div>
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
      <div class="pagination-wrapper">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageConfig.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageConfig.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
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
    <!-- 添加公告弹窗 -->
    <el-dialog
      v-if="addAnnouncementVisible"
      title="添加公告"
      :visible.sync="addAnnouncementVisible"
      width="30%"
    >
     <el-form :model="addForm">
        <el-form-item label="标题" label-width="80px">
          <el-input v-model="addForm.title" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="内容" label-width="80px">
          <el-input
            type="textarea"
            v-model="addForm.content"
            resize="none"
            rows="3"
            style="width: 70%"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="80px">
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button @click="cancel">取消</el-button>
      </el-form-item>
      </el-form> 
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
      keyWord: '',
      date: '',
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
      // 新增公告弹窗表单
      addForm: {
        title: "",
        content: "",
      },
      // 删除公告弹窗
      deleteDialogVisible: false,
      deleteTitle: "",
      // 查看详情弹窗
      showDetailVisible: false,
      selectRow: {},
      // 分页配置
      pageConfig: {
        pageNum: 1,
        pageSize: 10
      },
      // 总页数
      total: 0,
      // 添加公告弹窗
      addAnnouncementVisible: false
    };
  },
  computed: {
    startTime(){
      if(!!this.date){
         return this.$moment(this.date[0]).format('YYYY-MM-DD HH:mm:ss');
      }else return ''
    },
    endTime(){
      if(!!this.date){
        return this.$moment(this.date[1]).format('YYYY-MM-DD HH:mm:ss');
      }else return ''
      
    }
  },
  watch: {
      "pageConfig.pageNum": {
        handler(n) {
          this.getTableList();
        },
        deep: true,
      },
      "pageConfig.pageSize": {
        handler(n) {
          this.getTableList();
        },
        deep: true,
      },
  },
  methods: {
    // 编辑行
    editRow(row) {
      for(let key in this.form){
        this.form[key] = row[key]
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
    // 分页页数改变
    handleSizeChange(val){
      this.pageConfig.pageSize = val
    },
    // 分页当前页改变
    handleCurrentChange(val){
      this.pageConfig.pageNum = val
    },
    getTableList(){
      try{
        let tableObj = {
          ...this.pageConfig,
          keyWord: this.keyWord,
          startTime: this.startTime,
          endTime: this.endTime
        }
        console.log(tableObj);
      }catch(e){
        this.$message.error(e.message)
      }
    },
    // 重置查询条件
    resetQuery(){
        this.keyWord = ''
        this.date = ''
        this.pageConfig.pageNum = 1
        this.getTableList()
    },
    // 打开新增公告弹窗
    addAnnouncement(){
      this.addAnnouncementVisible = true
    },
    // 取消新增公告
    cancel(){
      this.addAnnouncementVisible = false;
      for(let key in this.addForm){
        this.addForm[key] = ''
      }
    },
    // 提交新增公告
    onSubmit(){
      try{
        // 发送添加公告请求

        this.cancel()
      }catch(e){
        this.$message.error(e.message)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.announcement{
  padding: 20px;
  .select-condition {
    height: 54px;
    margin: 0 0 14px 0;
    background: #ffffff;
    box-shadow: 0px 0px 6px 0px rgba(0, 24, 16, 0.08);
    .el-form-item {
      margin: 7px 0;
    }
  }
  .add{
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
  }
  &-table{
    .pagination-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 30px;
      margin-right: 20px;
      padding-top: 17px;
    }
  }
}
</style>