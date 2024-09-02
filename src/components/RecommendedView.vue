<template>
  <div v-if="recommendedLoading == false">
    <div style="height: 1px; margin-top: 60px; background-color: #eeeeee"></div>
    <div style="font-size: 16px; font-weight: bold; line-height: 54px">
      Recommended
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 100%;
      "
    >
      <div
        v-for="item in recommended.productRecommendations.length > 6
          ? recommended.productRecommendations.slice(0, 6)
          : recommended.productRecommendations"
        :key="item.id"
        style="width: 16%"
      >
        <div
          style="margin: 10px 4px"
          @click="
            () => {
              goToProductDetail(item)
            }
          "
        >
          <img
            v-if="
              item.images.edges.length > 0 &&
              item.images.edges[0].node.url != null
            "
            :src="item.images.edges[0].node.url"
            style="width: 100%; aspect-ratio: 9 / 10"
          />
          <img
            v-else
            src="https://pic.rmb.bdstatic.com/bjh/news/4a7e614df95be4dd84daa57a080753297365.jpeg"
            style="width: 100%; aspect-ratio: 9 / 10; object-fit: contain"
          />
          <div class="r-item-title">{{ item.title }}</div>
          <div class="r-item-subtitle">{{ item.productType }}</div>
          <div
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ProductSchemas } from '@/server/graphql/schema/product_schema'
import { useQuery } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'

const router = useRouter()
// query.value.id
const { result: recommended, loading: recommendedLoading } = useQuery(
  ProductSchemas.recommendedList,
  { productId: 'gid://shopify/Product/7713246904542' },
  { fetchPolicy: 'no-cache' }
)

function goToProductDetail(item) {
  router.push({
    path: `product-detail`,
    query: {
      id: item.id,
    },
  })
}
</script>

<style scoped></style>
