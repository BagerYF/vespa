<template>
  <div>
    <el-dialog
      v-model="countryStore.showRegion"
      title=""
      width="450px"
      :show-close="false"
      style="padding: 0; margin-top: 100px"
    >
      <div
        style="
          height: 700px;
          width: 450px;
          display: flex;
          flex-direction: column;
        "
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 16px;
            height: 52px;
          "
        >
          <div style="font-size: 16px">Region</div>
          <img
            src="../assets/icons/cross.png"
            style="width: 16px"
            @click="countryStore.setShowRegion(false)"
          />
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            margin: 0 16px;
            height: 36px;
            color: #505050;
          "
        >
          Change your shipping destination and currency
        </div>
        <el-input
          v-model="search"
          style="margin: 8px 16px 16px; width: calc(100% - 32px); height: 36px"
          placeholder="Search for a country or region"
          @input="searchChange"
        >
          <template #suffix>
            <img src="../assets/icons/search-g.png" width="24px" />
          </template>
        </el-input>
        <div style="flex: 1; overflow: scroll">
          <div
            v-for="item in showData.data"
            :key="item._id"
            style="
              display: flex;
              margin: 0 16px;
              align-items: center;
              height: 40px;
              border-bottom: #e0e0e0 1px solid;
            "
            @click="selectCountry(item)"
          >
            <img
              :src="getImgUrl(item.code)"
              style="width: 18px; border-radius: 9px"
            />
            <div style="flex: 1; margin: 0 12px">{{ item.name }}</div>
            <div style="color: #757575">
              {{ item.code == countryStore.code ? 'Selected · ' : ''
              }}{{ item.currencyCode }} $
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { kCountryMaps } from '@/data/region'
import { reactive, ref, watch } from 'vue'
import { useCountryStore } from '../stores/country'

const countryStore = useCountryStore()

const search = ref('')

const showData = reactive({ data: [] })

function initData() {
  const currencyCountry = kCountryMaps.filter(
    (e) => e.code == countryStore.code
  )[0]

  let originalData = [
    currencyCountry,
    ...kCountryMaps.filter((e) => e.code != countryStore.code),
  ]

  showData.data = originalData
}

watch(
  () => countryStore.showRegion,
  (value) => {
    if (value == true) {
      initData()
    }
  }
)

function getImgUrl(code) {
  return `https://d1mp1ehq6zpjr9.cloudfront.net/static/images/flags/${
    code || ''
  }.png`
}

function searchChange(str) {
  if (str == '') {
    showData.data = kCountryMaps
  } else {
    let filterData = kCountryMaps.filter((e) =>
      e.name.toLocaleLowerCase().includes(str.toLocaleLowerCase())
    )
    showData.data = filterData
  }
}

function selectCountry(item) {
  countryStore.setCountry(item)
  countryStore.setShowRegion(false)
}
</script>

<style scoped></style>
