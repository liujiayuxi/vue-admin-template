<!--
 * @Author: your displayName
 * @Date: 2021-02-23 14:23:31
 * @LastEditTime: 2021-05-06 18:33:26
 * @LastEditors: Please set LastEditors
 * @remark: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\form\edit-user.vue
-->
<template>
    <el-form ref="form" :model="form" label-width="100px" label-position="left">
        <el-form-item label="角色">
            <el-select v-model="form.rule" placeholder="请选择角色">
                <el-option
                    v-for="item in ruleList"
                    :label="item.ruledisplayName"
                    :value="item.ruleId"
                    :key="item.ruleId"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="姓名">
            <el-input
                v-model="form.displayName"
                placeholder="请输入用户姓名"
                maxlength="10"
                show-word-limit
            ></el-input>
        </el-form-item>

        <el-form-item label="手机">
            <el-input
                v-model="form.phone"
                placeholder="请输入手机号码"
                maxlength="11"
                show-word-limit
            ></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
            <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
                maxlength="16"
                show-word-limit
            ></el-input>
        </el-form-item>

        <el-form-item label="借阅证编号">
            <el-input
                v-model="form.studentNum"
                maxlength="16"
                show-word-limit
                :disabled="!!type"
            ></el-input>
        </el-form-item>

        <el-form-item label="备注">
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入备注"
                v-model="form.remark"
                maxlength="50"
                show-word-limit
            >
            </el-input>
        </el-form-item>

        <el-form-item style="display: flex; justify-content: flex-end">
            <el-button type="primary" @click="onSubmit">{{type?'确认':'新建'}}</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { getLocalStorage, delLocalStorage } from "@/utils/index.js";
export default {
    displayName: "edit-user",
    data() {
        return {
            form: {
                rule: "",
                displayName: "",
                sex: "",
                email: "",
                phone: "",
                studentNum: "",
                remark: "",
            },
            ruleList: [
                {
                    ruledisplayName: "普通用户",
                    ruleId: 1,
                },
                {
                    ruledisplayName: "管理员",
                    ruleId: 2,
                },
            ]
        };
    },
    computed: {
        type() {
            // 1 编辑 0 新建
           let temp = getLocalStorage("userItem");
           return Object.keys(temp).length !== 1;
        }
    },
    mounted() {
        this.getUserItem();
    },
    beforeDestroy() {
        delLocalStorage("userItem");
    },
    methods: {
        getUserItem() {
            let temp = getLocalStorage("userItem");
            if (Object.keys(temp).length > 1) {
                // 性别转换
                if (temp.sex == "男") {
                    temp.sex = 1;
                } else if (temp.sex == "女") {
                    temp.sex = 2;
                }
                // 角色转换
                if (temp.rule == "普通用户") {
                    temp.rule = 1;
                } else if (temp.rule == "管理员") {
                    temp.rule = 2;
                }
                this.$set(this.$data, "form", temp);
            }
        },
        cancel() {
            this.$emit("closeCreateDialog");
        },
        async onSubmit() {
            let api = this.type? 'editUser': 'addUser';
            await this.$api.userManageApi[api](this.form).then(res => {
                let {code,msg} = res;
                if(+code !== 200) throw new Error(msg);
                this.$message.success(msg);
                this.cancel();
            }).catch( err => {
                console.error(err.message);
                this.$message.error(err.message);
            })
            
        },
    },
};
</script>

<style lang="scss" scoped>
</style>