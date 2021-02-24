<!--
 * @Author: your name
 * @Date: 2021-02-24 17:24:13
 * @LastEditTime: 2021-02-24 17:40:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\search\tab-list.vue
-->
<template>
    <div class="tab-list">
        <a class="tab-list-item" :class="{active:active === index}" v-for="(item ,index) in list" :key="index" @click="change(item,index)">{{ item.name }}</a>

    </div>
</template>

<script>
    export default {
        name: 'tab-list',
        props: {
            list: {
                type: Array,
                required: true,
            },
            defaultIndex: {
                type: Number,
                default: 0
            },
            flag:{
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                active: 0,
            }
        },
        watch:{
            defaultIndex:{
                handler(n) {
                    this.active = n;
                },
                deep: true,
                immediate: true
            }
        },
        mounted() {

        },
        methods: {
            change(item,index) {
                if (this.flag == true){
                    this.$emit('change', item);
                    return;
                }
                item.index = index;
                this.active = index;
                this.$emit('change', item);
            }
        }
    };
</script>
<style lang="scss" scoped>
 

    .tab-list {
        user-select: none;
        display: flex;
        justify-content: flex-start;

        .active {
            background: rgba(64, 158, 255, .1);
            color: rgba(64, 158, 255, 0.8);
        }

        &-item {
            padding: 0 15px;
            height: 32px;
            line-height: 32px;
            color: rgba(74, 74, 74, 1);
            border-radius: 2px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            text-align: center;
            cursor: pointer;
            margin-right: 20px;

            &:hover {
                color: rgba(64, 158, 255, 0.8);
            }

            &:active {
                color: rgba(64, 158, 255, 1);
            }
        }

    }
</style>
