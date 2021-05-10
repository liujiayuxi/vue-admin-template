<!--
 * @Author: your name
 * @Date: 2021-04-04 18:17:08
 * @LastEditTime: 2021-05-06 15:04:45
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

        <el-form-item label="书名" label-width="80px">
          <el-input v-model="bookName" placeholder="请输入书名" clearable></el-input>
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

    <div class="records-content" v-loading="loading">
      <el-table :data="tableData" style="width: 100%" stripe :cell-style='cellStyle'>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="type" label="类型" sortable> </el-table-column>
        <el-table-column prop="bookName" label="书名" sortable> </el-table-column>
        <el-table-column prop="press" label="出版社" sortable> </el-table-column>
        <el-table-column prop="author" label="作者" sortable> </el-table-column>
        <el-table-column prop="borrowTime" label="借书日期" sortable> </el-table-column>
        <el-table-column prop="lendTime" label="还书日期" sortable> </el-table-column>
        <el-table-column prop="brokenInfo" label="违章信息" sortable> </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="agreeLend(scope.row)" type="text" size="small" v-if="scope.row.type == '借出'"
              >归还</el-button
            ><el-button @click="showReason(scope.row)" type="text" size="small" v-if="scope.row.type == '申请未通过'"
              >查看原因</el-button
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
      <el-dialog title="归还提示" :visible.sync="lendDialogVisible" width="30%">
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
      bookName: '',
      options: [],
      tableData: [],
      pageConfig: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      // 同意借出弹窗
      borrowDialogVisible: false,
      selectId: '',
      // 同意归还弹窗
      lendDialogVisible: false,
      loading: false,
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
  async mounted(){
    // 查借还类型
    await this.getSearchType();
      // 创建时先查表
    await this.getTableList();
    // 设置定时器
    // this.timer = setInterval(() => {
    //   this.getTableList();
    // }, 5000);
  },
   beforeDestroy() {
    // clearInterval(this.timer);
  },
  computed: {
    selectBookName() {
      let temp = this.tableData.find((item) => {
        return item.id == this.selectId;
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
    // 查借还类型
    async getSearchType(){
      try{
        let { data, code, msg } = await this.$api.borrowRecordApi.searchRecordsType();
        if(code !== 200 )throw new Error(msg)
        let arr = []
        data.forEach((item,index) => {
            arr.push({
              label: item,
              value: index+1
            })
        })
        this.$set(this.$data, 'options', arr)
      }catch(e){
        this.$message.error(e.message)
      }
    },
    showReason(row){
      this.$alert(row.reason, '详情', {
          confirmButtonText: '确定',
          callback: action => {}
        });
    },
    //   查表
    async getTableList() {
      try {
          this.loading = true;
          let borrowStatus = ''
          let temp = this.options.find(item => {
            return item.value == this.type
          })
          if(temp){
              borrowStatus = temp.label
          }
          let recordsObj = {
            borrowStatus,
            borrowDateStart: this.startTime,
            borrowDateEnd: this.endTime,
            bookName: this.bookName,
            ...this.pageConfig
          }
          let { code, total, rows, msg } = await this.$api.borrowRecordApi.searchBookRecords(recordsObj)
          if( code!== 200 ) throw new Error(msg)
          this.total = total
          let tempArr = []
          rows.forEach(item => {
              tempArr.push({
                id: item.id,
                type: item.borrowStatus,
                borrowId: item.user.studentNum,
                bookId: item.bookId,
                bookName: item.book.name,
                press: item.book.publisher,
                author: item.book.author,
                borrowTime: item.borrowDate,
                lendTime: item.returnDate,
                brokenInfo: item.illegal,
                reason: item.remark
              })
          })
          this.$set(this.$data, "tableData", tempArr);
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },
    //   重置
    resetQuery() {
      this.type = ''
      this.date = ''
      this.bookName = ''
      if(this.pageConfig.pageNum == 1){
        this.getTableList()
      }else {
        this.pageConfig.pageNum = 1
      }
    },
    // 同意归还
    agreeLend(row) {
      this.selectId = row.id;
      this.lendDialogVisible = true;
    },
    // 取消归还
    cancelLend(){
      this.lendDialogVisible = false;
      this.selectId = '';
    },
    // 确认归还
    async confirmLend(){
      try{
        // 确认归还请求
        let { code, msg } = await this.$api.borrowRecordApi.returnBook({id: this.selectId})
        if(code !== 200)throw new Error(msg)
        this.$message.success(msg)
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
    cellStyle({row, columnIndex}){
      if(columnIndex == 7){
        return {color: 'rgba(255,0,0,1)'}
      } else if (row.type == "借出申请中") {
        return { color: "rgba(245, 174, 37, 1)" };
      }
    }
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