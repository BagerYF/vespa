<template>
  <div class="bg">
    <div class="content">
      <div class="download">
        <div class="download-title">Download the Shopify App</div>
        <img
          src="../assets/icons/app-download.png"
          style="height: 16px; margin-top: 10px"
        />
      </div>
      <div class="link">
        <div class="link-content">
          <div class="link-title">Customer care</div>
          <RouterLink to="/faq" style="text-decoration: none"
            ><div class="link-item">FAQs</div></RouterLink
          >
          <RouterLink to="/contact-us" style="text-decoration: none"
            ><div class="link-item">Contact us</div></RouterLink
          >
          <RouterLink to="/order-shipping?num=5" style="text-decoration: none"
            ><div class="link-item">Return policy</div></RouterLink
          >
          <RouterLink to="/order-shipping?num=6" style="text-decoration: none"
            ><div class="link-item">Refunds</div></RouterLink
          >
          <RouterLink to="/order-shipping?num=0" style="text-decoration: none"
            ><div class="link-item">Orders & shipping</div></RouterLink
          >
          <RouterLink to="/order-shipping?num=1" style="text-decoration: none"
            ><div class="link-item">Delivery</div></RouterLink
          >
        </div>
        <div class="link-content">
          <div class="link-title">About</div>
          <RouterLink to="/about" style="text-decoration: none"
            ><div class="link-item">About SHOPIFY</div></RouterLink
          >
          <RouterLink to="/privacy-policy" style="text-decoration: none"
            ><div class="link-item">Privacy policy</div></RouterLink
          >
          <RouterLink to="/terms-conditions" style="text-decoration: none"
            ><div class="link-item">Terms & conditions</div></RouterLink
          >
        </div>
        <div class="link-content">
          <div class="link-title">Location</div>
          <div class="link-item">Region:</div>
          <div class="link-location" @click="countryStore.setShowRegion(true)">
            {{ countryStore.name }}, {{ countryStore.currencyCode }} $
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">©2024 SHOPIFY. All rights reserved</div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useCountryStore } from '../stores/country'

const countryStore = useCountryStore()
</script>

<style scoped>
.bg {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding: 40px 100px;
}

.content {
  display: flex;
  justify-content: center;
}

.download {
  min-width: 50%;
  margin: 0 auto;
}

.download-title {
  line-height: 20px;
}

.link {
  display: flex;
  /* justify-content: space-between; */
  width: 50%;
}

.link-title {
  line-height: 20px;
  margin-bottom: 16px;
}

.link-content {
  margin: 0 60px;
}

.link-item {
  line-height: 20px;
  color: #505050;
  margin: 10px 0;
}

.link-location {
  color: #757575;
  text-decoration: underline;
}

.copyright {
  margin-top: 84px;
  font-size: 12px;
  color: #505050;
}
</style>
