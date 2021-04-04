<!--
 * @Author: your name
 * @Date: 2021-02-24 11:00:46
 * @LastEditTime: 2021-04-04 18:06:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\libraryInfo\index.vue
-->
<template>
  <div class="library-info">
    <div class="main-title">图书馆概览</div>
    <div class="main-info">
        <div class="item">
            <div class="item-top">
                <div class="title">图书概览</div>
            <el-button @click="getPdf('#book', '图书概览')">导出图书概览图</el-button>
            </div>
            <div class="chart">
                <div id="book" class="main" style="width: 500px; height: 300px"></div>
            </div>
        </div>

        <div class="item">
            <div class="item-top">
                <div class="title">用户概览</div>
                <el-button @click="getPdf('#user', '用户概览')">导出用户概览图</el-button>
            </div>
            <div class="chart">
                <div id="user" class="main" style="width: 500px; height: 300px"></div>
            </div>
        </div>
    </div>
    
    
  </div>
</template>

<script>
export default {
  name: "library-info",
  data() {
    return {
      bookNumber: 541215,
      userNumber: 123698
    };
  },
  watch: {},
  mounted() {
    this.bookChartInit();
    this.userChartInit();
  },
  methods: {
    bookChartInit() {
      var myChart = this.$echarts.init(document.getElementById("book"));
      var option = {
        backgroundColor: "white",
        title: {
          text: ["{a|总图书}", `{b|${this.bookNumber}}`].join("\n"),
          textStyle: {
            rich: {
              a: {
                fontSize: 14,
                fontFamily: "Microsoft YaHei",
                fontWeight: "400",
                color: "#656565",
                lineHeight: 18,
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
          },
        },
        color: ["#3748DA", "#679CE3", "#FFBC5C", "#FF6435"],
        series: [
          {
            name: "面积模式",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["40%", "80%"],
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

    userChartInit() {
      var myChart = this.$echarts.init(document.getElementById("user"));
      var option = {
        backgroundColor: "white",
        title: {
          text: ["{a|总用户}", `{b|${this.userNumber}}`].join("\n"),
          textStyle: {
            rich: {
              a: {
                fontSize: 14,
                fontFamily: "Microsoft YaHei",
                fontWeight: "400",
                color: "#656565",
                lineHeight: 18,
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
          },
        },
        color: ["#4ADFE5", "#679CE3"],
        series: [
          {
            name: "面积模式",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["40%", "80%"],
            data: [
              { value: 4, name: "管理员 20" },
              { value: 96, name: "普通用户 480" },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.library-info{
    .main-title{
        width: 200px;
        font-size: 24px;
        color: #A2A2A2;
        margin: 0 auto;
        margin-top: 30px;
    }
    .main-info{
        width: 80%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        margin-top: 80px;
        .item {
            &-top {
                display: flex;
                justify-content: space-between;
            }
            .chart{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .title {
                width: 70px;
                line-height: 40px;
            }
        }
    }
    
}

</style>