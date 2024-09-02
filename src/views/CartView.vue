<template>
  <div class="bgc">
    <div v-if="cartStore.cart.data.id != null" style="display: flex">
      <div class="content-left" v-loading="cartStore.updateProductLoading">
        <div
          v-for="(item, index) in cartStore.cart.data.lines.edges"
          :key="item.node.id"
          class="content-left-item"
        >
          <div style="width: 104px; height: 160px">
            <img
              :src="item.node.merchandise.image.url"
              style="width: 100%; height: 100%; object-fit: contain"
            />
          </div>
          <div
            style="
              margin: 0 24px;
              flex: 1;
              display: flex;
              flex-direction: column;
            "
          >
            <div class="title">{{ item.node.merchandise.product.vendor }}</div>
            <div style="flex: 1; line-height: 20px">
              {{ item.node.merchandise.product.title }}
            </div>
            <div class="title">
              {{ item.node.merchandise.price.currencyCode }}
              {{ item.node.merchandise.price.amount }}
            </div>
          </div>
          <div style="flex: 1; display: flex; flex-direction: column">
            <div style="flex: 1">
              <div class="title">Size</div>
              <div style="line-height: 20px">
                {{ item.node.merchandise.title }}
              </div>
            </div>
            <div>
              <div class="title">Quantity</div>
              <div v-if="showQtyIndex != index" style="display: flex">
                <div>{{ item.node.quantity }}</div>
                <div
                  style="
                    font-size: 12px;
                    line-height: 16px;
                    color: #757575;
                    text-decoration: underline;
                    margin-left: 12px;
                  "
                  @click="
                    () => {
                      showQtyIndex = index
                      showQtySelectIndex = -1
                    }
                  "
                >
                  Change
                </div>
              </div>
              <div v-else style="display: flex; margin-top: 8px">
                <div style="position: relative">
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      padding: 0 8px;
                      width: 95px;
                      height: 30px;
                      background-color: #eee;
                      align-items: center;
                    "
                    @click="showSelectQty(index)"
                  >
                    <div>{{ item.node.quantity }}</div>
                    <img
                      src="../assets/icons/arrow-down.png"
                      style="height: 20px"
                    />
                  </div>
                  <div
                    v-if="showQtySelectIndex == index"
                    style="position: absolute; top: 30px"
                  >
                    <div
                      v-for="sItem in [1, 2, 3, 4, 5]"
                      :key="sItem"
                      style="
                        padding: 0 8px;
                        width: 95px;
                        height: 30px;
                        line-height: 30px;
                        background-color: #eee;
                      "
                      @click="selectQty(item, parseInt(sItem))"
                    >
                      {{ sItem }}
                    </div>
                  </div>
                </div>
                <div
                  style="
                    font-size: 12px;
                    line-height: 30px;
                    color: #757575;
                    text-decoration: underline;
                    margin-left: 12px;
                  "
                  @click="hideQty"
                >
                  Cancle
                </div>
              </div>
            </div>
          </div>
          <div @click="cartStore.removeProductFromCart(item.node.id)">
            <img src="../assets/icons/cross.png" height="24px" />
          </div>
        </div>
      </div>
      <div style="width: 330px">
        <div
          style="
            line-height: 28px;
            font-weight: bold;
            border-bottom: 1px solid #eee;
          "
        >
          Summary
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            line-height: 20px;
            margin-top: 16px;
          "
        >
          <div>Subtotal</div>
          <div>
            {{ cartStore.cart.data.cost.subtotalAmount.currencyCode }}
            {{ cartStore.cart.data.cost.subtotalAmount.amount }}
          </div>
        </div>
        <div style="font-size: 12px; margin-top: 16px">
          Shipping & taxes calculated at checkout
        </div>
        <div class="checkout-btn" @click="goToCheckout">
          Continue to Checkout
        </div>
        <div style="font-weight: bold; margin-top: 30px; line-height: 20px">
          Changes to return policy
        </div>
        <div style="line-height: 20px">
          Please note, we have updated our return policy
        </div>
        <div
          style="line-height: 20px; color: #757575; text-decoration: underline"
        >
          See more
        </div>
      </div>
    </div>
    <div v-else class="empty-bg">
      <div style="font-size: 30px">Shopping Bag</div>
      <div style="font-size: 16px; margin-top: 30px">
        Your shopping bag is currently empty
      </div>
      <div class="shop-btn">Continue browsing</div>
    </div>
    <benefit-view />
    <recommended-view />
    <subscribe-view />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()
const showQtyIndex = ref(-1)
const showQtySelectIndex = ref(-1)

function showSelectQty(index) {
  if (showQtySelectIndex.value == index) {
    showQtySelectIndex.value = -1
  } else {
    showQtySelectIndex.value = index
  }
}

function selectQty(item, qty) {
  if (item.node.quantity != qty) {
    cartStore.updateProductQuantityInCart(item.node.id, qty)
  }
  hideQty()
}

function hideQty() {
  showQtyIndex.value = -1
  showQtySelectIndex.value = -1
}

function goToCheckout() {
  router.push({
    path: 'checkout',
  })
}
</script>

<style scoped>
.bgc {
  margin: 0 100px;
}
.empty-bg {
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.shop-btn {
  display: flex;
  width: 176px;
  height: 40px;
  background-color: #212121;
  color: #fff;
  font-size: 16px;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
}
.title {
  line-height: 20px;
  font-weight: bold;
}
.content-left {
  flex: 1;
  padding-top: 28px;
  margin-right: 20px;
}
.content-left-item {
  display: flex;
  height: 160px;
  padding: 16px 0 40px 0;
  border-top: 1px solid #eee;
}
.checkout-btn {
  display: flex;
  height: 48px;
  background-color: #212121;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
}
</style>
