<template>
  <div v-if="accountStore.customer.data.id != null" class="bgc">
    <div style="font-size: 18px; line-height: 26px; font-weight: bold">
      Account Details
    </div>
    <div style="border: 1px solid #eee; margin-top: 32px"></div>
    <div style="display: flex; margin-top: 12px; line-height: 20px">
      <div style="font-weight: bold; width: 120px">Name</div>
      <div>{{ accountStore.customer.data.displayName }}</div>
    </div>
    <div style="display: flex; margin-top: 12px; line-height: 20px">
      <div style="font-weight: bold; width: 120px">Email</div>
      <div>{{ accountStore.customer.data.email }}</div>
    </div>
    <div class="sign-out" @click="signOut">
      <div>Sign out</div>
    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from '../stores/account'
import { useRouter } from 'vue-router'

const router = useRouter()
const accountStore = useAccountStore()

function signOut() {
  accountStore.customer.data = {}
  localStorage.removeItem('KPublicToken')
  router.push({
    path: '/',
  })
}
</script>

<style scoped>
.bgc {
  max-width: 700px;
  min-height: 400px;
}
.sign-out {
  width: 90px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #212121;
  color: #fff;
  margin-top: 35px;
  margin-bottom: 100px;
}
</style>
