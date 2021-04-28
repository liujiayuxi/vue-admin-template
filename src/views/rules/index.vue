<!--
 * @Author: your name
 * @Date: 2021-04-02 17:07:15
 * @LastEditTime: 2021-04-28 21:14:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\rules\index.vue
-->
<template>
    <div class="rules">
        <div class="title">借书规则</div>
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
            </el-table>
        </div>
        <div class="tips">温馨提示：请读者借书前仔细阅读读者规则，本图书管理系统将严格按照此规则进行管理。</div>
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
                tableList: []
            }
        },
        methods: {
            async getRules() {
                await this.$api.userManageApi.ruleList().then(res => {
                        let {code,msg, rows} = res;
                        if(+code !== 200) throw new Error(msg);
                        this.tableList = rows;
                    }
                ).catch( err => this.$message.error(err.message) )
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
}
</style>