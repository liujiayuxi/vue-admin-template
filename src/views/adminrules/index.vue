<!--
 * @Author: your name
 * @Date: 2021-04-02 17:07:15
 * @LastEditTime: 2021-05-10 11:35:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\rules\index.vue
-->
<template>
    <div class="rules">
        <div class="title">借书规则</div>
        <div class="add">
            <div class="tips">温馨提示：请读者借书前仔细阅读读者规则，本图书管理系统将严格按照此规则进行管理。</div>
            <el-button type="primary" @click="addRules">添加规则</el-button>
        </div>
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
                        <el-button @click="editRow(scope.row)" type="text" size="small"><i class="el-icon-edit"></i>编辑</el-button>
                        <el-button @click="deleteRow(scope.row)" type="text" size="small"><i class="el-icon-delete"></i>删除</el-button>
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
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="40%" :before-close="beforeClose">
            <el-form label-position="left" style="margin-left: 40px">
                <el-form-item v-for="(item, index) in form" :key="index" :label="item.label" label-width="160px">
                     <el-input v-if="item.type == 'input'" v-model="item.value" style="width:80%"></el-input>
                     <el-input v-else-if="item.type == 'textarea'" type="textarea" v-model="item.value" style="width:80%" resize="none" rows="4"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelDialog">取 消</el-button>
                <el-button type="primary" @click="confirmDialog">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="删除提示"
            :visible.sync="deleteDialogVisible"
            v-if="deleteDialogVisible"
            width="40%"
            :before-close="beforeDeleteClose"
            >
            <span>您确认删除编号为 '{{ id }}' 的规则吗?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDelete">取 消</el-button>
                <el-button type="primary" @click="confirmDelete">确 定</el-button>
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
                dialogFormVisible: false,
                dialogTitle: '添加规则',
                form: [{
                    label: '超期时间（天）',
                    type: 'input',
                    prop: 'limitDay',
                    value: ''
                },{
                    label: '超期赔付金额（元/天）',
                    type: 'input',
                    prop: 'overtimeFee',
                    value: ''
                },{
                    label: '最大借书量（本）',
                    type: 'input',
                    prop: 'borrowNum',
                    value: ''
                },{
                    label: '规则描述',
                    type: 'textarea',
                    prop: 'borrowLibrary',
                    value: ''
                },],
                id: '',
                deleteDialogVisible: false
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
                        let {code,msg, rows,total} = res;
                        if(+code !== 200) throw new Error(msg);
                        this.total = total
                        this.tableList = rows;
                    }
                ).catch( err => this.$message.error(err.message) )
            },
            addRules(){
                this.dialogFormVisible = true
            },
            editRow(row){
                console.log(row)
                this.id = row.id
                for(let key in row){
                    this.form.forEach(item => {
                        if(item.prop == key){
                            item.value = row[key]
                        }
                    });
                }
                this.dialogTitle = '编辑规则'
                this.dialogFormVisible = true
                
            },
            deleteRow(row){
                this.id = row.id
                this.deleteDialogVisible = true
            },
            handleSizeChange(val) {
                this.pageConfig.pageNum = 1
                this.pageConfig.pageSize = val;
            },
            handleCurrentChange(val) {
                this.pageConfig.pageNum = val;
            },
            cancelDialog(){
                this.dialogFormVisible = false
                this.form.forEach(item => {
                    item.value = ''
                })
                this.id = ''
            },
            confirmDialog(){
                let confirmObj = {}
                this.form.forEach(item => {
                    confirmObj[item.prop] = item.value
                })
                if(this.dialogTitle == '编辑规则'){
                    confirmObj.id = this.id
                }
                console.log(confirmObj)
                this.cancelDialog()
            },
            beforeClose(done){
                this.form.forEach(item => {
                    item.value = ''
                })
                this.id = ''
                done()
            },
            beforeDeleteClose(done){
                this.id = ''
                done()
            },
            cancelDelete(){
                this.deleteDialogVisible = false
                this.id = ''
            },
            confirmDelete(){
                console.log(this.id)
                this.cancelDelete()
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
    .add{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0 10px 10px 0;
        .tips{
            color: red;
            padding-left: 10px;
        }
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