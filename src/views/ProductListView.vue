<template>
  <div class="bgc">
    <div style="margin: 24px 0">
      <div style="font-size: 24px; line-height: 28px; font-weight: bold">
        All
      </div>
      <div
        style="line-height: 24px; color: #424242; width: 50%; margin-top: 8px"
      >
        Discover our latest luxury fashion collection, featuring exquisite
        clothing, shoes, bags, and accessories crafted from the finest materials
        with a modern twist. From statement coats and luxurious knitwear to
        stunning heels and coveted handbags, elevate your wardrobe with timeless
        elegance and sophistication.
      </div>
    </div>
    <div
      style="
        height: 48px;
        display: flex;
        justify-content: space-between;
        line-height: 48px;
      "
    >
      <div
        style="
          display: flex;
          justify-content: space-between;
          width: 25%;
          font-weight: bold;
        "
      >
        <div>Filter</div>
        <div @click="resetFilter">Clear</div>
      </div>

      <div
        style="
          display: flex;
          align-items: center;
          width: 75%;
          justify-content: right;
        "
      >
        <el-popover
          ref="sortRef"
          placement="bottom-end"
          title=""
          width="140px"
          trigger="click"
          content="this is content, this is content, this is content"
          :show-arrow="false"
        >
          <template #reference>
            <div style="display: flex; align-items: center">
              <div style="font-weight: bold">{{ sortName }}</div>
              <img
                src="../assets/icons/arrow-down.png"
                style="width: 16px; margin-left: 8px"
              />
            </div>
          </template>
          <div class="sort">
            <div
              v-for="item in kSortMap"
              :key="item.name"
              class="sort-item"
              :style="item.name == sortName ? 'font-weight:bold' : ''"
              @click="sortHandle(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <div style="display: flex; width: 100%" v-if="result != null">
      <div style="width: 25%">
        <el-checkbox-group
          v-model="filterGroup"
          size="small"
          @change="filterHandle"
        >
          <el-collapse>
            <el-collapse-item
              v-for="item in result.collection.products.filters"
              :title="item.label"
              :name="item.label"
              :key="item.id"
            >
              <div style="display: flex; flex-direction: column">
                <el-checkbox
                  v-for="sItem in item.values"
                  :key="sItem.id"
                  :label="`${sItem.label} (${sItem.count})`"
                  :value="sItem.input"
                  size="large"
                  class="e-checkbox"
                />
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-checkbox-group>
      </div>
      <div
        style="display: flex; flex-wrap: wrap; width: 75%"
        v-loading="loading"
      >
        <div
          v-for="item in result.collection.products.edges"
          :key="item.node.id"
          style="width: 33%"
          @click="goToProductDetail(item)"
        >
          <div style="margin: 30px">
            <img
              v-if="
                item.node.images.edges.length > 0 &&
                item.node.images.edges[0].node.url != null
              "
              :src="item.node.images.edges[0].node.url"
              style="width: 100%; aspect-ratio: 9 / 10"
            />
            <img
              v-else
              src="https://pic.rmb.bdstatic.com/bjh/news/4a7e614df95be4dd84daa57a080753297365.jpeg"
              style="width: 100%; aspect-ratio: 9 / 10"
            />
            <div class="p-item-title">{{ item.node.title }}</div>
            <div class="p-item-subtitle">{{ item.node.productType }}</div>
            <div
              v-if="item.node.variants.edges[0].node.compareAtPrice != null"
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
                >{{
                  item.node.variants.edges[0].node.compareAtPrice.currencyCode
                }}{{
                  item.node.variants.edges[0].node.compareAtPrice.amount
                }}</span
              >
              &nbsp;
              <span style="color: #cb0000"
                >{{ item.node.variants.edges[0].node.price.currencyCode
                }}{{ item.node.variants.edges[0].node.price.amount }}</span
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
                >{{ item.node.variants.edges[0].node.price.currencyCode
                }}{{ item.node.variants.edges[0].node.price.amount }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ProductSchemas } from '@/server/graphql/schema/product_schema'
import { reactive, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import config from '@/config'
import { kSortMap } from '@/data/product'
import { useRouter } from 'vue-router'
const router = useRouter()

const sortRef = ref(null)
const sortName = ref('Most Relevant')

const pageInfo = reactive({
  id: config.collectionGid,
  first: 30,
  reverse: false,
  sortKey: 'RELEVANCE',
  filters: [],
})

const filterGroup = ref([])

const { result, loading } = useQuery(
  ProductSchemas.productListByCollection,
  pageInfo,
  { fetchPolicy: 'no-cache' }
)

function filterHandle(value) {
  console.log(value)
  pageInfo.filters = value.map((e) => JSON.parse(e))
}

function resetFilter() {
  filterGroup.value = []
  pageInfo.filters = []
}

function sortHandle(item) {
  pageInfo.reverse = item.reverse
  pageInfo.sortKey = item.sortKey
  sortName.value = item.name
  sortRef.value.hide()
}

function goToProductDetail(item) {
  router.push({
    path: `product-detail`,
    query: {
      id: item.node.id,
    },
  })
}
</script>

<style scoped>
.bgc {
  margin: 0 100px;
}
.e-checkbox {
  height: 22px;
  margin-bottom: 8px;
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
.sort-item {
  height: 42px;
  line-height: 42px;
  text-align: right;
  padding: 0 10px;
}
.sort-item:hover {
  background-color: #f0f0f0;
}
</style>
