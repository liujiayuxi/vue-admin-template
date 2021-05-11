<!--
 * @Author: your displayName
 * @Date: 2021-02-01 11:45:33
 * @LastEditTime: 2021-05-11 14:47:01
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
                @click="openCreateDialog"
            ></admin-button>
        </div>
        <div class="content-wrapper">
            <div class="item-wrapper" v-if="userList.length">
                <div
                    class="contact-item"
                    v-for="(item, index) in userList"
                    :key="index"
                >
                    <p class="line">
                        <span class="displayName">{{ item.displayName }}</span>
                        <span class="sex">{{ item.sex }}</span>
                    </p>
                    <p class="line">
                        <span class="label">角色</span>
                        <span class="tel">{{ item.userType }}</span>
                    </p>
                    <p class="line">
                        <span class="label">借阅证编号</span>
                        <span class="tel">{{ item.studentNum }}</span>
                    </p>
                    <div class="drop-menu-wrapper">
                        <img src="@/assets/image/arrow-light.png" />
                        <ul class="drop-menu">
                            <li
                                @click="
                                    resetPwd(item.id,item.studentNum, item.displayName, $event)
                                "
                            >
                                重置密码
                            </li>
                            <li @click="editUser(item)">编辑用户</li>
                            <li
                                @click="
                                    deleteUser(item.id, item.displayName, $event)
                                "
                            >
                                删除用户
                            </li>
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
            v-if="userDialogVisible"
            :title="dialogTitleValue"
            :visible.sync="userDialogVisible"
            width="30%"
        >
            <edit-user @closeCreateDialog="closeDialog"></edit-user>
        </el-dialog>
    </div>
</template>

<script>
import searchInput from "@/components/search-input.vue";
import AdminButton from "@/components/admin-button.vue";
import EditUser from "./edit-user.vue";
import { setLocalStorage } from "@/utils/index.js";
export default {
    components: { searchInput, AdminButton, EditUser },
    data() {
        return {
            searchValue: "",
            dialogTitleValue: "",
            userList: [],
            pageConfig: {
                pageNum: 1,
                pageSize: 20,
            },
            total: 0,
            userDialogVisible: false,
        };
    },
    watch: {
        pageConfig: {
            handler(n) {
                this.getUserList();
            },
            deep: true,
        },
    },
    computed: {
        params() {
            return {
                ...this.pageConfig,
                sortId: 1,
                displayName: this.searchValue
            }
        }
    },
    mounted() {
        this.getUserList();
    },
    methods: {
        search(v) {
            this.searchValue = v;
            this.getUserList();
        },
        openCreateDialog() {
            this.dialogTitleValue = "新建用户";
            this.userDialogVisible = true;
            setLocalStorage("userItem", {});
        },
        editUser(item) {
            this.dialogTitleValue = "编辑用户";
            setLocalStorage("userItem", item);
            this.userDialogVisible = true;
        },
        async resetPwd(id,studentNum, displayName, event) {
            event.stopPropagation();
            await this.$confirm(`确认重置${displayName}的密码吗?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
            .then(async () => {
                    await this.$api.userManageApi.resetPwd(id).then(res => {
                        let {code,msg} = res;
                        if(+code !== 200) throw new Error(msg);
                        this.$message.success(msg);
                        this.getUserList();
                    }
                ).catch( err => this.$message.error(err.message) )
            })
        },
        async deleteUser(id, displayName, event) {
            event.stopPropagation();
            await this.$confirm(`确认删除用户${displayName}吗?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
            .then(async () => {
                await this.$api.userManageApi.delUser(id).then(res => {
                        let {code,msg} = res;
                        if(+code !== 200) throw new Error(msg);
                        this.$message.success(msg);
                        this.getUserList();
                    }
                ).catch( err => this.$message.error(err.message) )
            })
        },
        closeDialog() {
            this.userDialogVisible = false;
            this.getUserList();
        },
        handleSizeChange(val) {
            this.pageConfig.pageNum = 1
            this.pageConfig.pageSize = val;
        },
        handleCurrentChange(val) {
            this.pageConfig.pageNum = val;
        },
        async getUserList() {
            try {
                let {code,msg,rows, total} = await this.$api.userManageApi.userList(this.params);
                if(+code !== 200) throw new Error(msg);
                this.total = total
                let arr = rows.map((item) => {
                    if (item.userType == 'normal') {
                        item.userType = "普通用户";
                    } else if (item.userType == 'superAdmin') {
                        item.userType = "管理员";
                    }

                    if (item.sex == 1) {
                        item.sex = "男";
                    } else if (item.sex == 2) {
                        item.sex = "女";
                    }
                    return item;
                });
                this.$set(this.$data, "userList", arr);
            } catch (e) {
                this.$message.error(e.message);
            }
        },
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

            .displayName {
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

