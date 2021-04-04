<!--
 * @Author: your name
 * @Date: 2021-04-03 17:28:37
 * @LastEditTime: 2021-04-04 10:39:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\dashboard\views\add-book.vue
-->
<template>
    <div class="add-book">
        <div class="add-book-top">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/dashboard/index' }">图书管理</el-breadcrumb-item>
                <el-breadcrumb-item>上架图书</el-breadcrumb-item>
            </el-breadcrumb>
            <p class="back" @click="cancel">返回</p>
        </div>
        <div class="add-book-content">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="书名">
                    <el-input v-model="form.name" style="width: 400px"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="form.author" style="width: 400px"></el-input>
                </el-form-item>
                <el-form-item label="出版社">
                    <el-input v-model="form.press" style="width: 400px"></el-input>
                </el-form-item>
                <el-form-item label="类别">
                    <el-select v-model="form.type" placeholder="请选择图书类别">
                        <el-option label="文学类" value="1"></el-option>
                        <el-option label="教育类" value="2"></el-option>
                        <el-option label="艺术类" value="3"></el-option>
                        <el-option label="生活类" value="4"></el-option>
                        <el-option label="科技类" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="tips">
                    <el-input type="textarea" v-model="form.tips" resize="none" rows="3" style="width: 400px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'add-book',
        data() {
            return {
                form: {
                    name: '',
                    author: '',
                    press: '',
                    type: '',
                    tips: ''
                }
            }
        },
        methods: {
            // 返回/取消
            cancel() {
                this.$router.push('/dashboard/index')
            },
            // 提交
            onSubmit(){
                try{
                    console.log(this.form)
                }catch(e){
                    this.$message.error(e.message)
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.add-book{
    padding: 0 20px;
    &-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .back{
            text-decoration: underline;
            cursor: pointer;
        }
    }
    &-content{
        padding: 20px;
        box-shadow: 0px 0px 8px 0px rgba(0, 24, 16, 0.08);
    }
}

</style>