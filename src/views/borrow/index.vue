<!--
 * @Author: your name
 * @Date: 2021-02-08 16:53:48
 * @LastEditTime: 2021-02-25 19:44:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\borrow\index.vue
-->
<template>
  <div class="borrow-container">
    <search-input
      v-on:search="search"
      placeholder="请输入图书关键字"
    ></search-input>
    <div class="item">
      <div class="item-top">
        <div class="title">输电</div>
        <el-select></el-select>
      </div>
      
      <div id="main" style="width: 400px; height: 300px"></div>
    </div>
    
    <button @click="getPdf('#main')">download pdf</button>
  </div>
</template>

<script>
import searchInput from "@/components/search-input.vue";
export default {
  components: { searchInput },

  data() {
    return {
      searchValue: "",
      htmlTitle: "test",
      number: 541215,
    };
  },
  watch: {},
  mounted() {
    this.chartInit();
  },
  methods: {
    search(v) {
      this.searchValue = v;
      console.log(this.searchValue);
      // this.handleCurrentChange(1);
      // this.showList = this.contactList.filter(item => item.name.match(searchValue));
    },
    chartInit() {
      var myChart = this.$echarts.init(document.getElementById("main"));
      var option = {
        backgroundColor: "white",
        title: {
          text: ["{a|输电}", `{b|${this.number}}`, "{a|个}"].join("\n"),
          textStyle: {
            rich: {
              a: {
                fontSize: 14,
                fontFamily: "Microsoft YaHei",
                fontWeight: "400",
                color: "#656565",
                lineHeight: 24,
              },
              b: {
                fontSize: 24,
                fontFamily: "Microsoft YaHei",
                fontWeight: "bold",
                color: "#4A4A4A",
              },
            },
          },
          x: "center",
          y: "center",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            // dataView: { show: true, readOnly: false },
            // restore: { show: true },
            // saveAsImage: { show: true },
          },
        },
        color: ["#3748DA", "#679CE3", "#FFBC5C", "#FF6435"],
        series: [
          {
            name: "面积模式",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["40%", "70%"],
            data: [
              { value: 38, name: "在线9999个" },
              { value: 32, name: "离线9999个" },
              { value: 30, name: "未连接9999个" },
              { value: 40, name: "异常9999个" },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    // convertCanvasToImage() {
    //   let _this = this;
    //   console.log(123)
    //     html2canvas(document.getElementById('main'), {
    //         onrendered: function(canvas) {
    //             document.body.appendChild(canvas);
    //             _this.createPDFObject(canvas.toDataURL("image/jpeg"));
    //         }
    //     });
    // },

    // createPDFObject(imgData) {
    //     var doc = new jsPDF('p', 'pt');
    //     doc.addImage(imgData, 5, 5, 600, 300, 'img');
    //     doc.save('test.pdf')
    // }
  },
};
</script>

<style lang="scss" scoped>
.item{
  // width: 100%;
  // height: 100%;
  &-top{
    display: flex;
    justify-content: space-between;
    width: 500px;
  }
  .title{
    width: 50px;
    line-height: 40px;
  }
}
</style>