<!--
 * @Author: your name
 * @Date: 2021-04-02 17:07:15
 * @LastEditTime: 2021-04-22 21:46:32
 * @LastEditors: LikSeven
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\rules\index.vue
-->
<template>
    <div class="rules">
        <div class="title">借书规则</div>
        <div>
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
    padding: 40px;
    .title{
        font-size: 18px;
        margin-bottom: 20px;
    }
}
</style>