<!--
 * @Author: your name
 * @Date: 2021-02-25 09:35:34
 * @LastEditTime: 2021-04-06 18:26:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\search\detail.vue
-->
<template>
  <div class="detail">
    <div class="detail-container">
      <div class="detail-data">
        <p class="name">书名</p>
        <p class="value">{{ detailData.name }}</p>
      </div>
      <div class="detail-data">
        <p class="name">出版社</p>
        <p class="value">{{ detailData.press }}</p>
      </div>
      <div class="detail-data">
        <p class="name">作者</p>
        <p class="value">{{ detailData.author }}</p>
      </div>
      <div class="detail-data">
        <p class="name">ISBN</p>
        <p class="value">{{ detailData.ISBN }}</p>
      </div>
      <div class="detail-data">
        <p class="name">类别</p>
        <p class="value">{{ detailType }}</p>
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
  computed: {
    detailType(){
      let temp = this.detailData.type.toString();
        switch (temp) {
          case "1":
            return "文学类";
          case "2":
            return "教育类";
          case "3":
            return "艺术类";
          case "4":
            return "生活类";
          case "5":
            return "科技类";
        }
    }
  },
  methods: {
    name() {},
  },
};
</script>

<style lang="scss" scoped>
.detail {
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