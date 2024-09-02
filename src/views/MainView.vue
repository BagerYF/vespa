<script setup>
import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'
import RegionView from '../components/RegionView.vue'
</script>

<template>
  <div class="main">
    <HeaderView />

    <div style="flex: 1">
      <router-view />
    </div>
    <FooterView />
    <RegionView />
  </div>
</template>

<style scoped>
.main {
  width: 100vw;
  min-height: 100vh;
  /* background-color: cyan; */
  display: flex;
  flex-direction: column;
}
</style>
