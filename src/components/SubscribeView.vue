<template>
  <div class="bgs">
    <div class="line"></div>
    <div class="content">
      <div class="content-left">
        <div style="font-size: 18px; line-height: 25px">
          Stay ahead of the trend
        </div>
        <div style="font-size: 16px; line-height: 22px; color: #505050">
          Be the first to know about sales and the latest arrivals from our<br />
          extensive range of iconic designer brands.
        </div>
      </div>
      <div class="content-right">
        <div style="font-size: 16px; line-height: 22px; color: #757575">
          Your department preference
        </div>
        <el-checkbox-group
          v-model="checkboxGroup1"
          size="small"
          class="checkbox"
          style="display: flex; flex-direction: column; margin-top: 16px"
        >
          <el-checkbox
            label="Womenswear"
            value="Value1"
            size="large"
            class="e-checkbox"
          />
          <el-checkbox
            label="Menswear"
            value="Value2"
            size="large"
            class="e-checkbox"
          />
          <el-checkbox
            label="Kidswear"
            value="Value3"
            size="large"
            class="e-checkbox"
          />
        </el-checkbox-group>
        <el-input
          v-model="email"
          style="width: 406px; height: 40px; font-size: 16px; margin-top: 16px"
          placeholder="Your email address"
        />
        <div class="btn" @click="console.log('object')">Sign up</div>
        <div style="color: #757575">
          <span
            >By signing up you agree with our
            <span style="text-decoration: underline">Terms & Conditions</span>
            and
            <span style="text-decoration: underline">Privacy Policy</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const checkboxGroup1 = ref(['Value1'])
const email = ref([''])
</script>

<style scoped>
.bgs {
  margin: 100px 0;
}
.line {
  background-color: #e0e0e0;
  height: 1px;
}
.content {
  display: flex;
  margin-top: 40px;
}
.content-left {
  width: 50%;
}
.content-right {
  width: 50%;
}
.btn {
  width: 88px;
  height: 40px;
  background-color: #212121;
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;
}
.e-checkbox {
  height: 22px;
  margin-bottom: 8px;
}
</style>
