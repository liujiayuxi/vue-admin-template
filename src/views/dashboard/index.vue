<!--
 * @Author: your name
 * @Date: 2021-02-01 11:45:33
 * @LastEditTime: 2021-04-04 10:00:02
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
      <div class="search-container-top">
        <tab-list :list="tabList" @change="changTab"></tab-list>
        <el-button @click="addBook">上架图书</el-button>
      </div>
      <div class="search-container-wrap">
        <div class="search-container-book" v-if="libraryBookList.length">
          <div
            class="search-container-book-item"
            v-for="(item, index) in libraryBookList"
            :key="index"
          >
            <div
              class="search-container-book-item-type"
              :style="{
                color: getColor(item.type),
                background: getBackground(item.type),
              }"
            >
              {{ getText(item.type) }}
            </div>
            <!-- <img src="@/assets/image/bookpic.jpg" /> -->
            <div class="search-container-book-item-word">
              <div class="search-container-book-item-name">
                {{ item.name }}
              </div>
              <div class="search-container-book-item-btn">
                <el-button @click="showDetail">查看详情</el-button>
                <el-button @click="deleteBook(item.bookId)">下架</el-button>
              </div>
            </div>

            <el-dialog
              v-if="showDetailVisible"
              title="详情"
              :visible.sync="showDetailVisible"
              width="30%"
            >
              <detail :detailData="item"></detail>
            </el-dialog>
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
    <el-dialog title="下架提示" :visible.sync="deleteDialogVisible" width="30%">
      <span>您确认下架《{{ selectBookName }}》吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDelete">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import searchInput from "@/components/search-input.vue";
import TabList from "./tab-list.vue";
import Detail from "./detail.vue";

export default {
  components: { searchInput, TabList, Detail },
  data() {
    return {
      searchValue: "",
      tabList: [
        {
          name: "全部",
          val: 0,
        },
        {
          name: "文学类",
          val: 1,
        },
        {
          name: "教育类",
          val: 2,
        },
        {
          name: "艺术类",
          val: 3,
        },
        {
          name: "生活类",
          val: 4,
        },
        {
          name: "科技类",
          val: 5,
        },
      ],
      libraryBookList: [
        {
          bookId: 1,
          name: "javascript高级程序设计aaaaabyy程序设计aaaaaaaaa",
          press: "人民邮电出版社",
          author: "Nicholas C. Zakas（尼古拉斯•泽卡斯）",
          ISBN: "9787115545381",
          type: 1,
        },
      ],
      pageConfig: {
        pageNum: 1,
        pageSize: 20,
      },
      total: 0,
      showDetailVisible: false,
      // 下架图书弹窗
      deleteDialogVisible: false,
      selectBookId: "",
    };
  },
  watch: {
    pageConfig: {
      handler(n) {
        console.log(n);
        this.getLibraryBookList();
      },
      deep: true,
      // immediate: true
    },
  },
  computed: {
    selectBookName() {
      let temp = this.libraryBookList.find((item) => {
        return item.bookId == this.selectBookId;
      });
      if (temp) {
        return temp.name;
      }
    },
    getColor() {
      return function (type) {
        let temp = type.toString();
        switch (temp) {
          case "1":
            return "rgba(238,102,102, 0.8)";
          case "2":
            return "rgba(255,220,96, 0.8)";
          case "3":
            return "rgba(92,123,217, 0.8)";
          case "4":
            return "rgba(255,145,90, 0.8)";
          case "5":
            return "rgba(14, 214, 202, 0.8)";
        }
      };
    },
    getBackground() {
      return function (type) {
        let temp = type.toString();
        switch (temp) {
          case "1":
            return "rgba(238,102,102, 0.2)";
          case "2":
            return "rgba(255,220,96, 0.2)";
          case "3":
            return "rgba(92,123,217, 0.2)";
          case "4":
            return "rgba(255,145,90, 0.2)";
          case "5":
            return "rgba(14, 214, 202, 0.2)";
        }
      };
    },
    getText() {
      return function (type) {
        let temp = type.toString();
        switch (temp) {
          case "1":
            return "文学类";
          case "2":
            return "教育类";
          case "3":
            return "艺术类";
          case "4":
            return "生活类";
          case "5":
            return "科技类";
        }
      };
    },
  },
  methods: {
    search(v) {
      this.searchValue = v;
      console.log(this.searchValue);
      // this.handleCurrentChange(1);
      // this.showList = this.contactList.filter(item => item.name.match(searchValue));
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
    },
    // 上架图书
    addBook() {
      this.$router.push("/dashboard/add-book");
    },
    // 下架图书
    deleteBook(id) {
      this.selectBookId = id;
      this.deleteDialogVisible = true;
    },
    // 取消下架
    cancelDelete() {
      this.selectBookId = "";
      this.deleteDialogVisible = false;
    },
    // 确定下架
    confirmDelete() {
      try {
        // 发送请求

        this.selectBookId = "";
        this.deleteDialogVisible = false;
      } catch (e) {
        this.$message.error(e.message);
      }
    },
    // 查看详情
    showDetail() {
      this.showDetailVisible = true;
    },
    // 切换列表
    changTab(tabItem) {
      console.log(tabItem);
    },
    // 查询图书列表
    getLibraryBookList() {
      try {
        
      } catch (e) {
        this.$message.error(e.message);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.search-container {
  margin: 30px;
  &-type {
    margin: 20px 0;
  }
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-wrap {
    margin: 20px 10px;
  }
  &-book {
    &-item {
      width: 280px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 8px 0px rgba(0, 24, 16, 0.08);
      border-radius: 4px;
      margin: 5px;
      padding: 6px 24px;
      display: flex;
      justify-content: space-between;
      // img {
      //   width: 130px;
      //   height: 165px;
      // }
      &-word {
        font-family: "微软雅黑";
        font-weight: 400;
      }
      &-type {
        width: 20px;
        height: 60px;
        padding: 2px;
        background: rgba($color: #000000, $alpha: 1);
        font-family: "微软雅黑";
        font-weight: 400;
        border-radius: 6px;
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
      &-btn {
        margin: 15px 0;
      }
    }
  }
  .no-data {
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