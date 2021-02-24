<!--
 * @Author: your name
 * @Date: 2021-02-01 11:45:33
 * @LastEditTime: 2021-02-24 18:52:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\search\index.vue
-->
<template>
  <div class="search-container">
    <search-input
      v-on:search="search"
      placeholder="请输入图书关键字"
    ></search-input>
    <div class="search-container-type">
      <tab-list :list="tabList"></tab-list>
      <div class="search-container-wrap">
        <div class="search-container-book" v-if="libraryBookList.length">
          <div
            class="search-container-book-item"
            v-for="(item, index) in libraryBookList"
            :key="index"
          >
            <img src="@/assets/image/bookpic.jpg" />
            <div class="search-container-book-item-word">
              <div class="search-container-book-item-name">
                {{ item.name }}
              </div>
              <div class="search-container-book-item-number">
                 库存：{{ item.inventory }}件
              </div>
              <div class="search-container-book-item-btn">
                <el-button @click="showDetail">查看详情</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="no-data" v-else-if="!libraryBookList.length">暂无数据</div>
      </div>
      <div class="pagination-wrapper">
        <el-pagination
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
    <el-dialog 
      v-if="showDetailVisible"
      title="详情" 
      :visible.sync="showDetailVisible" 
      width="30%">
    </el-dialog>
  </div>
</template>

<script>
import searchInput from "@/components/search-input.vue";
import TabList from "./tab-list.vue";

export default {
  components: { searchInput, TabList },
  data() {
    return {
      searchValue: "",
      tabList: [
        {
          name: "文学类",
          val: 0,
        },
        {
          name: "教育类",
          val: 1,
        },
        {
          name: "艺术类",
          val: 2,
        },
        {
          name: "生活类",
          val: 3,
        },
        {
          name: "科技类",
          val: 4,
        },
      ],
      libraryBookList: [{
          name: "javascript高级程序设计aaaaabyy程序设计aaaaaaaaa",
          press: "人民邮电出版社",
          inventory: 1096,
          author: 'Nicholas C. Zakas（尼古拉斯•泽卡斯）',
          ISBN: '9787115545381',
          price: '78.2'
        }],
        pageConfig: {
          pageNum: 1,
          pageSize: 20,
        },
        total: 0,
        showDetailVisible: false
    };
  },
  watch:{
    pageConfig:{
      handler(n){
        console.log(n);
        this.getLibraryBookList();
      },
      deep: true,
      // immediate: true
    }
  },
  methods: {
    search(v) {
      this.searchValue = v;
      console.log(this.searchValue);
      // this.handleCurrentChange(1);
      // this.showList = this.contactList.filter(item => item.name.match(searchValue));
    },
    handleSizeChange(val){
      this.pageSize = val;
    },
    handleCurrentChange(val){
      this.pageNum = val;
    },
    showDetail(){
      this.showDetailVisible = true
    },
    getLibraryBookList(){

    }
  },
};
</script>
<style lang="scss" scoped>
.search-container {
  margin: 30px;
  &-wrap{
    margin: 20px 10px;
  }
  &-book {
    &-item {
      width: 400px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 8px 0px rgba(0, 24, 16, 0.08);
      border-radius: 4px;
      margin: 5px;
      padding: 6px 24px;
      display: flex;
      justify-content: space-between;
      img {
        width: 130px;
        height: 165px;
      }
      &-word {
        font-family: "微软雅黑";
        font-weight: 400;
      }
      &-name {
        width: 190px;
        margin-top: 5px;
        font-size: 18px;
        // background: burlywood;
        display: -webkit-box !important;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all; // 断词
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        // vertical-align: middle;
      }
      &-number{
        font-size: 16px;
        margin: 15px 0 20px 0;
        color: #606266;
      }
    }
  }
  .no-data{
      width: 100%;
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      font-weight: 500;
      border: 1px solid #eee;
      color: rgba(162, 162, 162, 1);
    }
  .pagination-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 30px;
    margin-right: 30px;
    padding-top: 17px;
  }
}
</style>