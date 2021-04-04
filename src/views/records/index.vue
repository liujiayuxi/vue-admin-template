<!--
 * @Author: your name
 * @Date: 2021-04-04 18:17:08
 * @LastEditTime: 2021-04-04 20:05:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\records\index.vue
-->
<template>
  <div class="records">
    <div class="select-condition">
      <el-form ref="queryForm" :inline="true" label-width="68px">
        <el-form-item label="借还类型" label-width="100px" prop="type">
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
      
    </div>
  </div>
</template>

<script>
export default {
  name: "records",
  data() {
    return {
      type: "",
      options: [
        {
          label: "借",
          value: 1,
        },
        {
          label: "还",
          value: 2,
        },
      ],
      tableData: [
        {
          bookName: "javascript高级程序设计aaaaabyy程序设计aaaaaaaaa",
          press: "人民邮电出版社",
          author: "Nicholas C. Zakas（尼古拉斯•泽卡斯）",
          borrowTime: "2020-06-20",
          lendTime: "2020-07-20",
        },
        {
          bookName: "javascript高级程序设计aaaaabyy程序设计aaaaaaaaa",
          press: "人民邮电出版社",
          author: "Nicholas C. Zakas（尼古拉斯•泽卡斯）",
          borrowTime: "2020-06-20",
          lendTime: "2020-07-20",
        },
        {
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
      total: 0
    };
  },
  watch: {
    pageConfig: {
      "queryParams.pageNum": {
        handler(n) {
          this.getTableList();
        },
        deep: true,
      },
      "queryParams.pageSize": {
        handler(n) {
          this.getTableList();
        },
        deep: true,
      },
    },
  },
  methods: {
    //   查表
    getTableList() {
        try{

        }catch(e){
            this.$message.error(e.message)
        }
    },
    //   重置
    resetQuery() {},
    // 同意借出
    agreeBorrow() {},
    // 同意归还
    agreeLend() {},
    handleSizeChange() {},
    handleCurrentChange() {},
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