<template>
  <div class="bgc">
    <div class="header">S H O P I F Y</div>
    <div v-loading="checkoutCreateLoading" class="content">
      <div v-show="checkout.tabIndex != -1" class="content-wrap">
        <div class="content-left">
          <checkout-address-view
            :checkout="checkout"
            @addressUpdateHandle="addressUpdateHandle"
            @shippingRateUpdateHandle="shippingRateUpdateHandle"
            v-show="checkout.tabIndex == 0"
          />
          <checkout-delivery-view
            :checkout="checkout"
            @shippingLineUpdateHandle="shippingLineUpdateHandle"
            @deliveryNextHandle="deliveryNextHandle"
            @setTabIndex="setTabIndex"
            v-show="checkout.tabIndex == 1"
          />
          <checkout-payment-view
            :checkout="checkout"
            @setTabIndex="setTabIndex"
            v-show="checkout.tabIndex == 2"
          />
          <checkout-complete-view
            :checkout="checkout"
            v-show="checkout.tabIndex == 3"
          />
        </div>
        <div class="content-right">
          <checkout-info-view
            :checkout="checkout"
            @discountHandle="discountHandle"
          />
        </div>
      </div>
    </div>
    <div class="footer">
      Refund policy &nbsp;&nbsp; Privacy policy &nbsp;&nbsp; Terms of service
    </div>
  </div>
</template>

<script setup>
import { CheckoutSchemas } from '@/server/graphql/schema/checkout_schema'
import { useMutation } from '@vue/apollo-composable'
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'

const checkout = reactive({ data: {}, address: {}, tabIndex: -1 })

const {
  mutate: checkoutCreate,
  loading: checkoutCreateLoading,
  onDone: checkoutCreateOnDone,
} = useMutation(CheckoutSchemas.checkoutCreate)

checkoutCreateOnDone((result) => {
  checkout.data = result.data.checkoutCreate.checkout
  checkout.tabIndex = 0
})

function initCheckout() {
  let localCart = localStorage.getItem('KPublicCart')
  let cart = JSON.parse(localCart)
  var params = {
    lineItems: cart.lines.edges?.map((e) => {
      return {
        variantId: e.node.merchandise.id,
        quantity: e.node.quantity,
      }
    }),
  }
  checkoutCreate({
    input: params,
  })
}

initCheckout()

function addressUpdateHandle(params) {
  checkout.data = params.result.data.checkoutShippingAddressUpdateV2.checkout
  checkout.address = params.tempAddress
}

function shippingRateUpdateHandle(params) {
  checkout.data.availableShippingRates = params.data.node.availableShippingRates
  checkout.tabIndex = 1
}

function shippingLineUpdateHandle(params) {
  checkout.data = params.data.checkoutShippingLineUpdate.checkout
}

function deliveryNextHandle() {
  if (checkout.data.shippingLine != null) {
    checkout.tabIndex = 2
  } else {
    ElMessage({
      message: 'Please select shipping method.',
      type: 'warning',
    })
  }
}

function discountHandle(params) {
  checkout.data = params
}

function setTabIndex(index) {
  checkout.tabIndex = index
}
</script>

<style scoped>
.bgc {
  background-color: #f5f5f5;
}
.content {
  min-height: calc(100vh - 256px);
  background-color: #fff;
  display: flex;
  justify-content: center;
}
.content-wrap {
  width: 100%;
  max-width: 1070px;
  padding: 80px 24px 0 24px;
  display: flex;
  justify-content: space-between;
}
.content-left {
  flex: 1;
  max-width: 570px;
}
.content-right {
  width: 330px;
}
.header {
  width: 100%;
  height: 56px;
  background-color: #f5f5f5;
  padding-left: 40px;
  line-height: 56px;
  font-weight: bold;
  font-size: 20px;
}
.footer {
  height: 178px;
  padding-left: 24px;
  padding-bottom: 22px;
  display: flex;
  align-items: end;
  font-size: 12px;
  line-height: 16px;
  color: #757575;
}
</style>
