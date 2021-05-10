<!--
 * @Author: your name
 * @Date: 2021-04-01 17:41:31
 * @LastEditTime: 2021-05-10 13:26:00
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
    <div class="announcement-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="detail" label="内容"> </el-table-column>
        <el-table-column prop="publishDate" label="发布时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)" type="text" size="small"
              ><i class="el-icon-s-operation"></i>查看详情</el-button
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
            v-model="form.detail"
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
      keyWord: '',
      date: '',
      tableData: [
        // {
        //   id: 1,
        //   title: "增加新书",
        //   content:
        //     "书名：数据库系统概论学习指导 作者：王珊 出版社：高等教育出版社",
        //   time: "2020-06-20",
        // },
        // {
        //   id: 2,
        //   title: "增加新书",
        //   content:
        //     "书名：数据库系统概论学习指导 作者：王珊 出版社：高等教育出版社",
        //   time: "2020-06-20",
        // },
        // {
        //   id: 3,
        //   title: "增加新书",
        //   content:
        //     "书名：数据库系统概论学习指导 作者：王珊 出版社：高等教育出版社",
        //   time: "2020-06-20",
        // },
        // {
        //   id: 4,
        //   title: "增加新书",
        //   content:
        //     "书名：数据库系统概论学习指导 作者：王珊 出版社：高等教育出版社",
        //   time: "2020-06-20",
        // },
      ],
      // 修改公告弹窗
      dialogFormVisible: false,
      // 修改公告弹窗表单
      form: {
        title: "",
        detail: "",
      },
      // 新增公告弹窗表单
      addForm: {
        title: "",
        detail: "",
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
      deleteId: ''
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
  mounted(){
    this.getTableList()
  },
  methods: {
    // 编辑行
    editRow(row) {
      for(let key in this.form){
        this.form[key] = row[key]
      }
      this.dialogFormVisible = true;
    },
    // 取消删除
    cancelDelete() {
      this.deleteDialogVisible = false;
      this.deleteTitle = "";
      this.deleteId = ''
    },
    // 确认删除
    async confirmDelete() {
      try {
        // 发送请求
        let {code, msg} = await this.$api.announcementApi.deleteAnnouncement(this.deleteId);
        if( code !== 200 )throw new Error(msg)
        this.$message.success(msg)
        this.deleteDialogVisible = false;
        this.deleteTitle = "";
        this.deleteId = ''
        this.getTableList()
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
    async getTableList(){
      try{
        let tableObj = {
          ...this.pageConfig,
          title: this.keyWord,
          publishDateStart: this.startTime,
          publishDateEnd: this.endTime
        }
        let { total, code, msg, rows } = await this.$api.announcementApi.searchAnnouncementList(tableObj)
        if( code !== 200 )throw new Error(msg)
        this.total = total;
        this.$set(this.$data, 'tableData', rows)
      }catch(e){
        this.$message.error(e.message)
      }
    },
    // 重置查询条件
    resetQuery(){
        this.keyWord = ''
        this.date = ''
        if(this.pageConfig.pageNum == 1){
          this.getTableList()
        }else{
          this.pageConfig.pageNum = 1
        }
        
        
    },
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