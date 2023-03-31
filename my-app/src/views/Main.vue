<template>
  <div id="app">
    <el-container>
      <el-aside width="auto">
        <common-side />
      </el-aside>
      <el-container>
        <el-header>
          <common-header />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonSide from "../components/CommonSide.vue";
import CommonHeader from "../components/CommonHeader.vue";
export default {
  data() {
    return {};
  },
  components: {
    CommonSide,
    CommonHeader,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0px;
}
</style>