<template>
  <div class="bg">
    <div v-for="item in kHomeMaps" :key="item.name" @click="goToProductList">
      <div v-if="item.name == 'FirstSection'">
        <div class="first-section">
          <img
            src="https://hbimg.b0.upaiyun.com/d5ffcc83ca2ef6f5878009a33e8f686a47ca28582cc78-WSFdfB_fw658"
            style="width: 50%"
          />
          <div class="first-section-right">
            <div style="font-size: 60px; line-height: 60px">
              BLACK FRIDAY:Up to 50% off
            </div>
            <div
              style="
                font-size: 20px;
                line-height: 24px;
                color: #505050;
                margin: 16px 0 40px;
              "
            >
              Up to 50% off FW23 with an extra 10% off using code‘BLACK10’ at
              checkout
            </div>
            <div class="btn" @click="console.log('object')">Shop now</div>
          </div>
        </div>
      </div>
      <div v-else-if="item.name == 'PopularSection'" class="popular-section">
        <div
          v-for="sItem in item.items"
          :key="sItem.brand"
          style="margin-right: 20px"
        >
          <img
            src="https://img.kuajingyan.com/home/2020-12-02/38100c7624beb631.png"
            style="width: 100%"
          />
          <div style="margin-top: 16px; font-size: 20px; line-height: 24px">
            {{ sItem.brand }}
          </div>
          <div
            style="
              margin-top: 4px;
              font-size: 16px;
              line-height: 22px;
              color: #505050;
            "
          >
            {{ sItem.productName }}
          </div>
          <div
            style="
              margin-top: 16px;
              font-size: 14px;
              line-height: 20px;
              color: #757575;
              text-decoration: underline;
            "
          >
            Shop now
          </div>
        </div>
      </div>
      <div
        v-else-if="item.name == 'NewArrivalSection'"
        class="new-arrival-section"
      >
        <div
          style="
            margin-top: 16px;
            font-size: 32px;
            line-height: 35px;
            text-align: center;
          "
        >
          {{ item.title }}
        </div>
        <div
          style="
            margin-top: 16px;
            margin-bottom: 40px;
            font-size: 16px;
            line-height: 22px;
            text-align: center;
          "
        >
          {{ item.subTitle }}
        </div>
        <div style="display: flex">
          <div
            v-for="sItem in item.items"
            :key="sItem.brand"
            style="margin-right: 20px; flex: 1"
          >
            <img
              src="https://img.kuajingyan.com/home/2020-12-02/38100c7624beb631.png"
              width="100%"
            />
            <div
              style="
                margin-top: 16px;
                font-size: 16px;
                line-height: 22px;
                text-align: center;
              "
            >
              {{ sItem.text }}
            </div>
          </div>
        </div>
        <div class="btn_center" @click="console.log('object')">Shop now</div>
      </div>
      <div v-else-if="item.name == 'PrimarySection'" class="primary-section">
        <div
          v-for="sItem in item.items"
          :key="sItem.brand"
          style="margin-right: 20px"
        >
          <img
            src="https://img.kuajingyan.com/home/2020-12-02/38100c7624beb631.png"
            style="width: 100%"
          />
          <div style="margin-top: 16px; font-size: 20px; line-height: 24px">
            {{ sItem.brand }}
          </div>
          <div
            style="
              margin-top: 4px;
              font-size: 16px;
              line-height: 22px;
              color: #505050;
            "
          >
            {{ sItem.productName }}
          </div>
          <div
            style="
              margin-top: 16px;
              font-size: 14px;
              line-height: 20px;
              color: #757575;
              text-decoration: underline;
            "
          >
            Shop now
          </div>
        </div>
      </div>
      <div
        v-else-if="item.name == 'NewSeasonSection'"
        class="new-season-section"
      >
        <div
          style="
            margin-top: 16px;
            font-size: 32px;
            line-height: 35px;
            text-align: center;
          "
        >
          {{ item.title }}
        </div>
        <div
          style="
            margin-top: 16px;
            margin-bottom: 40px;
            font-size: 16px;
            line-height: 22px;
            text-align: center;
          "
        >
          {{ item.subTitle }}
        </div>
        <div style="display: flex">
          <div
            v-for="sItem in item.items"
            :key="sItem.brand"
            style="margin-right: 20px; flex: 1"
          >
            <img
              src="https://img.kuajingyan.com/home/2020-12-02/38100c7624beb631.png"
              width="100%"
            />
            <div
              style="
                margin-top: 16px;
                font-size: 16px;
                line-height: 22px;
                text-align: center;
              "
            >
              {{ sItem.text }}
            </div>
          </div>
        </div>
        <div class="btn_center" @click="console.log('object')">Shop now</div>
      </div>
    </div>
    <SubscribeView />
  </div>
</template>

<script setup>
import { kHomeMaps } from '@/data/home'
import SubscribeView from '../components/SubscribeView.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

function goToProductList() {
  router.push({
    path: `product-list`,
  })
}
</script>

<style scoped>
.bg {
  margin: 10px 100px;
}
.first-section {
  display: flex;
  justify-content: center;
  align-items: center;
}
.first-section-right {
  margin-left: 104px;
}
.btn {
  width: 105px;
  height: 40px;
  background-color: #212121;
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn_center {
  width: 105px;
  height: 40px;
  background-color: #212121;
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
}
.popular-section {
  display: flex;
  margin-top: 124px;
}
.new-arrival-section {
  margin-top: 124px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.primary-section {
  display: flex;
  margin-top: 124px;
}
.new-season-section {
  margin-top: 124px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
