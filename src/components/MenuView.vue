<template>
  <div class="bgw" v-if="menuStore.menuIndex > -1">
    <div
      class="bgc"
      @mouseenter="menuStore.setShowMenu(true)"
      @mouseleave="menuStore.setMenuIndex(-1)"
    >
      <div class="content">
        <div
          v-for="item in kCategoryMaps[menuStore.menuIndex].children"
          :key="item.name"
          class="category"
        >
          <div style="margin-bottom: 24px">{{ item.name }}</div>
          <div
            v-for="sItem in item.children"
            :key="sItem.name"
            class="sub-category"
            @click="goToProductList"
          >
            {{ sItem.name }}
          </div>
        </div>
        <template v-if="menuStore.menuIndex == 3">
          <div>
            <div
              style="margin-top: 8px; margin-bottom: 24px; line-height: 20px"
            >
              Designers A-Z
            </div>
            <div class="alpha-bg">
              <div v-for="item in alphaArray" :key="item" class="alpha-item">
                {{ item }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { kCategoryMaps } from '@/data/menu'
import { useMenuStore } from '../stores/menu'

const menuStore = useMenuStore()

let alphaArray = ['0-9', '']

for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
  alphaArray.push(String.fromCharCode(i))
}

import { useRouter } from 'vue-router'
const router = useRouter()

function goToProductList() {
  menuStore.setMenuIndex(-1)
  router.push({
    path: `product-list`,
  })
}
</script>

<style scoped>
.bgw {
  position: absolute;
  margin-top: 0px;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.bgc {
  /* position: absolute; */
  margin-top: 0px;
  width: 100%;
  min-height: 200px;
  background-color: #fff;
}

.content {
  display: flex;
  margin: 0 100px;
}

.category {
  width: 150px;
  margin: 8px 24px 50px 0px;
  line-height: 20px;
}

.sub-category {
  height: 20px;
  margin-bottom: 10px;
}

.sub-category:hover,
.alpha-item:hover {
  text-decoration: underline;
}

.alpha-item {
  width: 50px;
  height: 20px;
  line-height: 20px;
  margin-bottom: 12px;
}

.alpha-bg {
  display: flex;
  flex-wrap: wrap;
  width: 250px;
}
</style>
