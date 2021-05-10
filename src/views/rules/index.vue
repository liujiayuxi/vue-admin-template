<!--
 * @Author: your name
 * @Date: 2021-04-02 17:07:15
 * @LastEditTime: 2021-05-10 11:55:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\rules\index.vue
-->
<template>
    <div class="rules">
        <div class="title">借书规则</div>
        <div class="tips">温馨提示：请读者借书前仔细阅读读者规则，本图书管理系统将严格按照此规则进行管理。</div>
        <div class="rules-table">
            <el-table :data="tableList">
                <el-table-column
                    v-for="item in headData"
                    :key="item.prop" 
                    :label="item.label" 
                    align="center" 
                    :prop="item.prop" 
                    :show-overflow-tooltip="true" >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                        <el-button @click="detailRow(scope.row)" type="text" size="small"><i class="el-icon-s-operation"></i>查看规则详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
            title="规则详情"
            :visible.sync="dialogDetailVisible"
            width="30%"
            :before-close="handleClose">
            <span>{{detailContent}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmDetail">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "rules",
        data () {
            return {
                headData: [                
                    {
                        label: '规则编号', prop: 'id'
                    }, {
                        label: '规则描述', prop: 'borrowLibrary'
                    }, {
                        label: '超期时间（天）', prop: 'limitDay'
                    }, {
                        label: '超期赔付金额（元/天）', prop: 'overtimeFee'
                    }, {
                        label: '最大借书量（本）', prop: 'borrowNum'
                    }
                ],
                tableList: [],
                pageConfig: {
                    pageNum: 1,
                    pageSize: 10
                },
                total: 0,
                dialogDetailVisible: false,
                detailContent: ''
            }
        },
        watch: {
            pageConfig: {
                handler(n) {
                    console.log(n);
                    this.getRules();
                },
                deep: true,
                // immediate: true
            },
        },
        methods: {
            async getRules() {
                await this.$api.userManageApi.ruleList().then(res => {
                        let {code,msg, rows, total} = res;
                        if(+code !== 200) throw new Error(msg);
                        this.total = total
                        this.tableList = rows;
                    }
                ).catch( err => this.$message.error(err.message) )
            },
            handleSizeChange(val) {
                this.pageConfig.pageNum = 1
                this.pageConfig.pageSize = val
            },
            handleCurrentChange(val) {
                this.pageConfig.pageNum = val
            },
            detailRow(row){
                this.detailContent = row.borrowLibrary
                this.dialogDetailVisible = true
            },
            confirmDetail(){
                this.dialogDetailVisible = false
                this.detailContent = ''
            },
            handleClose(done){
                this.detailContent = ''
                done()
            }
        },
        mounted() {
            this.getRules();
        }
    }
</script>

<style lang="scss" scoped>
.rules{
    // padding: 40px;
    .title{
        width: 100px;
        font-size: 22px;
        margin: 20px auto;
        margin-bottom: 0;
        color: #a2a2a2;
    }
    .rules-table{
        border: 1px solid #eeeeee;
        max-height: 600px;
        overflow-y: auto;
    }
    .tips{
        color: red;
        padding: 10px;
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