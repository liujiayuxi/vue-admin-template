<!--
 * @Author: your name
 * @Date: 2021-02-01 11:45:33
 * @LastEditTime: 2021-02-23 15:53:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\form\index.vue
-->
<template>
  <div class="form-container">
    <search-input
      v-on:search="search"
      placeholder="请输入用户关键字"
    ></search-input>
    <div class="top-bar">
      <admin-button
        text="+ 新建用户"
        @click="userDialogVisible = true"
      ></admin-button>
    </div>
    <div class="content-wrapper" v-loading="loading">
      <div class="item-wrapper" v-if="userList.length">
        <div
          class="contact-item"
          v-for="(item, index) in userList"
          :key="index"
        >
          <p class="line">
            <span class="name">{{ item.name }}</span>
            <span class="sex">{{ item.sex }}</span>
          </p>
          <p class="line">
            <span class="label">用户名</span>
            <span class="tel">{{ item.username }}</span>
          </p>
          <p class="line">
            <span class="label">手机号</span>
            <span class="tel">{{ item.mobile }}</span>
          </p>
          <div class="drop-menu-wrapper">
            <img src="@/assets/image/arrow-light.png" />
            <ul class="drop-menu">
              <li @click="resetPwd(item.userId, item.username, $event)">
                重置密码
              </li>
              <!--                                <li @click="$router.push({path:'/rbac-manage-user/edit-user',query:{...item}})" v-prems="'user:update'">编辑用户-->
              <!--                                </li>-->
              <li @click="editUser(item)">编辑用户</li>
              <li @click="deleteUser(index,item.username,$event)">删除用户</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="no-data" v-else-if="!userList.length">暂无用户数据</div>
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
    <el-dialog
    title="新建用户" :visible.sync="userDialogVisible" width="30%" destroy-on-close="true">
      <edit-user @closeCreateDialog='closeCreateDialog'></edit-user>
    </el-dialog>
  </div>
</template>

<script>
import searchInput from "@/components/search-input.vue";
import AdminButton from "@/components/admin-button.vue";
import EditUser from './edit-user.vue';
export default {
  components: { searchInput, AdminButton, EditUser },
  data() {
    return {
      searchValue: "",
      userList: [
        {
          name: "张三",
          sex: "男",
          username: "zhangsan",
          mobile: "12345678910",
        },
      ],
      pageConfig: {
        pageNum: 1,
        pageSize: 20,
      },
      total: 0,
      userDialogVisible: false
    };
  },
  watch:{
    pageConfig:{
      handler(n){
        console.log(n);
        this.getUserList();
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
    closeCreateDialog(){
      this.userDialogVisible = false;
    },
    handleSizeChange(val){
      this.pageSize = val;
    },
    handleCurrentChange(val){
      this.pageNum = val;
    },
    getUserList(){

    }
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  margin: 30px;
  .top-bar {
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .admin-button {
      margin-right: 40px;
      /*margin-top: 40px;*/
    }
  }

  .item-wrapper {
    // min-height: 540px;
    margin: 20px 10px;
    .contact-item {
      display: inline-block;
      position: relative;
      width: 24%;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 8px 0px rgba(0, 24, 16, 0.08);
      border-radius: 4px;
      margin: 5px;
      padding: 6px 24px;

      span {
        vertical-align: middle;
        margin-right: 14px;
      }

      .name {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(74, 74, 74, 1);
      }

      .sex {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(162, 162, 162, 1);
      }

      .line {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        line-height: 30px;
        height: 30px;
        margin: 0;
      }

      .drop-menu-wrapper {
        position: absolute;
        right: 10px;
        top: 10px;
        user-select: none;
        padding: 0 10px;
        cursor: pointer;
        img {
          width: 12px;
          height: 6px;
        }

        .drop-menu {
          cursor: pointer;
          position: absolute;
          top: 10%;
          left: 20%;
          display: none;
          z-index: 90;
          border-radius: 4px;
          border: 1px solid rgba(231, 235, 235, 1);
          padding: 5px 10px;
          li {
            width: 80px;
            height: 32px;
            background: rgba(255, 255, 255, 1);
            line-height: 32px;
            z-index: 10;
            text-align: center;
            list-style: none;
            a {
              white-space: nowrap;
            }
            &:hover {
              background: rgba(239, 242, 241, 1);
            }
          }
        }

        &:hover {
          .drop-menu {
            display: block;
          }
        }
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

