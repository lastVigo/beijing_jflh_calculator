<template>
  <div class="card-container">
    <a-card class="card">
      <h1>北京市{{ YEAR }}年度积分落户计算器</h1>
      <h3>模拟计算，仅供参考</h3>
      参考依据：
      <a href="http://rsj.beijing.gov.cn/ywsite/jflh/">官方网址</a> ｜
      <a
        href="http://rsj.beijing.gov.cn/ywsite/jflh/fwzn/202007/P020210414659128702411.pdf"
        >北京市积分落户申报手册（2021年版）</a
      >
      <a-divider />
      <div class="btns">
        <a-button type="primary" @click="goStart">开始</a-button>
      </div>
    </a-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { YEAR } from "@/data/config.ts";
import { DatePicker, Card, Button, Divider } from "ant-design-vue";
export default defineComponent({
  name: "Index",
  methods: {
    goStart() {
      this.$router.push("Start");
    },
  },
  setup() {
    return {
      YEAR,
    };
  },
});
</script>
<style scoped>
.card-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btns {
  width: 100%;
  text-align: center;
}
</style>
