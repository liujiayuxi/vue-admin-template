<!--
 * @Author: your name
 * @Date: 2021-02-01 11:45:33
 * @LastEditTime: 2021-02-24 17:07:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\dashboard\index.vue
-->
<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <search-input
      v-on:search="search"
      placeholder="请输入图书关键字"
    ></search-input>
    <div class="dashboard-container-wrap">
      <div class="dashboard-container-book" v-if="bookList.length">
        <div
          class="dashboard-container-book-item"
          v-for="(item, index) in bookList"
          :key="index"
        >
          <img src="@/assets/image/bookpic.jpg" />
          <div class="dashboard-container-book-item-word">
            <div class="dashboard-container-book-item-name">
              {{ item.name }}
            </div>
            <div class="dashboard-container-book-item-price">
              价格：￥{{ item.price }}
            </div>
            <div class="dashboard-container-book-item-number">
              数量：<el-input-number
                v-model="item.number"
                :min="1"
                :max="item.maxValue"
              ></el-input-number>
            </div>
            <div class="dashboard-container-book-item-btn">
              <el-button @click="showConfirm">购买</el-button>
              <el-button>加入购物车</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="no-data" v-else-if="!bookList.length">暂无数据</div>
    </div>
    <div class="pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageConfig.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageConfig.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog 
      v-if="showBuyVisible"
      title="订单信息" 
      :visible.sync="showBuyVisible" 
      width="30%">
      <confirm-order @closeOrderDialog="closeConfirm"></confirm-order>
    </el-dialog>
  </div>
</template>

<script>
import searchInput from "@/components/search-input.vue";
import { mapGetters } from "vuex";
import ConfirmOrder from './confirm-order.vue';

export default {
  components: { searchInput, ConfirmOrder },
  name: "Dashboard",
  data() {
    return {
      searchValue: "",
      bookList: [
        {
          name: "javascript高级程序设计aaaaabyy程序设计aaaaaaaaa",
          press: "人民邮电出版社",
          number: 1,
          maxValue: 999,
          price: 80,
        },
      ],
      pageConfig: {
        pageNum: 1,
        pageSize: 20,
      },
      total: 0,
      showBuyVisible: false
    };
  },
  computed: {
    // ...mapGetters([
    //   'name'
    // ])
  },
  watch:{
    pageConfig:{
      handler(n){
        console.log(n);
        this.getBookList();
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
    getBookList(){

    },
    showConfirm(){
      this.showBuyVisible = true
    },
    closeConfirm(){
      this.showBuyVisible = false
    }
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 30px;
  &-wrap{
    margin: 20px 10px;
  }
  &-book {
    &-item {
      width: 420px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 8px 0px rgba(0, 24, 16, 0.08);
      border-radius: 4px;
      margin: 5px;
      padding: 6px 24px;
      display: flex;
      justify-content: space-between;
      img {
        width: 162px;
        height: 206px;
      }
      &-word {
        font-family: "微软雅黑";
        font-weight: 400;
        margin: 0 20px;
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
      &-price{
        // background: cadetblue;
        font-size: 16px;
        margin: 15px 0 5px 0;
        color: #606266;
      }
      &-number{
        margin: 15px 0 10px 0;
      }
      .el-input-number{
        width: 140px;
        margin-bottom: 10px;
      }
      &-btn{
        display: flex;
        justify-content: space-between;
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
