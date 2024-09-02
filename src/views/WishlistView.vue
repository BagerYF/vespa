<template>
  <div class="bgc">
    <div style="display: flex; align-items: center; margin-top: 8px">
      <div
        style="
          font-size: 24px;
          line-height: 28px;
          font-weight: bold;
          margin-right: 12px;
        "
      >
        Your Wishlist
      </div>
      <img src="../assets/icons/heart-b.png" style="width: 16px" />
      <div
        style="color: #757575; margin-left: 8px"
        v-if="wishlistStore.wishlist.data.length > 0"
      >
        {{ wishlistStore.wishlist.data.length }} Items
      </div>
    </div>
    <div v-if="wishlistStore.wishlist.data.length == 0">
      <div style="line-height: 20px">Your wishlist is empty</div>
      <div style="line-height: 20px; color: #757575">
        Add your favorite items to this wishlist as you shop
      </div>
      <div style="line-height: 20px; margin-top: 8px">Start shopping</div>
    </div>
    <div style="display: flex; flex-wrap: wrap; margin: 50px 0">
      <div
        v-for="item in wishlistStore.wishlist.data"
        :key="item.id"
        style="width: 24%"
        @click="goToProductDetail(item)"
      >
        <div style="margin: 30px">
          <div style="display: flex; justify-content: end">
            <div class="delete-bg" @click="wishlistStore.removeWishlist(item)">
              <img src="../assets/icons/cross.png" style="width: 16px" />
            </div>
          </div>
          <div style="padding: 20px">
            <img
              v-if="
                item.images.edges.length > 0 &&
                item.images.edges[0].node.url != null
              "
              :src="item.images.edges[0].node.url"
              style="width: 100%; aspect-ratio: 9 / 10; object-fit: contain"
            />
            <img
              v-else
              src="https://pic.rmb.bdstatic.com/bjh/news/4a7e614df95be4dd84daa57a080753297365.jpeg"
              style="width: 100%; aspect-ratio: 9 / 10"
            />

            <div class="p-item-title">{{ item.title }}</div>
            <div class="p-item-subtitle">{{ item.productType }}</div>
            <div
              v-if="item.variants.edges[0].node.compareAtPrice != null"
              style="
                width: 100%;
                font-size: 16px;
                line-height: 22px;
                margin-top: 10px;
              "
            >
              <span
                style="
                  font-size: 14px;
                  color: #616161;
                  text-decoration: line-through;
                "
                >{{ item.variants.edges[0].node.compareAtPrice.currencyCode
                }}{{ item.variants.edges[0].node.compareAtPrice.amount }}</span
              >
              &nbsp;
              <span style="color: #cb0000"
                >{{ item.variants.edges[0].node.price.currencyCode
                }}{{ item.variants.edges[0].node.price.amount }}</span
              >
            </div>
            <div
              v-else
              style="
                width: 100%;
                font-size: 16px;
                line-height: 22px;
                margin-top: 10px;
              "
            >
              <span
                >{{ item.variants.edges[0].node.priceV2.currencyCode
                }}{{ item.variants.edges[0].node.priceV2.amount }}</span
              >
            </div>
            <div class="add-btn">Add to bag</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWishlistStore } from '../stores/wishlist'
import { useRouter } from 'vue-router'

const router = useRouter()
const wishlistStore = useWishlistStore()

function goToProductDetail(item) {
  router.push({
    path: `product-detail`,
    query: {
      id: item.id,
    },
  })
}
</script>

<style scoped>
.bgc {
  margin: 0 100px;
}
.delete-bg {
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: center;
  align-items: center;
}
.p-item-title {
  width: 100%;
  font-size: 16px;
  line-height: 22px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  margin-top: 30px;
}
.p-item-subtitle {
  width: 100%;
  font-size: 16px;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
.add-btn {
  display: flex;
  height: 40px;
  border: 1px solid #c5c5c5;
  font-size: 16px;
  margin-top: 16px;
  justify-content: center;
  align-items: center;
}
</style>
