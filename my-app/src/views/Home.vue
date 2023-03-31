<template>
  <div id="home">
    <el-row>
      <el-col :span="8">
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
            <el-table-column v-for="(val,key) in tableLabel" :prop="key" :label="val" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16"> 

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
  .buyInfo{
    margin-top: 20px;
    height: 460px;
  }
}
</style>

<script>
export default {
  data() {
    return {
        tableData: [
            {
                name:'oppo',
                todayBuy:100,
                monthBuy:300,
                totalBuy:800,
            },
            {
                name:'vivo',
                todayBuy:100,
                monthBuy:300,
                totalBuy:800,
            },
            {
                name:'苹果',
                todayBuy:100,
                monthBuy:300,
                totalBuy:800,
            },
            {
                name:'小米',
                todayBuy:100,
                monthBuy:300,
                totalBuy:800,
            },
            {
                name:'三星',
                todayBuy:100,
                monthBuy:300,
                totalBuy:800,
            },
            {
                name:'魅族',
                todayBuy:100,
                monthBuy:300,
                totalBuy:800,
            }
        ],
        tableLabel:{
            name:'课程',
            todayBuy:'今日购买',
            monthBuy:'本月购买',
            totalBuy:'总购买',
        },
        countData:[
            {
                name:'今日支付订单',
                value:1234,
                icon:'succsee',
                color:'#2ec7c9',
            },
        ]
    };
  },
};
</script>