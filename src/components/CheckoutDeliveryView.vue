<template>
  <div v-if="checkout.data.availableShippingRates != null">
    <div style="display: flex; align-items: center">
      <div class="bread-title-active" @click="setTabIndexs(0)">Information</div>
      <img
        src="../assets/icons/arrow-right-grey.png"
        style="height: 11px; margin: 0 14px"
      />
      <div class="bread-title-active">Shipping</div>
      <img
        src="../assets/icons/arrow-right-grey.png"
        style="height: 11px; margin: 0 14px"
      />
      <div class="bread-title">Payment</div>
    </div>
    <div class="title">Shipping Method</div>
    <div style="font-size: 12px; line-height: 17px; display: flex">
      <div style="width: 60px; color: #757575">Contact</div>
      <div style="color: #424242">{{ accountStore.customer.data.email }}</div>
    </div>
    <div style="border-top: 1px solid #eee; margin: 8px 0"></div>
    <div
      style="
        font-size: 12px;
        line-height: 17px;
        display: flex;
        margin-bottom: 50px;
      "
    >
      <div style="width: 60px; color: #757575">Ship to</div>
      <div style="color: #424242">
        {{ checkout.address.firstName }} {{ checkout.address.lastName }}
        {{ checkout.address.address1 }} {{ checkout.address.address2 }}
        {{ checkout.address.city }} {{ checkout.address.province }}
        {{ checkout.address.country }} {{ checkout.address.zip }}
      </div>
    </div>
    <div
      v-for="item in checkout.data.availableShippingRates.shippingRates"
      :key="item.handle"
      :class="{
        'method-item':
          (checkout.data.shippingLine != null &&
            checkout.data.shippingLine.handle != item.handle) ||
          checkout.data.shippingLine == null,
        'method-item-select':
          checkout.data.shippingLine != null &&
          checkout.data.shippingLine.handle == item.handle,
      }"
      class="method-item"
      v-loading="checkoutShippingLineUpdateLoading"
      @click="shippingLineUpdate(item)"
    >
      <img
        v-if="
          checkout.data.shippingLine != null &&
          checkout.data.shippingLine.handle == item.handle
        "
        src="../assets/icons/select-y.png"
        style="width: 16px"
      />
      <img v-else src="../assets/icons/select-n.png" style="width: 16px" />
      <div style="flex: 1; margin: 0 16px">{{ item.title }}</div>
      <div style="font-weight: bold">
        {{ item.priceV2.currencyCode }} {{ item.priceV2.amount }}
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
      <div style="margin-right: 24px; display: flex; align-items: center">
        <img src="../assets/icons/arrow-left.png" style="height: 16px" />
        <div style="margin-left: 6px">Return to information</div>
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
        Continue to payment
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckoutSchemas } from '@/server/graphql/schema/checkout_schema'
import { useMutation } from '@vue/apollo-composable'
import { useAccountStore } from '../stores/account'

const accountStore = useAccountStore()

const { checkout } = defineProps({
  checkout: {
    type: Object,
  },
})

const emit = defineEmits([
  'shippingLineUpdateHandle',
  'deliveryNextHandle',
  'setTabIndex',
])

const {
  mutate: checkoutShippingLineUpdate,
  loading: checkoutShippingLineUpdateLoading,
  onDone: checkoutShippingLineUpdateOnDone,
} = useMutation(CheckoutSchemas.checkoutShippingLineUpdate)

checkoutShippingLineUpdateOnDone((result) => {
  emit('shippingLineUpdateHandle', result)
})

function shippingLineUpdate(e) {
  checkoutShippingLineUpdate({
    checkoutId: checkout.data.id,
    shippingRateHandle: e.handle,
  })
}

function onSubmit() {
  emit('deliveryNextHandle')
}

function setTabIndexs(index) {
  emit('setTabIndex', index)
}
</script>

<style scoped>
.method-item {
  margin-top: 8px;
  border: 1px solid #9e9e9e;
  height: 56px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  border-radius: 2px;
}
.method-item-select {
  margin-top: 8px;
  border: 1px solid #9e9e9e;
  height: 56px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  border-radius: 2px;
  background-color: #fafafa;
}
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
</style>
