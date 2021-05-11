<!--
 * @Author: your name
 * @Date: 2021-02-25 09:35:34
 * @LastEditTime: 2021-05-11 11:17:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\search\detail.vue
-->
<template>
  <div class="detail">
    <div class="detail-container">
      <img :src="detailData.cover ? detailData.cover : require('@/assets/image/nodata.png')" />
      <div class="describe">
        <div class="detail-data">
          <p class="name">书名</p>
          <p class="value">{{ detailData.name }}</p>
        </div>
        <div class="detail-data">
          <p class="name">出版社</p>
          <p class="value">{{ detailData.publisher }}</p>
        </div>
        <div class="detail-data">
          <p class="name">作者</p>
          <p class="value">{{ detailData.author }}</p>
        </div>
        <div class="detail-data">
          <p class="name">ISBN</p>
          <p class="value">{{ detailData.description }}</p>
        </div>
        <div class="detail-data">
          <p class="name">类别</p>
          <p class="value">{{ detailType }}</p>
        </div>
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
      let temp = this.detailData.sortId.toString();
        switch (temp) {
          case "1":
            return "未分类";
          case "2":
            return "护理类";
          case "3":
            return "编程类";
          case "4":
            return "艺术类";
          case "5":
            return "管理类";
          case "6":
            return "法律类";
          case "7":
            return "生活类";
          case "8":
            return "励志类";
          case "9":
            return "故事类";
          case "10":
            return "诗歌类";
          case "11":
            return "社会学类";
          case "12":
            return "文学类";
          case "13":
            return "哲学类";
          case "14":
            return "科学类";
          case "15":
            return "幽默类";
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
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    img{
      width: 280px;
      height: 280px;
      margin: 0 auto;
    }
    .describe{
      // width: 250px;
      .detail-data {
        // display: flex;
        // justify-content: space-between;
        .name {
          display: inline-block;
          width: 90px;
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
          width: 180px;
          height: 14px;
          vertical-align: top;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
        }
      }
    }
    
  }
}
</style>