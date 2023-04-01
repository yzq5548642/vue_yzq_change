<template>
  <div id="home">
    <el-row>
      <el-col :span="8" style="padding-right: 10px">
        <el-card class="box-card">
          <div class="user">
            <img
              src="../assets/images/touxiang.jpg"
              alt="用户头像显示错误"
              title="用户头像"
            />
            <div class="userInfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login_info">
            <p>上次登录的时间：<span>2023.3.31</span></p>
            <p>上次登录的时间：<span>深圳</span></p>
          </div>
        </el-card>
        <el-card class="box-card buyInfo">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding-left: 10px">
        <div class="num">
          <el-card
            class="box-card"
            :body-style="{ display: 'flex', padding: 0 }"
            v-for="item in countData"
            :key="item.name"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="value">￥{{ item.value }}</p>
              <p class="name">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card class="box-card" style="height: 280px">
          <div ref="echarts_a" style="height: 280px"></div>
        </el-card>
        <div class="graph">
          <el-card class="box-card" style="height: 260px; width: 48%">
            <div ref="echarts_b" style="height: 260px"></div>
          </el-card>
          <el-card class="box-card" style="height: 260px; width: 48%">
            <div ref="echarts_c" style="height: 240px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
#home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999;
    }
  }
  .login_info {
    p {
      font-size: 14px;
      color: #999;
      line-height: 28px;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .buyInfo {
    margin-top: 20px;
    height: 460px;
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .box-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icon {
      font-size: 30px;
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 15px;
      .value {
        font-size: 30px;
        margin-bottom: 10px;
        line-height: 30px;
      }
      .name {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
  .graph {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
}
</style>

<script>
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData, countData } = data.data;
      this.tableData = tableData;
      this.countData = countData;
      //折线图
      const echarts_a = echarts.init(this.$refs.echarts_a);
      var echarts_a_option = {};
      const { orderData, userData, videoData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      echarts_a_option.xAxis = {
        data: xAxis,
      };
      echarts_a_option.legend = {
        data: xAxis,
      };
      echarts_a_option.yAxis = {};
      echarts_a_option.series = [];
      xAxis.forEach((key) => {
        echarts_a_option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      echarts_a.setOption(echarts_a_option);
      //柱状图
      const echarts_b = echarts.init(this.$refs.echarts_b);
      var echarts_b_option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      echarts_b.setOption(echarts_b_option);
      //饼状图
      const echarts_c = echarts.init(this.$refs.echarts_c);
      var echarts_c_option = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data: videoData,
            type: "pie",
          },
        ],
      };
      echarts_c.setOption(echarts_c_option);
    });
  },
};
</script>