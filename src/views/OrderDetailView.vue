<template>
  <div class="bgc" v-if="detail.data.id != null">
    <div style="width: 160px; line-height: 30px; color: #757575">
      &lt; Back to orders
    </div>
    <div style="flex: 1; display: flex; justify-content: center">
      <div style="width: 100%; max-width: 700px; min-height: 400px">
        <div style="font-size: 18px; line-height: 26px; font-weight: bold">
          Order #{{ detail.data.orderNumber }}
        </div>
        <div style="line-height: 20px; color: #757575">
          {{ detail.data.processedAt.replace('T', ' ').replace('Z', '') }}
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-top: 48px;
          "
        >
          <div style="width: 33%">
            <div class="content-item">Delivery Address</div>
            <div style="line-height: 20px; color: #505050">
              {{ detail.data.shippingAddress.name }}
              <br />
              {{ detail.data.shippingAddress.address1 }}
              {{ detail.data.shippingAddress.address2 }}
              <br />
              {{ detail.data.shippingAddress.city }}
              {{ detail.data.shippingAddress.province }}
              {{ detail.data.shippingAddress.zip }}
              <br />
              {{ detail.data.shippingAddress.phone }}
            </div>
          </div>
          <div style="width: 33%">
            <div class="content-item">Payment</div>
            <div style="line-height: 20px; color: #505050">Ending 9879</div>
          </div>
          <div style="width: 33%">
            <div class="content-item">Order Summary</div>
            <div class="summary-item">
              <div>Subtotal</div>
              <div>
                {{ detail.data.subtotalPriceV2.currencyCode }}
                {{ detail.data.subtotalPriceV2.amount }}
              </div>
            </div>
            <div class="summary-item">
              <div>Shipping</div>
              <div>
                {{ detail.data.totalShippingPriceV2.currencyCode }}
                {{ detail.data.totalShippingPriceV2.amount }}
              </div>
            </div>
            <div class="summary-item">
              <div>Taxes and duties</div>
              <div>
                {{ detail.data.totalTaxV2.currencyCode }}
                {{ detail.data.totalTaxV2.amount }}
              </div>
            </div>
            <div class="summary-item" style="font-weight: bold">
              <div>Total</div>
              <div>
                {{ detail.data.totalPriceV2.currencyCode }}
                {{ detail.data.totalPriceV2.amount }}
              </div>
            </div>
          </div>
        </div>
        <div
          style="
            margin-top: 56px;
            line-height: 20px;
            font-weight: bold;
            padding-bottom: 16px;
            border-bottom: 1px solid #eee;
          "
        >
          Items({{
            [...detail.data.lineItems.edges].reduce((a, b) => {
              return a + b.node.quantity
            }, 0)
          }})
        </div>
        <div
          v-for="item in detail.data.lineItems.edges"
          :key="item.node.title"
          style="
            display: flex;
            padding-bottom: 12px;
            border-bottom: 1px solid #eee;
          "
        >
          <img
            :src="item.node.variant.image.url"
            style="width: 94px; height: 140px; object-fit: contain"
          />
          <div
            style="
              flex: 1;
              margin-left: 40px;
              display: flex;
              flex-direction: column;
              height: 140px;
            "
          >
            <div>{{ item.node.variant.product.productType }}</div>
            <div style="flex: 1">{{ item.node.title }}</div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                line-height: 16px;
                color: #757575;
              "
            >
              <div>Size:{{ item.node.variant.title }}</div>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                line-height: 16px;
                color: #757575;
              "
            >
              <div>Qty:{{ item.node.quantity }}</div>
              <div style="color: #212121; font-size: 14px; font-weight: bold">
                {{ item.node.originalTotalPrice.currencyCode }}
                {{ item.node.originalTotalPrice.amount }}
              </div>
            </div>
          </div>
        </div>
        <div
          style="
            height: 290px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <img src="../assets/icons/help.png" style="width: 24px" />
          <div style="line-height: 20px; font-weight: bold; margin-top: 8px">
            Need help?
          </div>
          <div style="line-height: 20px; margin-top: 8px">
            Our customer service team is available 7-days a week
          </div>
          <div
            style="
              line-height: 20px;
              color: #757575;
              text-decoration: underline;
              margin-top: 8px;
            "
          >
            Help & Contact
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAccountStore } from '../stores/account'
const accountStore = useAccountStore()

let route = useRoute()
let { query } = toRefs(route)

const detail = reactive({
  data: {},
})

if (accountStore.customer.data.id != null) {
  detail.data = accountStore.customer.data.orders.edges.filter(
    (e) => e.node.id == query.value.id
  )[0].node
}

watch([accountStore.customer], () => {
  detail.data = accountStore.customer.data.orders.edges.filter(
    (e) => e.node.id == query.value.id
  )[0].node
})
</script>

<style scoped>
.bgc {
  display: flex;
  margin: 0 100px;
  padding-top: 24px;
}
.content-item {
  line-height: 20px;
  font-weight: bold;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
  margin-bottom: 8px;
}
.summary-item {
  display: flex;
  justify-content: space-between;
  line-height: 20px;
  color: #505050;
}
</style>
