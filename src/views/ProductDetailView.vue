<template>
  <div class="bgc">
    <div style="display: flex; align-items: start" v-if="loading == false">
      <div class="imgs">
        <div class="imgs-left">
          <img
            v-for="(item, index) in result.product.images.edges"
            :key="item.node.id"
            :src="item.node.url"
            class="imgs-left-item"
            :style="
              index == imgsIndex ? 'opacity: 1;border: 1px solid #212121;' : ''
            "
            @click="imgsIndex = index"
          />
        </div>
        <div class="imgs-arrow-bg">
          <img
            src="../assets/icons/arrow-left.png"
            class="imgs-arrow"
            @click="imgLeftHandle"
          />
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            flex: 1;
            height: 100%;
            padding: 0 0px;
          "
        >
          <img
            :src="result.product.images.edges[imgsIndex].node.url"
            style="width: 100%; aspect-ratio: 1; object-fit: contain"
          />
        </div>
        <div class="imgs-arrow-bg">
          <img
            src="../assets/icons/arrow-right.png"
            class="imgs-arrow"
            @click="imgRightHandle"
          />
        </div>
      </div>
      <div style="width: 450px">
        <div class="p-item-title">{{ result.product.vendor }}</div>
        <div class="p-item-subtitle">{{ result.product.title }}</div>
        <div
          v-if="result.product.variants.edges[0].node.compareAtPrice != null"
          style="
            width: 100%;
            font-size: 16px;
            line-height: 22px;
            margin-top: 16px;
          "
        >
          <span
            style="
              font-size: 14px;
              color: #616161;
              text-decoration: line-through;
            "
            >{{
              result.product.variants.edges[0].node.compareAtPrice.currencyCode
            }}{{
              result.product.variants.edges[0].node.compareAtPrice.amount
            }}</span
          >
          &nbsp;
          <span style="color: #cb0000"
            >{{ result.product.variants.edges[0].node.price.currencyCode
            }}{{ result.product.variants.edges[0].node.price.amount }}</span
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
            >{{ result.product.variants.edges[0].node.price.currencyCode
            }}{{ result.product.variants.edges[0].node.price.amount }}</span
          >
        </div>

        <div
          style="
            display: flex;
            justify-content: end;
            align-items: center;
            margin-top: 32px;
          "
          v-if="
            wishlistStore.wishlist.data.filter((e) => e.id == query.id).length >
            0
          "
          @click="wishlistStore.removeWishlist(result.product)"
        >
          <img
            src="../assets/icons/heart-fill.png"
            style="width: 16px; margin-right: 2px"
          />
          <div style="line-height: 20px">Added to Wishlist</div>
        </div>
        <div
          style="
            display: flex;
            justify-content: end;
            align-items: center;
            margin-top: 32px;
          "
          v-else
          @click="wishlistStore.addWishlist(result.product)"
        >
          <img
            src="../assets/icons/heart.png"
            style="width: 16px; margin-right: 2px"
          />
          <div style="line-height: 20px">Add to Wishlist</div>
        </div>

        <div
          style="
            min-height: 48px;
            border: 1px solid #757575;
            margin-top: 16px;
            padding: 0 10px;
          "
        >
          <el-collapse v-model="showSize">
            <el-collapse-item
              :title="
                selectVariant.data.node != null
                  ? selectVariant.data.node.title
                  : 'Select a size'
              "
              name="1"
              class="size-select"
            >
              <div
                style="
                  background-color: #f8f8f8;
                  height: 1px;
                  margin-bottom: 10px;
                "
              ></div>
              <div
                v-for="item in result.product.variants.edges"
                :key="item.node.id"
                style="
                  display: flex;
                  justify-content: space-between;
                  font-size: 16px;
                  line-height: 36px;
                "
                @click="() => variantHandle(item)"
              >
                <div
                  :style="
                    item.node.quantityAvailable < 1 ? 'color: #909090' : ''
                  "
                >
                  {{ item.node.title }}
                </div>
                <div
                  v-if="item.node.quantityAvailable < 1"
                  style="color: #909090"
                >
                  Sold out
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div
          v-loading="cartStore.addProductToCartLoading"
          class="btn_center"
          @click="addToBagHandle"
        >
          Add to bag
        </div>
        <el-collapse v-model="showDetail">
          <el-collapse-item title="Detail" name="2" class="detail-item">
            <div style="line-height: 24px; margin: 2px 0; color: #505050">
              {{ result.product.description }}
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="Shipping and Returns"
            name="3"
            class="detail-item"
          >
            <div style="line-height: 24px; margin: 2px 0; color: #505050">
              <div style="margin-top: 10px; font-weight: bold">Shipping</div>
              <div style="margin-top: 10px; color: #505050">
                Shopify ships globally to a large number of countries. For more
                information on delivery, visit our orders & shipping page
                <div
                  style="
                    color: #757575;
                    margin-top: 4px;
                    text-decoration: underline;
                  "
                >
                  Orders & Shipping
                </div>
              </div>
              <div style="margin-top: 10px; font-weight: bold">Returns</div>
              <div style="margin-top: 10px; color: #505050">
                You can purchase in confidence and send the items back to us if
                they are not right for you. If you would like to initiate a
                return, please go to your account at the top right corner where
                it says your name. Click "Create Return" next to the order your
                would like to return and follow the prompts.
              </div>
              <div
                style="
                  color: #757575;
                  margin-top: 4px;
                  text-decoration: underline;
                "
              >
                Return Policy
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <recommended-view />
    <BenefitView />
    <SubscribeView />
  </div>
</template>

<script setup>
import { ProductSchemas } from '@/server/graphql/schema/product_schema'
import { ref, reactive, toRefs, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import BenefitView from '@/components/BenefitView.vue'
import SubscribeView from '@/components/SubscribeView.vue'
import { useRoute } from 'vue-router'
import { useWishlistStore } from '../stores/wishlist'
import { useCartStore } from '../stores/cart'

let route = useRoute()
let { query } = toRefs(route)

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const imgsIndex = ref(0)
const selectVariant = reactive({
  data: {},
})
const productId = ref(null)

const showSize = ref([])

const showDetail = ref(['2', '3'])

function imgLeftHandle() {
  if (imgsIndex.value > 0) {
    imgsIndex.value--
  }
}

function imgRightHandle() {
  if (imgsIndex.value < result.value.product.images.edges.length - 1) {
    imgsIndex.value++
  }
}

const { result, loading } = useQuery(
  ProductSchemas.productDetail,
  { id: productId },
  { fetchPolicy: 'no-cache' }
)

function variantHandle(item) {
  if (item.node.quantityAvailable > 0) {
    selectVariant.data = item
    console.log(selectVariant.data)
    showSize.value = []
  }
}

const addToBagHandle = () => {
  if (selectVariant.data.node == null) {
    // eslint-disable-next-line no-undef
    ElMessage.error('Please select a size')
  } else {
    cartStore.addProductsToCart(selectVariant.data.node.id)
  }
}

watch(
  [query],
  () => {
    productId.value = query.value.id
  },
  {
    immediate: true,
  }
)
</script>

<style scoped>
.bgc {
  margin: 0 100px;
}
.imgs {
  display: flex;
  flex: 1;
  align-items: center;
}
.imgs-left {
  width: 48px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.imgs-left-item {
  width: 48px;
  height: 64px;
  margin: 4px 0;
  opacity: 0.3;
  object-fit: cover;
  border: 1px solid #fff;
}
.imgs-left-item:hover {
  opacity: 1;
  border: 1px solid #212121;
}
.imgs-arrow {
  width: 24px;
}
.imgs-arrow-bg {
  width: 40px;
  height: 40px;
  margin: 0 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgs-arrow-bg:hover {
  background-color: #e8e8e8;
}
.p-item-title {
  width: 100%;
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  margin-top: 28px;
}
.p-item-subtitle {
  width: 100%;
  font-size: 16px;
  line-height: 22px;
}
.size-select {
  --el-collapse-header-font-size: 16px;
  --el-collapse-header-text-color: #212121;
}
.btn_center {
  width: 100%;
  height: 40px;
  background-color: #212121;
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 32px;
}
.detail-item {
  --el-collapse-header-font-size: 14px;
  --el-collapse-header-text-color: #212121;
}
.r-item-title {
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
.r-item-subtitle {
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
</style>
