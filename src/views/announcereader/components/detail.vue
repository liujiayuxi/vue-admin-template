<!--
 * @Author: your name
 * @Date: 2021-02-25 09:35:34
 * @LastEditTime: 2021-04-22 23:01:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\search\detail.vue
-->
<template>
  <div class="detail">
    <div class="detail-container">
      <div class="detail-data">
        <p class="name">标题</p>
        <p class="value">{{ detailData.title }}</p>
      </div>
      <div class="detail-data">
        <p class="name">发布时间</p>
        <p class="value">{{ detailData.publishDate }}</p>
      </div>
      <div class="detail-data">
        <p class="name">内容</p>
        <p class="value">{{ detailData.detail }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  props: {
      detailData: {
          type: Object,
          required: true 
      },
  },
  data() {
    return {
    //   key: value,
    };
  },
  methods: {
    name() {},
  },
};
</script>

<style lang="scss" scoped>
.detail {
  margin: -30px 0 20px 0;
  &-container {
    padding: 0 0 20px 40px;
    .detail-data {
      margin-top: 22px;
      .name {
        display: inline-block;
        width: 100px;
        height: 17px;
        vertical-align: top;
        margin-right: 20px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(162, 162, 162, 1);
      }
      .value {
        display: inline-block;
        width: 200px;
        height: 14px;
        vertical-align: top;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
      }
    }
    .btn {
      width: 120px;
      height: 40px;
      cursor: pointer;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(231, 235, 235, 1);
      border-radius: 4px;
      margin-left: 100px;
      margin-top: 37px;
      .close {
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
      }
    }
  }
}
</style>