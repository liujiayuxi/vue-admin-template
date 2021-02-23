<!--
 * @Author: your name
 * @Date: 2021-02-18 10:14:03
 * @LastEditTime: 2021-02-18 10:39:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\components\search-input.vue
-->
<template>
    <div class="input-wrap">
        <el-input :placeholder="placeholder" v-model="searchValue">
        </el-input>
        <admin-button class="search-pic" text='搜索' size="ls" @click="search"></admin-button>
    </div>
</template>

<script>
import adminButton from './admin-button.vue';
    export default {
        components: { adminButton },
        name: "search-input",
        props:{
            placeholder:{
                type:String,
                default:'请输入内容'
            }
        },
        data() {
            return {
                searchValue: ''
            }
        },
        methods: {
            search() {
                let searchValue = this.searchValue.trim();
                this.$emit('search', searchValue);
            }
        }
    }
</script>

<style lang="scss" scoped>
    // @import '~@/assets/scss/common.const';
    
    .el-input {
        width: 634px;
        height: 40px;
        position: relative;
        left: 90px;
        font-size: 14px;
        display: inline-block;
    }
    .input-wrap {
        width: 820px;
        margin: 0 auto;
        position: relative;

        .search-pic {
            position: absolute;
            width: 24px;
            height: 26px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
</style>
