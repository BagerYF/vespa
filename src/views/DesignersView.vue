<template>
  <div class="bgc">
    <div class="search-head">
      <el-input
        v-model="search"
        style="margin: 0; width: 270px; height: 40px"
        placeholder="Search designers"
        @input="searchChange"
      >
        <template #suffix>
          <img src="../assets/icons/search-g.png" width="24px" />
        </template>
      </el-input>
      <div
        v-for="item in alphaArray"
        :key="item"
        :class="{ 'no-exist': showData.index.indexOf(item) == -1 }"
      >
        {{ item }}
      </div>
    </div>
    <div v-for="item in showData.index" :key="item" class="category">
      <div class="category-title">{{ item }}</div>
      <div class="sub-category-bg">
        <div
          class="sub-category"
          v-for="sItem in showData.data[item]"
          :key="sItem"
        >
          {{ sItem }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { kDesignersAllMaps } from '@/data/designer'
import { reactive, ref } from 'vue'

const search = ref('')

const showData = reactive({
  index: [],
  data: {},
})

var allDesigners = Object.keys(kDesignersAllMaps)

let alphaArray = ['#']

for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
  alphaArray.push(String.fromCharCode(i))
}

function classifyAndSortStringArray(arr) {
  const result = {}
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  for (const str of arr) {
    const firstLetter = str.charAt(0).toUpperCase()
    if (letters.includes(firstLetter)) {
      if (!result[firstLetter]) {
        result[firstLetter] = []
      }
      result[firstLetter].push(str)
    } else {
      if (!result['#']) {
        result['#'] = []
      }
      result['#'].push(str)
    }
  }

  for (const key in result) {
    result[key].sort()
  }

  return result
}

searchChange('')

function searchChange(str) {
  if (str == '') {
    let tempData = classifyAndSortStringArray(allDesigners)
    let tempIndex = Object.keys(tempData).sort()
    showData.index = tempIndex
    showData.data = tempData
  } else {
    let tempData = classifyAndSortStringArray(
      allDesigners.filter((e) =>
        e.toLocaleLowerCase().includes(str.toLocaleLowerCase())
      )
    )
    let tempIndex = Object.keys(tempData).sort()
    showData.index = tempIndex
    showData.data = tempData
  }
}
</script>

<style scoped>
.bgc {
  margin: 0 100px;
}
.search-head {
  margin-top: 16px;
  margin-bottom: 24px;
  display: flex;
  line-height: 40px;
  justify-content: space-between;
}
.category {
  display: flex;
  padding-top: 16px;
  padding-bottom: 24px;
  border-top: 1px solid #eeeeee;
}
.category-title {
  font-size: 24px;
  line-height: 28px;
  font-weight: bold;
  width: 270px;
}
.sub-category-bg {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
.sub-category {
  width: 50%;
  height: 20px;
  line-height: 20px;
  margin-bottom: 16px;
}
.no-exist {
  opacity: 0.3;
}
</style>
