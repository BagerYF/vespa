<template>
  <div class="bgc">
    <div v-if="accountStore.customer.data.id != null" class="bgw">
      <div
        style="
          font-size: 18px;
          line-height: 26px;
          font-weight: bold;
          margin-bottom: 32px;
        "
      >
        My Orders
      </div>
      <div
        v-for="item in accountStore.customer.data.orders.edges"
        :key="item.node.id"
        style="border-top: 1px solid #eee; padding: 12px 8px"
        @click="goToOrderDetail(item)"
      >
        <div
          style="
            line-height: 20px;
            color: #757575;
            display: flex;
            justify-content: space-between;
          "
        >
          <div>#{{ item.node.orderNumber }}</div>
          <div>
            {{ item.node.totalPriceV2.currencyCode }}
            {{ item.node.totalPriceV2.amount }}
          </div>
        </div>
        <div style="display: flex; margin: 8px 0">
          <img
            v-for="sItem in item.node.lineItems.edges"
            :key="sItem.node.title"
            :src="sItem.node.variant.image.url"
            style="
              width: 44px;
              height: 66px;
              object-fit: contain;
              margin-right: 8px;
            "
          />
        </div>
        <div
          style="
            line-height: 20px;
            color: #757575;
            display: flex;
            justify-content: space-between;
          "
        >
          <div>
            {{
              [...item.node.lineItems.edges].reduce((a, b) => {
                return a + b.node.quantity
              }, 0)
            }}
            items
          </div>
          <div>View order detail</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from '../stores/account'
import { useRouter } from 'vue-router'

const router = useRouter()
const accountStore = useAccountStore()

function goToOrderDetail(item) {
  router.push({
    path: '/order-detail',
    query: {
      id: item.node.id,
    },
  })
}
</script>

<style scoped>
.bgc {
  display: flex;
  justify-content: center;
}
.bgw {
  width: 100%;
  max-width: 700px;
  min-height: 400px;
}
</style>
