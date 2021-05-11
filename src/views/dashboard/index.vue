<!--
 * @Author: your name
 * @Date: 2021-02-01 11:45:33
 * @LastEditTime: 2021-05-11 20:10:57
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
          <!-- <div
            
            v-for="(item, index) in libraryBookList"
            :key="index"
          > -->
            <!-- <div
              class="search-container-book-item-type"
              :style="{
                color: getColor(item.sortId),
                background: getBackground(item.sortId),
              }"
            >
              {{ getText(item.sortId) }}
            </div> -->
            <!-- <img src="@/assets/image/bookpic.jpg" /> -->
            <!-- <div class="search-container-book-item-word">
              <div class="search-container-book-item-name">
                {{ item.name }}
              </div>
              <div class="search-container-book-item-btn">
                <el-button @click="showDetail(item)">查看详情</el-button>
                <el-button @click="deleteBook(item.id)" :disabled="true">下架</el-button>
              </div>
            </div> -->
            <el-card :body-style="{ padding: '0px' }" class="search-container-book-item" v-for="(item, index) in libraryBookList" :key="index">
              <img :src="item.cover ? item.cover : require('@/assets/image/nodata.png')" class="image">
              <div style="padding: 14px;">
                <span>{{item.name}}</span> 
                <span class="search-container-book-item-type" :style="{color: getColor(item.sortId), background: getBackground(item.sortId),}">{{ getText(item.sortId) }}</span>
                <div class="bottom clearfix">
                  <el-button type="text" @click="showDetail(item)">查看详情</el-button>
                  <el-button type="text" @click="deleteBook(item.id)">下架</el-button>
                </div>
              </div>
            </el-card>
            <el-dialog
              v-if="showDetailVisible"
              title="详情"
              :visible.sync="showDetailVisible"
              width="28%"
            >
              <detail :detailData="detailData"></detail>
            </el-dialog>
          <!-- </div> -->
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
      tabList: [],
      libraryBookList: [],
      pageConfig: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      showDetailVisible: false,
      // 下架图书弹窗
      deleteDialogVisible: false,
      selectBookId: "",
      sortId: 1,
      detailData: {}
    };
  },
  watch: {
    pageConfig: {
      handler(n) {
        console.log(n);
        this.getBookList();
      },
      deep: true,
      // immediate: true
    },
  },
  computed: {
    selectBookName() {
      let temp = this.libraryBookList.find((item) => {
        return item.id == this.selectBookId;
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
          case "6":
            return "rgba(238,102,102, 0.8)";
          case "7":
            return "rgba(255,220,96, 0.8)";
          case "8":
            return "rgba(92,123,217, 0.8)";
          case "9":
            return "rgba(255,145,90, 0.8)";
          case "10":
            return "rgba(14, 214, 202, 0.8)";
          case "11":
            return "rgba(238,102,102, 0.8)";
          case "12":
            return "rgba(255,220,96, 0.8)";
          case "13":
            return "rgba(92,123,217, 0.8)";
          case "14":
            return "rgba(255,145,90, 0.8)";
          case "15":
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
          case "6":
            return "rgba(238,102,102, 0.2)";
          case "7":
            return "rgba(255,220,96, 0.2)";
          case "8":
            return "rgba(92,123,217, 0.2)";
          case "9":
            return "rgba(255,145,90, 0.2)";
          case "10":
            return "rgba(14, 214, 202, 0.2)";
          case "11":
            return "rgba(238,102,102, 0.2)";
          case "12":
            return "rgba(255,220,96, 0.2)";
          case "13":
            return "rgba(92,123,217, 0.2)";
          case "14":
            return "rgba(255,145,90, 0.2)";
          case "15":
            return "rgba(14, 214, 202, 0.2)";
        }
      };
    },
    getText() {
      return function (type) {
        let temp = type.toString();
        switch (temp) {
          case "1":
            return "未分类";
          case "2":
            return "护理";
          case "3":
            return "编程";
          case "4":
            return "艺术";
          case "5":
            return "管理";
          case "6":
            return "法律";
          case "7":
            return "生活";
          case "8":
            return "励志";
          case "9":
            return "故事";
          case "10":
            return "诗歌";
          case "11":
            return "社会学";
          case "12":
            return "文学";
          case "13":
            return "哲学";
          case "14":
            return "科学";
          case "15":
            return "幽默";
        }
      };
    },
  },
  async mounted(){
    await this.getBookType()
    await this.getBookList()
  },
  methods: {
    search(v) {
      this.searchValue = v;
      // this.getBookList();
      if(this.pageConfig.pageNum == 1){
        this.getBookList();
      }else{
        this.pageConfig.pageNum = 1
      }
      // this.handleCurrentChange(1);
      // this.showList = this.contactList.filter(item => item.name.match(searchValue));
    },
    async getBookType(){
      try{
        let { code, msg, total, rows } = await this.$api.bookManageApi.searchBookType();
        if(code !== 200) throw new Error(msg)
        let arr = []
        rows.forEach(item => {
          arr.push({
            val: item.id,
            name: item.name
          })
        });
        this.$set(this.$data, 'tabList', arr)
      }catch(e){
        this.$message.error(e.message)
      }
    },
    async getBookList(){
      try{
        let sendBookObj = {
          ...this.pageConfig,
          sortId: this.sortId,
          name: this.searchValue
        }
        let { code, msg, total, rows } = await this.$api.bookManageApi.searchBookList(sendBookObj);
        if(code !== 200) throw new Error(msg)
        this.total = total;
        this.$set(this.$data, 'libraryBookList', rows)
      }catch(e){
        this.$message.error(e.message)
      }
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
      this.deleteDialogVisible = false;
      this.selectBookId = "";
    },
    // 确定下架
    async confirmDelete() {
      try {
        // 发送请求
        let { code, msg } = await this.$api.bookManageApi.deleteBook(this.selectBookId);
        if(code !== 200) throw new Error(msg)
        this.$message.success(msg)
        this.selectBookId = "";
        this.deleteDialogVisible = false;
        this.getBookList()
      } catch (e) {
        this.$message.error(e.message);
      }
    },
    // 查看详情
    showDetail(item) {
      this.detailData = item;
      this.showDetailVisible = true;
    },
    // 切换列表
    changTab(tabItem) {
      this.sortId = tabItem.val;
      this.getBookList()
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
    display: flex;
    flex-wrap: wrap;
    &-item {
      // width: 280px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 8px 0px rgba(0, 24, 16, 0.08);
      border-radius: 4px;
      margin: 5px;
      padding: 6px 20px 0 20px;
      display: flex;
      justify-content: space-between;
      .image{
        width: 250px;
        height: 254px;
      }
      &-type {
        width: 20px;
        height: fit-content;
        padding: 2px;
        margin-left: 6px;
        background: rgba($color: #000000, $alpha: 1);
        font-family: "微软雅黑";
        font-weight: 400;
        border-radius: 6px;
        font-size: 10px;
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