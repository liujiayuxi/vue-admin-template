<!--
 * @Author: LikSeven
 * @Date: 2021-03-03 11:00:02
 * @LastEditTime: 2021-04-21 19:42:30
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \iot-device-manage\src\pages\change-password\index.vue
 * 下面的代码没有bug!!!
-->
<template>
    <div class="change-password-warp">
        <!-- <div class="title">修改密码</div> -->
        <div class="line"></div>
        <div class="from">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="90px">
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input type="password" v-model="ruleForm.oldPassword" placeholder="请输入旧密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="ruleForm.newPassword" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" placeholder="请再次输入密码"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="btn-warp">
            <el-button type="primary" @click="submitFrom">保存</el-button>
            <el-button @click="resetForm" class="cancel">取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'change-password',
    data() {
        return {
            ruleForm: {
                oldPassword: '',
                newPassword: '',
                checkPass: ''
            },
            rules: {
                oldPassword: [
                    { required: true, message: '请输入旧密码' }
                ],
                newPassword: [
                    { validator: this.validateNewPass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: this.validatePass, trigger: 'blur'}
                ],
            },
            buttonStyle: { width: "80px", height: "30px" }
        };
    },
    methods: {
        validateNewPass(rule, value, callback){
            if (value === '') {
                callback(new Error('请输入新密码'));
            } else if (value.length < 6 || value.length > 12) {
                callback(new Error('请设置6-12位密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        },
        validatePass(rule, value, callback){
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        },
        submitFrom() {
            this.$refs.ruleForm.validate( async (valid) => {
                if(!valid)return false;
                let changeObj = {
                    oldPassword: this.ruleForm.oldPassword,
                    newPassword: this.ruleForm.newPassword,
                    id: this.$store.getters.id
                }
                // let {oldPassword,newPassword} = this.ruleForm;
                await this.$api.singleInfoApi.changePwd(changeObj).then(async res => {
                    let {code,msg} = res;
                    if(+code !== 200) throw new Error(msg);
                    this.$message.success(msg);
                    // this.$store.commit('common/commitLoginStatus', false);
                    await this.$store.dispatch('user/logout')
                    this.$router.push(`/login?redirect=${this.$route.fullPath}`)
                }).catch( err =>{
                    let {message} = err;
                    this.$message.error(message);
                })
            });
        },
        resetForm() {
            this.$refs.ruleForm.resetFields();
        }
    }
};
</script>
<style lang="scss" scoped>
.change-password-warp{
    min-height: 700px;
    background: #FFFFFF;
    box-shadow: 0px 0px 6px 0px rgba(0, 24, 16, 0.08);
    padding: 20px;
    .title{
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #3068B2;
    }
    .line{
        width: 100%;
        height: 1px;
        background: #D5DAE0;
        // margin-top: 8px;
    }
    .from{
        padding-top: 20px;
        width: 500px;
    }
    .btn-warp{
        display: flex;
        align-content: center;
        padding: 20px 0 0 90px;
        .cancel{
            margin-left: 20px;
        }
    }
}
</style>
