<!--
 * @Author: your name
 * @Date: 2021-04-04 18:17:08
 * @LastEditTime: 2021-04-06 18:01:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\records\index.vue
-->
<template>
  <div class="records">
    <div class="select-condition">
      <el-form ref="queryForm" :inline="true" label-width="68px">
        <el-form-item label="借还类型" label-width="80px" prop="type">
          <el-select
            v-model="type"
            placeholder="借还类型"
            clearable
            size="small"
            style="width: 120px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="借还日期" label-width="110px">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item style="margin-left: 30px">
          <el-button type="primary" @click="getTableList">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="records-content">
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="type" label="类型"> </el-table-column>
        <el-table-column prop="bookName" label="书名"> </el-table-column>
        <el-table-column prop="press" label="出版社"> </el-table-column>
        <el-table-column prop="author" label="作者"> </el-table-column>
        <el-table-column prop="borrowTime" label="借书日期"> </el-table-column>
        <el-table-column prop="lendTime" label="还书日期"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="agreeBorrow(scope.row)" type="text" size="small"
              >同意借出</el-button
            >
            <el-button @click="agreeLend(scope.row)" type="text" size="small"
              >同意归还</el-button
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
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageConfig.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <el-dialog title="提示" :visible.sync="borrowDialogVisible" width="30%">
        <span>您确认借出《{{ selectBookName }}》吗?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelBorrow">取 消</el-button>
          <el-button type="primary" @click="confirmBorrow">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="lendDialogVisible" width="30%">
        <span>您确认归还《{{ selectBookName }}》吗?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelLend">取 消</el-button>
          <el-button type="primary" @click="confirmLend">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "records",
  data() {
    return {
      type: "",
      date: '',
      options: [
        {
          label: "借",
          value: 1,
        },
        {
          label: "还",
          value: 2,
        },{
          label: "已借",
          value: 3,
        },
        {
          label: "已还",
          value: 4,
        },
      ],
      tableData: [
        {
          bookId: 1,
          bookName: "javascript高级程序设计aaaaabyy程序设计aaaaaaaaa",
          press: "人民邮电出版社",
          author: "Nicholas C. Zakas（尼古拉斯•泽卡斯）",
          borrowTime: "2020-06-20",
          lendTime: "2020-07-20",
        },
        {
          bookId: 2,
          bookName: "javascript高级程序设计aaaaabyy程序设计aaaaaaaaa",
          press: "人民邮电出版社",
          author: "Nicholas C. Zakas（尼古拉斯•泽卡斯）",
          borrowTime: "2020-06-20",
          lendTime: "2020-07-20",
        },
        {
          bookId: 3,
          bookName: "javascript高级程序设计aaaaabyy程序设计aaaaaaaaa",
          press: "人民邮电出版社",
          author: "Nicholas C. Zakas（尼古拉斯•泽卡斯）",
          borrowTime: "2020-06-20",
          lendTime: "2020-07-20",
        },
      ],
      pageConfig: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      // 同意借出弹窗
      borrowDialogVisible: false,
      selectId: '',
      // 同意归还弹窗
      lendDialogVisible: false
    };
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
  computed: {
    selectBookName() {
      let temp = this.tableData.find((item) => {
        return item.bookId == this.selectId;
      });
      if (temp) {
        return temp.bookName;
      }
    },
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
  methods: {
    //   查表
    getTableList() {
      console.log(this.startTime, this.endTime,1)
        try{

        }catch(e){
            this.$message.error(e.message)
        }
    },
    //   重置
    resetQuery() {},
    // 同意借出
    agreeBorrow(row) {
        this.selectId = row.bookId;
        this.borrowDialogVisible = true;
    },
    // 取消借出
    cancelBorrow(){
      this.borrowDialogVisible = false;
      this.selectId = '';
    },
    // 确认借出
    confirmBorrow(){
      try{
        // 确认借出请求

        this.borrowDialogVisible = false;
        this.selectId = '';
        // 重新查表
        this.getTableList()
      }catch(e){
        this.$message.error(e.message) 
      }
    }, 
    // 同意归还
    agreeLend(row) {
      this.selectId = row.bookId;
      this.lendDialogVisible = true;
    },
    // 取消归还
    cancelLend(){
      this.lendDialogVisible = false;
      this.selectId = '';
    },
    // 确认归还
    confirmLend(){
      try{
        // 确认归还请求

        this.lendDialogVisible = false;
        this.selectId = '';
        // 重新查表
        this.getTableList()
      }catch(e){
        this.$message.error(e.message) 
      }
    }, 
    handleSizeChange(val) {
      this.pageConfig.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageConfig.pageNum = val
    },
  },
};
</script>

<style lang="scss" scoped>
.records {
  padding: 20px;
  .select-condition {
    height: 54px;
    margin: 0 0 20px 0;
    background: #ffffff;
    box-shadow: 0px 0px 6px 0px rgba(0, 24, 16, 0.08);
    .el-form-item {
      margin: 7px 0;
    }
  }
  &-content {
    border: 1px solid rgba(235, 238, 245, 1);
    .pagination-wrapper {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 30px;
        margin-right: 30px;
        padding-top: 17px;
    }
  }
}
</style>