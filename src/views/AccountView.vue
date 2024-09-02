<template>
  <div class="bg">
    <div style="line-height: 100px; color: #757575">Back to Shopping</div>
    <div style="display: flex">
      <div style="width: 220px; height: 200px">
        <div style="line-height: 20px; margin: 4px 0 33px">
          Account Settings
        </div>
        <div style="display: flex; flex-direction: column">
          <RouterLink
            to="/account/account-detail"
            active-class="menu-active"
            class="menu"
            >Account Details</RouterLink
          >
          <RouterLink
            to="/account/order"
            active-class="menu-active"
            class="menu"
            >My Orders</RouterLink
          >
          <RouterLink
            to="/account/address"
            active-class="menu-active"
            class="menu"
            >Address Book</RouterLink
          >
        </div>
      </div>
      <div style="flex: 1">
        <router-view />
      </div>
    </div>
    <address-detail-view />
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.bg {
  margin: 0 100px;
}
.menu {
  padding-left: 16px;
  border-left: 2px solid #eee;
  line-height: 28px;
  color: #505050;
  text-decoration: none;
}
.menu-active {
  padding-left: 16px;
  border-left: 2px solid #212121;
  line-height: 28px;
  font-weight: bold;
  color: #212121;
  text-decoration: none;
}
</style>
