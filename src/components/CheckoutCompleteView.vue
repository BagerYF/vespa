<template>
  <div v-if="checkout.tabIndex == 3">
    <img src="../assets/icons/success.png" style="height: 48px" />
    <div style="margin-top: 8px; font-size: 12px; line-height: 16px">
      Order #9999
    </div>
    <div style="font-size: 20px; line-height: 24px">
      Thank you {{ accountStore.customer.data.displayName }}
    </div>
    <div class="title">Customer information</div>

    <div class="content-item">
      <div style="font-weight: bold">Email</div>
      <div style="color: #616161">{{ accountStore.customer.data.email }}</div>
    </div>
    <div class="content-item">
      <div style="font-weight: bold">Shipping address</div>
      <div style="color: #616161">
        {{ checkout.address.firstName }} {{ checkout.address.lastName }}
        {{ checkout.address.address1 }} {{ checkout.address.address2 }}
        {{ checkout.address.city }} {{ checkout.address.province }}
        {{ checkout.address.country }} {{ checkout.address.zip }}
      </div>
    </div>
    <div class="content-item">
      <div style="font-weight: bold">Delivery method</div>
      <div style="color: #616161">{{ checkout.data.shippingLine.title }}</div>
    </div>
    <div class="content-item">
      <div style="font-weight: bold">Payment method</div>
      <div style="color: #616161">ending with 4444</div>
    </div>
    <div class="content-item">
      <div style="font-weight: bold">Billing address</div>
      <div style="color: #616161">
        {{ checkout.address.firstName }} {{ checkout.address.lastName }}
        {{ checkout.address.address1 }} {{ checkout.address.address2 }}
        {{ checkout.address.city }} {{ checkout.address.province }}
        {{ checkout.address.country }} {{ checkout.address.zip }}
      </div>
    </div>

    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 64px 0;
      "
    >
      <div
        style="
          margin-right: 24px;
          display: flex;
          align-items: center;
          font-size: 12px;
        "
      >
        <div>Need help?</div>
        <div style="font-weight: bold; margin-left: 4px">Contact us</div>
      </div>
      <div
        @click="onSubmit"
        style="
          height: 48px;
          width: 200px;
          font-size: 16px;
          font-weight: bold;
          background-color: #212121;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        Continue to Shopping
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from '../stores/account'
import { useRouter } from 'vue-router'

const router = useRouter()

const accountStore = useAccountStore()

const { checkout } = defineProps({
  checkout: {
    type: Object,
  },
})

function onSubmit() {
  router.push({
    path: '/',
  })
}
</script>

<style scoped>
.bread-title {
  font-size: 12px;
  line-height: 16px;
  color: #bdbdbd;
}
.bread-title-active {
  font-size: 12px;
  line-height: 16px;
  color: #212121;
}
.title {
  font-size: 20px;
  line-height: 24px;
  margin: 32px 0;
}
.content-item {
  line-height: 20px;
  padding-bottom: 8px;
  margin-top: 8px;
  border-bottom: 1px solid #eee;
}
</style>
