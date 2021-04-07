<!--
 * @Author: your name
 * @Date: 2021-02-24 11:00:46
 * @LastEditTime: 2021-04-07 15:08:04
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
          <el-button @click="getPdf('#book', '图书概览')"
            >导出图书概览图</el-button
          >
        </div>
        <div class="chart">
          <div id="book" class="main" style="width: 500px; height: 300px"></div>
        </div>
      </div>

      <div class="item">
        <div class="item-top">
          <div class="title">用户概览</div>
          <el-button @click="getPdf('#user', '用户概览')"
            >导出用户概览图</el-button
          >
        </div>
        <div class="chart">
          <div id="user" class="main" style="width: 500px; height: 300px"></div>
        </div>
      </div>
    </div>
    <div class="statistic">
      <div class="statistic-top">
        <div class="title">近一周借书统计</div>
        <el-button @click="getPdf('#statistic', '近一周借书统计')"
          >导出借书统计</el-button
        >
      </div>
      <div class="chart">
        <div
          id="statistic"
          class="main"
          style="width: 100%; height: 300px"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "library-info",
  data() {
    return {
      bookNumber: 541215,
      userNumber: 123698,
    };
  },
  watch: {},
  mounted() {
    this.bookChartInit();
    this.userChartInit();
    this.statisticChartInit();
  },
  methods: {
    bookChartInit() {
      var myChart = this.$echarts.init(document.getElementById("book"));
      window.addEventListener("resize", function () {
        myChart && myChart.resize();
      });
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
      window.addEventListener("resize", function () {
        myChart && myChart.resize();
      });
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
    statisticChartInit() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("statistic"));
      window.addEventListener("resize", function () {
        myChart && myChart.resize();
      });

      // 指定图表的配置项和数据
      var option = {
        grid: {
          height: "75%",
          top: "10%",
          bottom: "10%",
        },
        tooltip: {},

        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed", // y轴分割线类型
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
            smooth: true
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.library-info {
  .main-title {
    width: 200px;
    font-size: 24px;
    color: #a2a2a2;
    margin: 0 auto;
    margin-top: 30px;
  }
  .main-info {
    width: 85%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    margin-top: 40px;
    .item {
      &-top {
        display: flex;
        justify-content: space-between;
      }
      .chart {
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
  .statistic {
    width: 85%;
    margin: 0 auto;
    margin-top: 40px;
    &-top {
      display: flex;
      justify-content: space-between;
    }
    .chart {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title {
      width: 150px;
      line-height: 40px;
    }
  }
}
</style>